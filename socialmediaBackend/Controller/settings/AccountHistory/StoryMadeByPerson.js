const storySchema = require("../../../Models/StoryModel");

const userStoryHistroy = async (req, res) => {
     try {
          const userId = req.body.userId;

          const stories = await storySchema.find({ userId });

          if (stories.length === 0) {
               return res.status(404).json({
                    success: false,
                    message: "No story exists for the given user ID",
                    userStoryHistroy: [],
               });
          }

          return res.status(200).json({
               success: true,
               message: "Story details found",
               userStoryHistroy: stories,
          });
     } catch (error) {
          console.error("Procedure failed:", error);
          return res.status(500).json({
               success: false,
               message: "Internal Server Error",
               error: error.message,
          });
     }
};

module.exports = { userStoryHistroy };
