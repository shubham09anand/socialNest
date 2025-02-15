const Article = require("../../Models/ArticleModel");

const getArticle = async (req, res) => {
    try {
        const articlesData = await Article.aggregate([
            {
                $lookup: {
                    from: "UserSignupDataCollection",
                    let: { userIdObj: { $toObjectId: "$userID" } },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id", "$$userIdObj"]
                                }
                            }
                        },
                        {
                            $project: {
                                "password": 0
                            }
                        }
                    ],
                    as: "writerdata"
                }
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
                    as: "authorDetalis",
                },
            },
            {
                $addFields: {
                    authorDetalis: { $arrayElemAt: ["$authorDetalis", 0] },
                },
            },
            {
                $addFields: {
                    articlePhotos: { $arrayElemAt: ["$articlePhotos", 0] },
                },
            },
            {
                $addFields: {
                    articleParagraphs: { $arrayElemAt: ["$paragraphs", 0] }, 
                },
            },
            {
                $project: {
                    "writerdata.dateOfBirth": 0,
                    "writerdata.phoneNumber": 0,
                    "writerdata.city": 0,
                    "writerdata.state": 0,
                    "writerdata.country": 0,
                    "writerdata.description": 0,
                    "writerdata.createdAt": 0,
                    "writerdata.updatedAt": 0,
                    "writerdata._id": 0,
                    "writerdata.__v": 0,
                    "authorDetalis._id": 0,
                    "authorDetalis.userId": 0,
                    "authorDetalis.dateOfBirth": 0,
                    "authorDetalis.phoneNumber": 0,
                    "authorDetalis.city": 0,
                    "authorDetalis.state": 0,
                    "authorDetalis.country": 0,
                    "authorDetalis.studiedAt": 0,
                    "authorDetalis.backGroundPhoto": 0,
                    "authorDetalis.description": 0,
                    "authorDetalis.youAre": 0,
                    "authorDetalis.createdAt": 0,
                    "authorDetalis.updatedAt": 0,
                    "authorDetalis.__v": 0,
                    "authorDetalis.__v": 0,
                    "storyWriterName.userId": 0,
                    "storyWriterName.createdAt": 0,
                    "storyWriterName.updatedAt": 0,
                    "updatedAt": 0,
                    "__v": 0,
                },
            },
        ]);

        return res.status(200).json({ success: true, article: articlesData });

    } catch (error) {
        console.error("Error getting articles:", error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

module.exports = { getArticle };
