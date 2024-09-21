import { toNano } from '@ton/core';
import { CourseCertificate } from '../wrappers/CourseCertificate';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const courseCertificate = provider.open(await CourseCertificate.fromInit());

    await courseCertificate.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(courseCertificate.address);

    // run methods on `courseCertificate`
}
