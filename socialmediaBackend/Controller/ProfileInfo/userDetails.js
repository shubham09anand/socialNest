const FriendRecordModel = require("../../Models/FriendRecordModel");
const PostModel = require("../../Models/PostModel");

const countInfo = async (req, res) => {
    try {
        const { userId } = req.body;

        // Count the number of friends
        const friendCount = await FriendRecordModel.countDocuments({
            $or: [
                { friend_1: userId },
                { friend_2: userId }
            ]
        });

        // Count the number of posts
        const postCount = await PostModel.countDocuments({ userId: userId });

        res.status(200).json({ friendCount, postCount });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports = { countInfo };
