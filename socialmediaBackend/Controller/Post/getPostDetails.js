const PostSchema = require("../../Models/PostModel");
const { ObjectId } = require("mongodb");

const PostDetails = async (req, res) => {
  try {

    const limit = 2; 

    const page = parseInt(req.body.page) || 1; 
    const skip = (page - 1) * limit; // Calculate skip value if pagination is desired

    const postId = new ObjectId(req.body.postId);

    const Post = await PostSchema.aggregate([
      {
        $lookup: {
          from: "PostCommentCollection",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: [{ $toString: "$$postId" }, "$postId"] },
              },
            },
            {
              $lookup: {
                from: "UserSignupDataCollection",
                let: { commenterId: "$commenterId" },
                pipeline: [
                  {
                    $match: { $expr: { $eq: [{ $toObjectId: "$$commenterId" }, "$_id"] } },
                  },
                  {
                    $project: { firstName: 1, lastName: 1, userName: 1, profilePhoto: 1 },
                  },
                ],
                as: "commenterProfile",
              },
            },
            {
              $lookup: {
                from: "UserProfileDataCollection",
                let: { commenterId: "$commenterId" },
                pipeline: [
                  {
                    $match: { $expr: { $eq: ["$userId", "$$commenterId"] } },
                  },
                  {
                    $project: { profilePhoto: 1 },
                  },
                ],
                as: "commenterPhoto",
              },
            },
            {
              $project: {
                _id: 1,
                postId: 1,
                commenterId: 1,
                commentBody: 1,
                commenterProfile: { $arrayElemAt: ["$commenterProfile", 0] },
                commenterPhoto: { $arrayElemAt: ["$commenterPhoto", 0] },
              },
            },
          ],
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "PostLikeCollection",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: [{ $toString: "$$postId" }, "$postId"] },
              },
            },
          ],
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "UserProfileDataCollection",
          localField: "userId",
          foreignField: "userId",
          as: "postMaker",
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
            {
              $project: { userName: 1, firstName: 1, lastName: 1 },
            },
          ],
          as: "userSignupInfo",
        },
      },
      {
        $unwind: {
          path: "$postMaker",
          preserveNullAndEmptyArrays: true, // Handle cases where no postMaker is found
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
          __v: 1,
          comments: 1,
          likes: 1,
          postMaker: {
            userId: "$postMaker.userId",
            profilePhoto: "$postMaker.profilePhoto", // Keep only profilePhoto and userId
          },
          userSignupInfo: { $arrayElemAt: ["$userSignupInfo", 0] },
        },
      },
      // Add pagination
      { $skip: skip },
      { $limit: limit }, // Limit the number of posts to 3
    ]);

    res.status(200).json({
      message: "Post Exists",
      Post: Post || [],
      currentPage: page,
      totalPosts: await PostSchema.countDocuments({}),
      totalPages: Math.ceil(await PostSchema.countDocuments({}) / limit),
    });
  } catch (error) {
    console.error("Procedure failed:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { PostDetails };
