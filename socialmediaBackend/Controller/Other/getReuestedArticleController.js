const Article = require("../../Models/ArticleModel");
const { ObjectId } = require("mongodb");

const getRequestedArticle = async (req, res) => {
     try {
          const articleId = new ObjectId(req.params.articleId);

          const articlesData = await Article.aggregate([
               {
                    $match: {
                         _id: articleId,
                    },
               },
               {
                    $lookup: {
                         from: "UserProfileDataCollection",
                         let: { userId: "$userId" },
                         pipeline: [
                              {
                                   $match: {
                                        $expr: {
                                             $and: [{ $eq: ["$userID", "$$userId"] }],
                                        },
                                   },
                              },
                         ],
                         as: "storyUserDetalis",
                    },
               },
               {
                    $lookup: {
                         from: "UserSignupDataCollection",
                         let: { userId: "$userID" },
                         pipeline: [
                              {
                                   $match: {
                                        $expr: { $eq: [{ $toObjectId: "$$userId" }, "$_id"] },
                                   },
                              },
                         ],
                         as: "storyWriterName",
                    },
               },
               {
                    $addFields: {
                         storyUserDetalis: { $arrayElemAt: ["$storyUserDetalis", 0] }, // Pick only the first instance from storyUserDetalis array
                    },
               },
               {
                    $project: {
                         "storyUserDetalis.createdAt": 0,
                         "storyUserDetalis.updatedAt": 0,
                         "storyUserDetalis.__v": 0,
                         "storyUserDetalis._id": 0,
                         "storyUserDetalis.userId": 0,
                         "storyUserDetalis.dateOfBirth": 0,
                         "storyUserDetalis.phoneNumber": 0,
                         "storyUserDetalis.city": 0,
                         "storyUserDetalis.state": 0,
                         "storyUserDetalis.country": 0,
                         "storyUserDetalis.studiedAt": 0,
                         "storyUserDetalis.backGroundPhoto": 0,
                         "storyUserDetalis.description": 0,
                         "storyUserDetalis.youAre": 0,
                         "storyWriterName.userId": 0,
                         "storyWriterName.password": 0,
                         "storyWriterName.createdAt": 0,
                         "storyWriterName.createdAt": 0,
                         "storyWriterName._id": 0,
                         "storyWriterName.__v": 0,
                         "__v": 0,
                         "updatedAt": 0,

                    },
               },
          ]);

          res.status(201).json({
               success: true,
               articleData: articlesData,
          });
     } catch (error) {
          console.error("Error getting articles:", error);
          res.status(500).json({
               success: false,
               error: "Internal Server Error",
          });
     }
};

module.exports = { getRequestedArticle };
