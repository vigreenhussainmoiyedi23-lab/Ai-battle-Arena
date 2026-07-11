import { Router } from "express";
import userModel from "../models/user.model.js";
import { sendResponse } from "../utils/SendResponse.js";
import bcrypt from "bcryptjs";
import setCookie from "../utils/setCookie.js";
import IsUser from "../middlewares/User.middleware.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const userAlreadyExists = await userModel.findOne({ email });

  if (userAlreadyExists) {
    return sendResponse({
      status: 400,
      json: { message: "User Already Exists" },
      res,
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    setCookie({ id: user._id }, res);
    sendResponse({
      status: 201,
      json: { message: "User Created Successfully" },
      res,
    });
  } catch (error) {
    console.log(error);
    sendResponse({
      status: 500,
      json: { message: "Something went wrong" },
      res,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return sendResponse({
        status: 404,
        json: { message: "Incorrect Credentials" },
        res,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      return sendResponse({
        status: 404,
        json: { message: "Incorrect Credentials" },
        res,
      });
    }

    setCookie({ id: user._id }, res);
    sendResponse({
      status: 200,
      json: { message: "Login Successful" },
      res,
    });
  } catch (error) {}
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  sendResponse({
    status: 200,
    json: { message: "Logout Successful" },
    res,
  });
});

router.get("/get-me", IsUser, async (req:any, res) => {
  if (!req.user) {
    return sendResponse({
      status: 401,
      json: { message: "Unauthorized" },
      res,
    });
  }

  const user = await userModel.findById(req.user);

  sendResponse({
    status: 200,
    json: { user },
    res,
  });
});

export default router;
