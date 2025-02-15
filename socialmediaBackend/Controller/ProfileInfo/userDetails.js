const FriendRecordModel = require("../../Models/FriendRecordModel");
const PostModel = require("../../Models/PostModel");

const countInfo = async (req, res) => {
    try {
        const { userId } = req.body;

        const friendCount = await FriendRecordModel.countDocuments({
            $or: [
                { friend_1: userId },
                { friend_2: userId }
            ]
        });

        const postCount = await PostModel.countDocuments({ userId: userId });

        return res.status(200).json({ friendCount, postCount });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

module.exports = { countInfo };
