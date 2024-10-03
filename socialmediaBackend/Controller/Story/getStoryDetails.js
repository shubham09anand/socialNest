const storySchema = require("../../Models/StoryModel");

const storyDetails = async (_, res) => {
  try {
    const Story = await storySchema.aggregate([
      {
        $lookup: {
          from: "UserSignupDataCollection",
          let: { userId: "$userId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: [{ $toObjectId: "$$userId" }, "$_id"] },
              },
            },
          ],
          as: "storyUserDetails",
        },
      },
      {
        $project: {
          "storyUserDetails.password": 0,
          "storyUserDetails.createdAt": 0,
          "storyUserDetails.updatedAt": 0,
          "storyUserDetails.__v": 0,
          "storyUserDetails._id": 0,
        },
      },
    ]);

    const getActiveStories = (stories) => {
      const currentTime = new Date();
      return stories.map(story => {
        const activeStoryItems = story.stories.filter(storyItem => {
          const postCreationTime = new Date(storyItem.postCreationTime);
          const durationInMilliseconds = storyItem.duration * 60 * 60 * 1000;
          return currentTime - postCreationTime < durationInMilliseconds;
        });

        if (activeStoryItems.length > 0) {
          return {
            ...story,
            stories: activeStoryItems
          };
        }
        return null;
      }).filter(story => story !== null);
    };

    const activeStories = getActiveStories(Story);

    if (Story.length === 0) {
      res.status(400).json({
        message: "No Story Exists",
        storyDetails: activeStories,
      });
    } else {
      res.status(200).json({
        message: "Story Exists",
        storyDetails: activeStories,
      });
    }
  } catch (error) {
    console.error("Procedure failed:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { storyDetails };
