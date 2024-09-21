import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { CourseCertificateIssuer } from '../wrappers/CourseCertificateIssuer';
import '@ton/test-utils';
import { CourseCertificate, IssueCertificate } from '../wrappers/CourseCertificate';

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

        const message: IssueCertificate = {
            $$type: 'IssueCertificate',
            courseId: courseId,
            userId: userId
        };

        await courseCertificateIssuer.send(deployer.getSender(), {
            value: toNano("0.5")
        }, message);

        const certificateAddress = await courseCertificateIssuer.getCertificateAddress(courseId, userId);

        expect(certificateAddress).not.toBeNull();

        const certificateFromAddress = CourseCertificate.fromAddress(certificateAddress);

        const certificate = blockchain.openContract(certificateFromAddress);

        const details = await certificate.getDetails();

        console.log("details - ", details);

        expect(details.courseId).toBe(courseId);
        expect(details.userId).toBe(userId);
    });
});
