import oAuthModel from "../models/oAuthModel.js";

const deleteUser = async (req, res) => {
  const { email } = req.body;
  try {
    const deletedUser = await oAuthModel.findOneAndDelete({ email });
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error deleting user", error });
  }
};

export default deleteUser;
