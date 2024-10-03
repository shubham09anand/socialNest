const storySchema = require("../../Models/StoryModel");
const { ObjectId } = require("mongodb");

const getSelectedStory = async (req, res) => {
    try {
        const storyId = new ObjectId(req.query.storyId);
     //    console.log("Story ID:", storyId);

        const Story = await storySchema.aggregate([
            {
                $match: {
                    _id: storyId,
                },
            },
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
                    as: "storyUserDetalis",
                },
            },
            {
                $lookup: {
                    from: "UserProfileDataCollection",
                    let: { userId: "$userId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: [ "$$userId" , "$userId"] },
                            },
                        },
                    ],
                    as: "userPhoto",
                },
            },
            {
                $project: {
                    "storyUserDetalis.password": 0,
                    "storyUserDetalis.createdAt": 0,
                    "storyUserDetalis.updatedAt": 0,
                    "storyUserDetalis.__v": 0,
                    "storyUserDetalis._id": 0,

                    "userPhoto._id": 0,
                    "userPhoto.userId": 0,
                    "userPhoto.dateOfBirth": 0,
                    "userPhoto.phoneNumber": 0,
                    "userPhoto.city": 0,
                    "userPhoto.state": 0,
                    "userPhoto.country": 0,
                    "userPhoto.description": 0,
                    "userPhoto.studiedAt": 0,
                    "userPhoto.youAre": 0,
                    "userPhoto.createdAt": 0,
                    "userPhoto.updatedAt": 0,
                    "userPhoto.__v":0                
                },
            },
        ]);

        if (Story.length === 0) {
            // console.log("No Story Exists");
            res.status(400).json({
                message: "No Story Exists",
                storyDetails: Story,
            });
        } else {
            // console.log("Story Exists");
            res.status(200).json({
                message: "Story Exists",
                storyDetails: Story,
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

module.exports = { getSelectedStory };
