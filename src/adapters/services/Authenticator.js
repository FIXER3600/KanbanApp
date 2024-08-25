const jwt = require("jsonwebtoken");

class Authenticator {
  generateToken(input,
    expiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN) {
    const token = jwt.sign(
      {
        id: input.id,
      },
      process.env.JWT_KEY,
      {
        expiresIn,
      }
    );
  

    return token;
  }

  getData(token) {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    const result = {
      id: payload.id
    };
    return result;
  }
}
module.exports=Authenticator