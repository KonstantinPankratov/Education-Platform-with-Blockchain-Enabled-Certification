import { toNano } from '@ton/core';
import { CourseCertificateIssuer } from '../wrappers/CourseCertificateIssuer';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const courseCertificateIssuer = provider.open(await CourseCertificateIssuer.fromInit());

    await courseCertificateIssuer.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            // @ts-ignore
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(courseCertificateIssuer.address);

    // run methods on `courseCertificateIssuer`
}
