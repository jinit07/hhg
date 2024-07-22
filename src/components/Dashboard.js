import React, { useEffect, useState } from "react";
import Web3 from "web3";
import LendingPlatform from "../abis/LendingPlatform.json";
import "./Dashboard.css";

const Dashboard = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [loanOffers, setLoanOffers] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [averageInterestRate, setAverageInterestRate] = useState(0);
  const [showLoanRequests, setShowLoanRequests] = useState(false); // State for loan requests visibility
  const [showLoanOffers, setShowLoanOffers] = useState(false); // State for loan offers visibility

  useEffect(() => {
    const loadBlockchainData = async () => {
      // ... (your existing useEffect code)
    };

    loadBlockchainData();
  }, []);

  const toggleLoanRequests = () => {
    setShowLoanRequests(!showLoanRequests); // Toggle visibility
  };

  const toggleLoanOffers = () => {
    setShowLoanOffers(!showLoanOffers); // Toggle visibility
  };

  return (
    <div className="dashboard-container">
      <div className="particles">
        {/* Particles styling */}
        <div
          className="particle"
          style={{ width: "10px", height: "10px", left: "10%", top: "20%" }}
        ></div>
        <div
          className="particle"
          style={{ width: "15px", height: "15px", left: "20%", top: "80%" }}
        ></div>
        <div
          className="particle"
          style={{ width: "8px", height: "8px", left: "60%", top: "40%" }}
        ></div>
        <div
          className="particle"
          style={{ width: "12px", height: "12px", left: "80%", top: "10%" }}
        ></div>
        <div
          className="particle"
          style={{ width: "10px", height: "10px", left: "45%", top: "70%" }}
        ></div>
      </div>
      <div className="dashboard">
        <h2>Dashboard</h2>
        <p>Total ETH Requested: {totalAmount} ETH</p>
        <p>Average Interest Rate: {averageInterestRate.toFixed(2)}%</p>

        <button className="toggle-button" onClick={toggleLoanRequests}>
          {showLoanRequests
            ? "Hide Active Loan Requests"
            : "Show Active Loan Requests"}
        </button>

        {showLoanRequests && (
          <>
            <h2>Active Loan Requests</h2>
            <ul className="transaction-list">
              {loanRequests.map((request, index) => (
                <li key={index}>
                  <span>{Web3.utils.fromWei(request.amount, "ether")} ETH</span>
                  <span>@ {request.interestRate}%</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <button className="toggle-button" onClick={toggleLoanOffers}>
          {showLoanOffers
            ? "Hide Active Loan Offers"
            : "Show Active Loan Offers"}
        </button>

        {showLoanOffers && (
          <>
            <h2>Active Loan Offers</h2>
            <ul className="transaction-list">
              {loanOffers.map((offer, index) => (
                <li key={index}>
                  <span>{Web3.utils.fromWei(offer.amount, "ether")} ETH</span>
                  <span>@ {offer.interestRate}%</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
