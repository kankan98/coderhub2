const crypo = require("crypto");

class md5 {
  md5password(password) {
    return crypo.createHash("md5").update(password).digest("hex");
  }
}

module.exports = new md5();
