import "@stdlib/ownable";

import "./messages";

struct CourseCertificateDetails {
    owner: Address;
    courseId: String;
    userId: String;
}

contract CourseCertificate with Ownable {
    owner: Address;
    courseId: String;
    userId: String;

    init(issuer: Address, courseId: String, userId: String) {
        self.owner = issuer;
        self.courseId = courseId;
        self.userId = userId;
    }

    get fun courseId(): String {
        return self.courseId;
    }

    get fun userId(): String {
        return self.userId;
    }

    get fun details(): CourseCertificateDetails {
        return CourseCertificateDetails {
            owner: self.owner,
            courseId: self.courseId,
            userId: self.userId
        };
    }
}