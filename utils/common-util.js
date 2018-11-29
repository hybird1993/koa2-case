function setCodeAndMsg(resultCode, data = null) {
    resultCode.data = data;
    return resultCode;
}

module.exports = setCodeAndMsg;