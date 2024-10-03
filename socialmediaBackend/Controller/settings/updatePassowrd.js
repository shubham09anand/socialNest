const UserLogin = require("../../Models/UserSignupModel");

const updatePassword = async (req, res) => {
     try {
          const userId = req.body.userId;
          const newPassword = req.body.newPassword;

          // Find the user by userId
          const user = await UserLogin.findById(userId);

          // Check if the user exists
          if (!user) {
               return res.status(404).json({
                    success: false,
                    message: "User not found",
                    status: 0,
               });
          }

          // Compare new password with the current password
          if (user.password === newPassword) {
               return res.status(200).json({
                    success: false,
                    message: "New password must be different from the current password",
                    status: 2,
               });
          }

          // Update the user's password
          user.password = newPassword;
          await user.save();
          
          res.status(200).json({
               success: true,
               message: "Password updated successfully",
               status: 1,
          });
     } catch (error) {
          console.error("Password updation failed:", error.message);
          res.status(500).json({
               success: false,
               message: "Error during updation",
               status: 0,
          });
     }
};

module.exports = { updatePassword };
