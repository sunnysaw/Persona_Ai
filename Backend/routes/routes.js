import express from "express";
import userPersona from "../controllers/openAiCompletionController.js";
import userCredentials from "../controllers/oAuthController.js";
import deleteUser from "../controllers/oAuthLogoutController.js";
// import verifyToken from "../middlewares/validateAccessTokenMiddleware.js";

const router = express.Router();

router.post("/login", userCredentials);
router.post("/logout", deleteUser);
router.post("/query",  userPersona);

export default router;
// verifyToken ,