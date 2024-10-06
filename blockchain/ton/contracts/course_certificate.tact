import "@stdlib/ownable";

import "./messages";

struct CourseCertificateDetails {
    owner: Address;
    courseId: String;
    userId: String;
}

contract CourseCertificate with Ownable {
    master: Address;
    owner: Address;
    courseId: String;
    userId: String;

    init(master: Address, owner: Address, courseId: String, userId: String) {
        require(sender() == master, "Not certificate issuer");

        self.master = master;
        self.owner = owner;
        self.courseId = courseId;
        self.userId = userId;
    }

    // ====== Get Methods ====== //
    get fun courseId(): String {
        return self.courseId;
    }

    get fun userId(): String {
        return self.userId;
    }

    get fun balance(): String {
        return myBalance().toCoinsString();
    }

    receive("identify") {
        dump(myAddress())
    }

    get fun details(): CourseCertificateDetails {
        return CourseCertificateDetails {
            owner: self.owner,  
            courseId: self.courseId,
            userId: self.userId
        };
    }
}