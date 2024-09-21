import "@stdlib/deploy";
import "@stdlib/ownable";

import "./messages";
import "./course_certificate";

contract CourseCertificateIssuer with Deployable, Ownable {
    owner: Address;
    expectedGasFee: Int as uint64 = ton("0.1"); // TODO DECREASE

    init () {
        self.owner = sender(); // Owner is the deployer
    }

    receive (msg: IssueCertificate) {
        require(sender() == self.owner, "Unauthorized sender"); // TODO CHECK

        let amountWithoutGas = context().value - self.expectedGasFee;

        require(msg.courseId != "" && msg.userId != "", "Invalid certificate data");

        let init: StateInit = initOf CourseCertificate(myAddress(), msg.courseId, msg.userId);

        let certificateAddress = contractAddress(init); // contract address is known before deploy via initial state

        send(SendParameters{
            to: certificateAddress,
            value: amountWithoutGas,
            mode: SendIgnoreErrors, 
            code: init.code,
            data: init.data
        });

        self.reply(IssueCertificateResponse{certificateAddress: certificateAddress}.toCell());
    }

    get fun certificateAddress(courseId: String, userId: String): Address {
        return contractAddress(initOf CourseCertificate(myAddress(), courseId, userId));
    }
}