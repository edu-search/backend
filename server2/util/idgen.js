const process = require('process');
var serverID;
var svrid = 'SERVERID'; // What is this "SERVERID"?

function init() {
    const v = process.env[svrid];
    if (v == undefined) {
        serverID = 0;
    }
    try {
        var id = parseInt(v, 10);
    } catch (err) {
        console.error(err);
    }
    serverID = id;
}

// GenerateID
function GenerateID() {
    const now = process.hrtime();
    var seconds = now[0];
    var nanoseconds = now[1]; // decimals of seconds
    var milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);

    seconds = seconds & 4294967295; // 1 << 32 - 1
    milliseconds = milliseconds & 4095; // 1 << 16 - 1
    var currentServerID = serverID & 1023; // 1 << 10 - 1

    function addBigBinary(a, b) {
        return (BigInt('0b' + a) + BigInt('0b' + b)).toString(2)
    }

    var secBinaryStr = seconds.toString(2) + '00000000000000000000000000000000'; // 32 zeros
    var millisecBinaryStr = milliseconds.toString(2) + '00000000000000000000'; // 20 zeros
    var currServerIDBinaryStr = currentServerID.toString(2);

    var idStr = addBigBinary(addBigBinary(secBinaryStr, millisecBinaryStr, 2), currServerIDBinaryStr, 2);
    return parseInt(idStr, 2);
}

module.exports = GenerateID;