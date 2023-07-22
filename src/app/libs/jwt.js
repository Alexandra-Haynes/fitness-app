import jwt from "jsonwebtoken";

//check sign in - token verification


//create token
export function signJwtToken(payload, options = {}) {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, options);
  return token;
}


//verify token
export function verifyJwtToken(token) {
  try {
    const secret = process.env.JWT_SECRET;
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
