const PostSchema = require("../../Models/PostModel");

const PostDetails = async (req, res) => {
  try {
    const limit = 2;
    const page = parseInt(req.body.page) || 1;
    const skip = (page - 1) * limit;

    const posts = await PostSchema.aggregate([
      {
        $lookup: {
          from: "UserSignupDataCollection",
          let: { userIdString: "$userId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", { $toObjectId: "$$userIdString" }] },
              },
            },
            {
              $project: {
                userName: 1,
                firstName: 1,
                lastName: 1,
              },
            },
          ],
          as: "postMakerDetails",
        },
      },
      {
        $unwind: {
          path: "$postMakerDetails",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "PostLikeCollection",
          let: { postId: { $toString: "$_id" } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$postId", "$$postId"] },
              },
            }
          ],
          as: "likes"
        }
      },
      {
        $addFields: {
          likeCount: { $size: "$likes" },
        },
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          message: 1,
          postPhoto: 1,
          postTags: 1,
          createdAt: 1,
          updatedAt: 1,
          "postMakerDetails.userName": 1,
          "postMakerDetails.firstName": 1,
          "postMakerDetails.lastName": 1,
          likeCount: 1,
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    const totalPosts = await PostSchema.countDocuments();

    return res.status(200).json({
      message: "Posts Fetched",
      Post: posts,
      currentPage: page,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { PostDetails };
