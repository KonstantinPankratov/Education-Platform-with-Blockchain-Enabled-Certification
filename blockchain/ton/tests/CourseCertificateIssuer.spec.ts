import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { CourseCertificateIssuer, IssueCertificate } from '../wrappers/CourseCertificateIssuer';
import '@ton/test-utils';
import { CourseCertificate } from '../wrappers/CourseCertificate';

describe('CourseCertificateIssuer', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let courseCertificateIssuer: SandboxContract<CourseCertificateIssuer>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        courseCertificateIssuer = blockchain.openContract(await CourseCertificateIssuer.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await courseCertificateIssuer.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: courseCertificateIssuer.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and courseCertificateIssuer are ready to use
    });

    it("should issue certificate", async () => {
        const courseId = 'c01';
        const userId = 'u091';

        const user = await blockchain.treasury('user');

        console.log("Deployer: ", deployer.address);
        console.log("User: ", user.address);

        const message: IssueCertificate = {
            $$type: 'IssueCertificate',
            // owner: user.address,
            courseId: courseId,
            userId: userId
        };

        await courseCertificateIssuer.send(user.getSender(), {
            value: toNano("2")
        }, message);

        const certificateAddress = await courseCertificateIssuer.getCertificateAddress(user.address, courseId, userId);

        console.log("Certificate address: ", certificateAddress.toString());

        const certificateFromAddress = CourseCertificate.fromAddress(certificateAddress);

        const certificate = blockchain.openContract(certificateFromAddress);

        const details = await certificate.getDetails();
        const balance = await certificate.getBalance();

        console.log("Details: ", details);

        expect(toNano(balance)).toBeGreaterThan(0n);
        expect(details.courseId).toBe(courseId);
        expect(details.userId).toBe(userId);
    });
});
