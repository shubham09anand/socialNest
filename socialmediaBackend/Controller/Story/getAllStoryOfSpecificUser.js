const storySchema = require("../../Models/StoryModel");

const getAllStoryOfSpecificUser = async (req, res) => {
  const userId = req.body.userId;
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 1;
  const skip = (page - 1) * limit;

  try {
    const totalStories = await storySchema.aggregate([
      { $match: { userId: userId } },
      { $unwind: "$stories" },
      { $count: "total" },
    ]);

    const Story = await storySchema.aggregate([
      { $match: { userId: userId } },
      { $unwind: "$stories" },
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
          "stories.storyMessage": 1,
          "stories.storyPhoto": 1,
          "stories.duration": 1,
          "stories.postCreationTime": 1,
        },
      },
      { $skip: skip },   // Skip based on the current page
      { $limit: limit }, // Limit the number of stories to return per page
      {
        $group: {
          _id: "$_id", // Group back by user ID
          userId: { $first: "$userId" },
          stories: { $push: "$stories" }, // Push the stories back into an array
          storyUserDetails: { $first: "$storyUserDetails" },
        },
      },
    ]);

    if (Story.length === 0) {
      res.status(400).json({
        message: "No Story Exists",
        storyDetails: Story,
      });
    } else {
      res.status(200).json({
        message: "Story Exists",
        storyDetails: Story,
        totalStories: totalStories[0]?.total || 0,
        currentPage: page,
        totalPages: Math.ceil((totalStories[0]?.total || 0) / limit),
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

module.exports = { getAllStoryOfSpecificUser };
