import oAuthModel from "../models/oAuthModel.js";
import validateToken from "./oAuthValidateKeyController.js";
import accessTokenMiddleware from "./accessTokenGeneratorController.js";
import "dotenv/config";

const userCredentials = async (req, res) => {
  const { name, email, picture } = req.body;
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader) {
      return res.status(401).json({ message: "Token missing" });
    }

    const userToken = authHeader.split(" ")[1];
    const checkedToken = await validateToken(userToken);

    if (!checkedToken.decoded?.email_verified) {
      return res.status(401).json({ message: "Invalide Token Credentails " });
    }

    if (!name || !email || !picture) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, email, or picture",
      });
    }

    const userExist = await oAuthModel.findOne({ email });

    if (userExist) {
      return res.status(200).json({
        success: true,
        message: "User already exists, logged in successfully",
        user: userExist,
      });
    }

    const newUser = new oAuthModel({ name, email, picture });
    await newUser.save();

    const serverToken = await accessTokenMiddleware(
      newUser,
      "process.env.SECRET_KEY"
    );
    res.cookie("token", serverToken, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("OAuth login failed:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during OAuth login",
    });
  }
};

export default userCredentials;
