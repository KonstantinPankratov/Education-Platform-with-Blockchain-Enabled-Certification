import "@stdlib/deploy";
import "@stdlib/ownable";
import "@stdlib/stoppable";

import "./messages";
import "./course_certificate";

contract CourseCertificateIssuer with Deployable, Ownable, Stoppable {
    owner: Address;
    stopped: Bool;
    expectedGasFee: Int as uint64 = ton("0.01");

    init () {
        self.owner = sender(); // Owner is the deployer
        self.stopped = false;
    }

    // ====== Messages ====== //
    receive (msg: IssueCertificate) {
        self.requireNotStopped();
        self.requireValidData(msg);

        let ctx: Context = context();

        let amountWithoutGas = ctx.value - self.expectedGasFee;

        // owner is the user
        let certInit: StateInit = self.getCertificateInit(ctx.sender, msg.courseId, msg.userId);

        send(SendParameters{
            // contract address is known before deploy via initial state
            to: contractAddress(certInit),
            value: amountWithoutGas,
            mode: SendIgnoreErrors,
            code: certInit.code,
            data: certInit.data,
            body: "identify".asComment()
        });
    }

    // ====== Private Methods ====== //
    fun getCertificateInit(owner: Address, courseId: String, userId: String): StateInit {
        return initOf CourseCertificate(myAddress(), owner, courseId, userId);
    }

    fun requireValidData(msg: IssueCertificate) {
        require(msg.courseId != "" && msg.userId != "", "Invalid certificate data");
    }

    // ====== Get Methods ====== //
    get fun certificateAddress(owner: Address, courseId: String, userId: String): Address {
        let init: StateInit = self.getCertificateInit(owner, courseId, userId);
        return contractAddress(init);
    }
}