# Decentralized Lending and Borrowing Platform

This repository hosts the code for a decentralized lending and borrowing platform built on the Ethereum blockchain. The platform allows users to request loans, offer loans, and manage transactions through a user-friendly interface, ensuring transparency and efficiency. The platform leverages smart contracts for secure, automated transactions and integrates with MetaMask for seamless interaction.

## Getting Started

Follow the steps below to set up the development environment, compile and deploy the smart contracts, and run the application.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Truffle](https://www.trufflesuite.com/truffle)
- [MetaMask](https://metamask.io/) extension for your web browser

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-repo/decentralized-lending-platform.git
    cd decentralized-lending-platform
    ```

2. Install the necessary npm packages:

    ```sh
    npm install
    ```

## Smart Contract Deployment

### Truffle Development Environment

1. Start the Truffle development environment:

    ```sh
    truffle develop
    ```

2. Compile the smart contracts:

    ```sh
    compile
    ```

3. Deploy the smart contracts to the development network:

    ```sh
    migrate --reset --network development
    ```

### Running the Application

1. Start the application:

    ```sh
    npm start
    ```

2. Open MetaMask and connect to the local development network:

    - Network Name: Development
    - New RPC URL: `http://127.0.0.1:9545`
    - Chain ID: `1337`
    - Currency Symbol: ETH

## Platform Overview

### Initial Dashboard

The initial dashboard provides a comprehensive overview of all active borrow requests and lending offers available on the network. It features a clean and aesthetic UI, making it easy for users to understand and interact with the platform. Users can view and manage transactions with transparency and efficiency.

![Initial Dashboard](https://github.com/user-attachments/assets/f9a488d1-dd76-4b4e-986c-7e04130c8c6f)

### Borrow Money

Users can request to borrow money by filling out a form with the necessary information, such as the amount, interest rate, and a unique identifier for the request. The user-friendly interface ensures that anyone can easily make borrow requests.

![Borrow Money](https://github.com/user-attachments/assets/3231724b-d6d2-4424-adb6-19ac83c89a16)

### MetaMask Verification

When a user submits a borrow request, MetaMask will open to verify the transaction. The user must confirm the details of the loan request, ensuring all criteria are met before the transaction is committed.

![MetaMask Verification](https://github.com/user-attachments/assets/49dbc3da-d3d9-49b8-b4e5-5a11a3a61882)

### Transaction Confirmation

After MetaMask verifies the transaction, a notification will alert the user that the transaction has been successfully completed.

![Transaction Confirmation](https://github.com/user-attachments/assets/92758ae2-68de-4d1a-b1bc-b0cf350235c3)


### Lend Money

Lenders can offer loans by specifying the amount, interest rate, and the unique ID of the borrow request they wish to fulfill. The process involves MetaMask verification and notification to ensure the transaction is secure and completed. The lending offer will be displayed on the dashboard for further interactions.

![Lend Money](https://github.com/user-attachments/assets/2a70f415-e693-4122-89e0-43b3aabcb61c)

## Contributing

We welcome contributions to improve the platform. Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

We would like to thank the following for their contributions and support:

- [Truffle](https://www.trufflesuite.com/)
- [MetaMask](https://metamask.io/)
- All contributors and users of the platform

---

Feel free to open an issue or contact us for any questions or suggestions. Enjoy using the decentralized lending and borrowing platform!
