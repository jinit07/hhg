import React, { useState } from "react";
import Web3 from "web3";
import LendingPlatform from "../abis/LendingPlatform.json";
import "./LendMoney.css";

const LendMoney = () => {
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");

  const handleLend = async (event) => {
    event.preventDefault();
    const web3 = new Web3(Web3.givenProvider || "http://localhost:9545");
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const networkData = LendingPlatform.networks[networkId];
    if (networkData) {
      const lendingPlatform = new web3.eth.Contract(
        LendingPlatform.abi,
        networkData.address
      );
      await lendingPlatform.methods
        .offerLoan(web3.utils.toWei(amount, "ether"), interestRate)
        .send({ from: accounts[0] });
      alert("Loan offer created!");
    } else {
      alert("Smart contract not deployed to detected network.");
    }
  };

  return (
    <div className="lend-money">
      <h2>Lend Money</h2>
      <form onSubmit={handleLend}>
        <div>
          <label>Amount (ETH): </label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Interest Rate (%): </label>
          <input
            type="text"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>
        <button type="submit">Lend</button>
      </form>
    </div>
  );
};

export default LendMoney;
