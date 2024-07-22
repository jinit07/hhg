import React, { useEffect, useState } from "react";
import Web3 from "web3";
import LendingPlatform from "../abis/LendingPlatform.json";
import "./Dashboard.css";

const Dashboard = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [loanOffers, setLoanOffers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [averageInterestRate, setAverageInterestRate] = useState(0);

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const networkId = await web3.eth.net.getId();
      const networkData = LendingPlatform.networks[networkId];

      if (networkData) {
        const lendingPlatform = new web3.eth.Contract(
          LendingPlatform.abi,
          networkData.address
        );
        const loanRequestCount = await lendingPlatform.methods
          .loanRequestCount()
          .call();
        const loanOfferCount = await lendingPlatform.methods
          .loanOfferCount()
          .call();

        const requests = [];
        for (let i = 0; i < loanRequestCount; i++) {
          const request = await lendingPlatform.methods.loanRequests(i).call();
          requests.push(request);
        }

        const offers = [];
        for (let i = 0; i < loanOfferCount; i++) {
          const offer = await lendingPlatform.methods.loanOffers(i).call();
          offers.push(offer);
        }

        setLoanRequests(requests);
        setLoanOffers(offers);

        // Calculate total amount and average interest rate
        let total = 0;
        let totalInterestRate = 0;
        requests.forEach((request) => {
          const amountInEther = parseFloat(
            web3.utils.fromWei(request.amount, "ether")
          );
          total += amountInEther;
          totalInterestRate += parseFloat(request.interestRate);
        });

        setTotalAmount(total);
        setAverageInterestRate(totalInterestRate / requests.length);
      } else {
        alert("Smart contract not deployed to detected network.");
      }
    };

    loadBlockchainData();
  }, []);

  return (
    <div className="dashboard">
      <h2>Active Loan Requests</h2>
      <p>Total ETH Requested: {totalAmount} ETH</p>
      <p>Average Interest Rate: {averageInterestRate.toFixed(2)}%</p>
      <ul>
        {loanRequests.map((request, index) => (
          <li key={index}>
            {Web3.utils.fromWei(request.amount, "ether")} ETH @{" "}
            {request.interestRate}%
          </li>
        ))}
      </ul>

      <h2>Active Loan Offers</h2>
      <ul>
        {loanOffers.map((offer, index) => (
          <li key={index}>
            {Web3.utils.fromWei(offer.amount, "ether")} ETH @{" "}
            {offer.interestRate}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
