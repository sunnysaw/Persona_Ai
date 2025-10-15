import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "token is not available in request" });
    }
    const verify = jwt.decode(token, "process.env.SECRET_KEY");
      req.user = verify;
      console.log(req.user);
      
    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        message: `error occur in the verfiyMiddleware => ${error.message}`,
      });
  }
};

export default verifyToken;
