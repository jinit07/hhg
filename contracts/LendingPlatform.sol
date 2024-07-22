// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

contract LendingPlatform {
    struct LoanRequest {
        address payable borrower;
        uint amount;
        uint interestRate;
        bool isFunded;
        bool isRepaid;
        address payable lender; // Added lender address to LoanRequest
    }

    struct LoanOffer {
        address payable lender;
        uint amount;
        uint interestRate;
        bool isAccepted;
        bool isRepaid;
    }

    mapping(uint => LoanRequest) public loanRequests;
    mapping(uint => LoanOffer) public loanOffers;
    uint public loanRequestCount;
    uint public loanOfferCount;

    event LoanRequested(uint requestId, address borrower, uint amount, uint interestRate);
    event LoanOffered(uint offerId, address lender, uint amount, uint interestRate);
    event LoanFunded(uint requestId, address lender);
    event LoanRepaid(uint requestId, address borrower);

    function requestLoan(uint _amount, uint _interestRate) public {
        loanRequests[loanRequestCount] = LoanRequest(
            payable(msg.sender), // Explicitly convert address to address payable
            _amount,
            _interestRate,
            false,
            false,
            payable(address(0)) // Initialize lender as payable address(0)
        );
        emit LoanRequested(loanRequestCount, msg.sender, _amount, _interestRate);
        loanRequestCount++;
    }

    function offerLoan(uint _amount, uint _interestRate) public {
        loanOffers[loanOfferCount] = LoanOffer(
            payable(msg.sender), // Explicitly convert address to address payable
            _amount,
            _interestRate,
            false,
            false
        );
        emit LoanOffered(loanOfferCount, msg.sender, _amount, _interestRate);
        loanOfferCount++;
    }

    function fundLoan(uint _requestId) public payable {
        LoanRequest storage request = loanRequests[_requestId];
        require(!request.isFunded, "Loan is already funded");
        require(msg.value == request.amount, "Incorrect amount");

        request.borrower.transfer(msg.value);
        request.isFunded = true;
        request.lender = payable(msg.sender); // Set the lender
        emit LoanFunded(_requestId, msg.sender);
    }

    function repayLoan(uint _requestId) public payable {
        LoanRequest storage request = loanRequests[_requestId];
        require(request.isFunded, "Loan is not funded");
        require(!request.isRepaid, "Loan is already repaid");

        uint repaymentAmount = request.amount + (request.amount * request.interestRate / 100);
        require(msg.value == repaymentAmount, "Incorrect amount");

        request.lender.transfer(msg.value); // Transfer to lender
        request.isRepaid = true;
        emit LoanRepaid(_requestId, msg.sender);
    }

    function getActiveLoanRequests() public view returns (LoanRequest[] memory) {
        uint activeCount = 0;
        for (uint i = 0; i < loanRequestCount; i++) {
            if (!loanRequests[i].isFunded) {
                activeCount++;
            }
        }

        LoanRequest[] memory activeRequests = new LoanRequest[](activeCount);
        uint j = 0;
        for (uint i = 0; i < loanRequestCount; i++) {
            if (!loanRequests[i].isFunded) {
                activeRequests[j] = loanRequests[i];
                j++;
            }
        }

        return activeRequests;
    }

    function getActiveLoanOffers() public view returns (LoanOffer[] memory) {
        uint activeCount = 0;
        for (uint i = 0; i < loanOfferCount; i++) {
            if (!loanOffers[i].isAccepted) {
                activeCount++;
            }
        }

        LoanOffer[] memory activeOffers = new LoanOffer[](activeCount);
        uint j = 0;
        for (uint i = 0; i < loanOfferCount; i++) {
            if (!loanOffers[i].isAccepted) {
                activeOffers[j] = loanOffers[i];
                j++;
            }
        }

        return activeOffers;
    }
}
