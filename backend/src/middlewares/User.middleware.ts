import config from "../configs/config.js";

import jwt from "jsonwebtoken";
function IsUser(req: any, res: any, next: any) {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      message: "Unauthorized! No Token Provided",
    });
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    req.user = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Unauthorized! Invalid Token",
    });
  }
}
export default IsUser;