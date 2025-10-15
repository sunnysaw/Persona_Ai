import jwt from "jsonwebtoken";

const accessTokenMiddleware = async (user, secretKey) => {
  if (!user) return null;

  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };

  const token = jwt.sign(payload, secretKey);

  return token;
};

export default accessTokenMiddleware;
