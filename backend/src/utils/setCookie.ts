import jwt from "jsonwebtoken";
import config from "../configs/config.js";

function setCookie(data: any, res: any) {
  const token = jwt.sign(data, config.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: config.NODE_ENV === "production" ? true : false,
    secure: config.NODE_ENV === "production" ? true : false,
    sameSite: config.NODE_ENV === "production" ? "strict" : "lax",
  });
}

export default setCookie;
