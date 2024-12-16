# EDUPLA: An online platform for learning with blockchain-based certification

[![Website](https://img.shields.io/badge/Visit-Website-blue)](https://edupla.kopa.pw/)

Edupla is an online learning platform for programming that leverages blockchain technology to issue and verify certificates. This project aims to increase transparency, security, and decentralization in the certification process for educational platforms.

## Roadmap
1. **Current Phase**: Educational platform for programming with blockchain-based certification and verification.  
   - The current implementation showcases how blockchain can enhance transparency and security in certificate issuance and verification.  

2. **Next Phase**: Transition from a standalone platform to a **blockchain protocol**.  
   - **Goal**: Develop a protocol in the TON blockchain for decentralized certification that can be adopted by multiple educational platforms.  
   - **Features**:  
     - Represent courses, modules, lessons, and user solutions as on-chain smart contracts.  
     - Enable a fully decentralized certification process.  

3. **Future Vision**: Expand the protocol to support a wide range of educational platforms, creating a unified and transparent certification system across the industry.

## How It Works

1. **Course Completion**: Users complete courses offered on the platform.
2. **Certificate Issuance**: After successful completion, certificates are issued using the TON blockchain, ensuring decentralization and transparency.
3. **Certificate Verification**: Certificates can be verified directly on the TON blockchain without relying on the platform.

## Technologies Used
- **Frontend & Backend**: Next.js
- **Blockchain**: TON (The Open Network) for issuing and verifying certificates
- **Smart Contracts**: Developed and deployed using the TON ecosystem
- **Database**: MongoDB (for course and user data)

## Installation and Setup

1. Clone the repository:
   ```bash
    git clone https://github.com/KonstantinPankratov/Education-Platform-with-Blockchain-Enabled-Certification.git
2. Navigate to the project directory:
    ```bash
    cd Education-Platform-with-Blockchain-Enabled-Certification
3. Install dependencies:
    ```bash
    npm install
4. Start the development server:
    ```bash
    npm run dev
5. Set the appropriate variables in .env
## Smart Contract Deployment

1. Navigate to the smart contracts directory:
   ```bash
    cd blockchain/ton
2. Install dependencies:
   ```bash
    npm install
3. Build the existing contract CourseCertificateIssuer:
    ```bash
    npm run build
4. Deploy it:
    ```bash
    npm run start
5. Set the appropriate variables in .env

## License
This project is licensed under the MIT License.