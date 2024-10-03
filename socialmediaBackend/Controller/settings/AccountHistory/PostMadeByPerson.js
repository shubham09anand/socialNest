const PostSchema = require("../../../Models/PostModel");

const getUserPostActivity = async (req, res) => {
  try {
    const userId = req.body.userId;
    const Post = await PostSchema.aggregate([
      {
        $match: { userId: userId },
      },
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
                    $match: { $expr: { $eq: ["$$commenterId", "$_id"] } },
                  },
                  {
                    $project: { _id: 1, userId: 1, firstName: 1, lastName: 1, profilePhoto: 1 },
                  },
                ],
                as: "commenterProfile",
              },
            },
            {
              $project: {
                _id: 1,
                postId: 1,
                commenterId: 1,
                commentBody: 1,
                commenterProfile: { $arrayElemAt: ["$commenterProfile", 0] },
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
        $project: {
          _id: 1,
          userId: 1,
          message: 1,
          postPhoto: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          comments: {
            $map: {
              input: "$comments",
              as: "comment",
              in: {
                _id: "$$comment._id",
                postId: "$$comment.postId",
                commenterId: "$$comment.commenterId",
                commentBody: "$$comment.commentBody",
                commenterProfile: "$$comment.commenterProfile",
              },
            },
          },
          likes: {
            $map: {
              input: "$likes",
              as: "like",
              in: { _id: "$$like._id", postId: "$$like.postId" },
            },
          },
          'postMaker._id': 1,
          'postMaker.userId': 1,
          'postMaker.profilePhoto': 1,
        },
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          message: 1,
          postPhoto: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          comments: 1,
          likes: 1,
          'postMaker._id': 1,
          'postMaker.userId': 1,
          'postMaker.firstName': 1,
          'postMaker.lastName': 1,
          'postMaker.profilePhoto': 1,
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
    ]);

    if (Post.length === 0) {
      res.status(400).json({
        message: "No Post Exists",
        getUserPostActivity: Post,
      });
    } else {
      res.status(200).json({
        message: "Post Exists",
        getUserPostActivity: Post,
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

module.exports = { getUserPostActivity };
