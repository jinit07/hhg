import React, { useEffect, useState } from "react";
import getWeb3 from "./utils/web3";
import LendingPlatform from "./contracts/LendingPlatform.json";

const LoanRequests = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [averageInterestRate, setAverageInterestRate] = useState(0);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = LendingPlatform.networks[networkId];
        const instance = new web3.eth.Contract(
          LendingPlatform.abi,
          deployedNetwork && deployedNetwork.address
        );

        const requests = await instance.methods.getActiveLoanRequests().call();
        console.log("Loan Requests:", requests); // Debugging line
        setLoanRequests(requests);

        // Calculate total amount and average interest rate
        let total = 0;
        let totalInterestRate = 0;
        requests.forEach((request) => {
          const amountInEther = parseFloat(
            web3.utils.fromWei(request.amount.toString(), "ether")
          );
          total += amountInEther;
          totalInterestRate += parseFloat(request.interestRate);
          console.log(
            `Request: ${amountInEther} ETH @ ${request.interestRate.value}%`
          ); // Debugging line
        });

        setTotalAmount(total);
        setAverageInterestRate(
          requests.length > 0 ? totalInterestRate / requests.length : 0
        );
      } catch (error) {
        console.error("Error loading loan requests:", error);
      }
    };
    init();
  }, []);

  async function createLoanRequest(amount, interestRate) {
    try {
      const web3 = await getWeb3();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = LendingPlatform.networks[networkId];
      const instance = new web3.eth.Contract(
        LendingPlatform.abi,
        deployedNetwork && deployedNetwork.address
      );

      const accounts = await web3.eth.getAccounts();
      await instance.methods
        .requestLoan(amount, interestRate)
        .send({ from: accounts[0], gas: 500000 });

      // After creating the loan request, refresh the list of loan requests
      const updatedRequests = await instance.methods
        .getActiveLoanRequests()
        .call();
      setLoanRequests(updatedRequests);

      // Update total amount and average interest rate after creating the new request
      let total = 0;
      let totalInterestRate = 0;
      updatedRequests.forEach((request) => {
        const amountInEther = parseFloat(
          web3.utils.fromWei(request.amount.toString(), "ether")
        );
        total += amountInEther;
        totalInterestRate += parseFloat(request.interestRate);
      });

      setTotalAmount(total);
      setAverageInterestRate(
        updatedRequests.length > 0
          ? totalInterestRate / updatedRequests.length
          : 0
      );
    } catch (error) {
      console.error("Error creating loan request:", error);
    }
  }

  async function fundLoan(requestId) {
    try {
      const web3 = await getWeb3();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = LendingPlatform.networks[networkId];
      const instance = new web3.eth.Contract(
        LendingPlatform.abi,
        deployedNetwork && deployedNetwork.address
      );

      const accounts = await web3.eth.getAccounts();
      const request = loanRequests.find((req) => req.id === requestId);

      if (request) {
        await instance.methods
          .fundLoan(requestId)
          .send({ from: accounts[0], value: request.amount, gas: 500000 });
      }
    } catch (error) {
      console.error("Transaction failed:", error.message);
    }
  }

  return (
    <div>
      <h2>Active Loan Requests</h2>
      <p>Total ETH Requested: {totalAmount} ETH</p>
      <p>Average Interest Rate: {averageInterestRate.toFixed(2)}%</p>

      {loanRequests.map((request, index) => (
        <div key={index}>
          <p>Borrower: {request.borrower}</p>
          <p>
            Amount: {web3.utils.fromWei(request.amount.toString(), "ether")} ETH
          </p>
          <p>Interest Rate: {request.interestRate.value}%</p>
          <button onClick={() => fundLoan(request.id)}>Fund Loan</button>
        </div>
      ))}

      <h2>Create New Loan Request</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const amount = e.target.elements.amount.value;
          const interestRate = e.target.elements.interestRate.value;
          createLoanRequest(web3.utils.toWei(amount, "ether"), interestRate);
          e.target.reset();
        }}
      >
        <label>Amount (ETH):</label>
        <input type="text" name="amount" />
        <br />
        <label>Interest Rate (%):</label>
        <input type="text" name="interestRate" />
        <br />
        <button type="submit">Create Loan Request</button>
      </form>
    </div>
  );
};

export default LoanRequests;
