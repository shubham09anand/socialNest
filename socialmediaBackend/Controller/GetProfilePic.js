const ProfileSchema = require("../Models/UserProfileModle");

const profilePicture = async (req, res) => {
     try {
          const { userIdArray } = req.body;
          
          if (!userIdArray || userIdArray.length === 0) {
               return res.status(400).json({
                    message: "No ID found",
               });
          }

          const profilePhotos = await ProfileSchema.aggregate([
               {
                    $match: {
                         userId: { $in: userIdArray }
                    }
               },
               {
                    $project: {
                         "userId": 1,
                         "profilePhoto": 1,
                    }
               }
          ]);

          if (profilePhotos && profilePhotos.length > 0) {
               return res.status(200).json({
                    message: "Profile photo fetched",
                    photo: profilePhotos
               });
          } else {
               return res.status(404).json({
                    message: "No profile photos found",
                    photo: []
               });
          }
     } catch (error) {
          console.error(error);
          return res.status(500).json({
               message: "Server Error",
          });
     }
};

module.exports = { profilePicture };
