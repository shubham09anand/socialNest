const UserLogin = require("../Models/UserSignupModel");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
     try {
          const existingUser = await UserLogin.findOne({ userName: req.body.userName, password: req.body.password });

          // console.log("existingUser")

          if (!existingUser) {
               return res.status(200).send({
                    success: false,
                    message: "Login Failed !!! Invalid Credentials",
               });
          }
          else {
               const token = jwt.sign({ userId: existingUser._id }, 'SecondTowerIsDown', { expiresIn: "1d" });
               const { password, updatedAt, __v, createdAt, ...userData } = existingUser.toObject();
               return res.status(200).send({
                    success: true,
                    message: "Login Success",
                    token,
                    userData,
               });
          }
     } catch (error) {
          return res.status(500).send({
               success: false,
               message: "Error during login",
          });
     }
};

module.exports = { loginController };
