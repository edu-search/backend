const dns = require('dns');

const alphanumregex = RegExp("^[a-zA-Z0-9]*$");
const emailregex = RegExp("^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
const pwregex = [
    RegExp("[a-z]"),
    RegExp("[A-Z]"),
    RegExp("[0-9]"),
    RegExp("[!@#~$%^&*()+|_]")
];

function IsValidEmail(email = "") {
    // email validation function using dns.resolvemx()
    if (email.length < 3 || email.length > 254) { // ||, not &&
        return false;
    }
    if (!emailregex.test(email)) {
        return false;
    }

    // resolve mail exchange records using dns to validate email legitimacy
    var parts = email.split('@');

    var isLegit = false;

    dns.resolveMx(parts[1], (err, addresses) => {
        isLegit = !!addresses;
        console.log(isLegit); // only callback in the end of code

    });
    return isLegit; // true not returned
}

function IsStrongPassword(password = "", requiredLength = 8) {
    if (password.length < requiredLength) {
        return false;
    }
    for (let i = 0; i < pwregex.length; i++) {
        if (!password.match(pwregex[i])) {
            return false;
        }
    }
    return true;
}