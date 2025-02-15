const Story = require("../../Models/StoryModel");

const createuserStory = async (req, res) => {
  try {
    const { userId, storyMessage, storyPhoto, duration, postCreationTime } = req.body;

    // Check if a story document for the user already exists
    const checkStoryExistance = await Story.findOne({ userId: userId });

    if (checkStoryExistance) {
      // console.log("Story already exists for this user");

      // Append the new story to the 'stories' array
      checkStoryExistance.stories.push({
        storyMessage: storyMessage,
        storyPhoto: storyPhoto,
        duration: duration,
        postCreationTime: postCreationTime,
      });

      // Save the updated story document
      await checkStoryExistance.save();

      return res.status(200).json({
        message: "Story added successfully",
        status:1
      });

    } else {
      // Create a new document for the user
      const newUserStory = await Story.create({
        userId: userId,
        stories: [
          {
            storyMessage: storyMessage,
            storyPhoto: storyPhoto,
            duration: duration,
            postCreationTime: postCreationTime,
          },
        ],
      });

      return res.status(200).json({
        message: "Story created successfully",
        status: 1,
      });
    }

  } catch (error) {
    console.error("Error creating story:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { createuserStory };
