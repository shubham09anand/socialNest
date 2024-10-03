const FriendRecordModel = require("../../../Models/FriendRecordModel");

const removeFriend = async (req, res) => {
    try {
        const { friendId, userId } = req.body;

        // Find the friend record where friend_1 or friend_2 matches userId and friendId
        const friendRecord = await FriendRecordModel.findOne({
            $or: [
                { friend_1: userId, friend_2: friendId },
                { friend_1: friendId, friend_2: userId }
            ]
        });

        if (!friendRecord) {
            return res.status(404).json({
                message: 'Friend not found',
                status: 0
            });
        }

        // Delete the friend record
        await FriendRecordModel.deleteOne({ _id: friendRecord._id });

        return res.status(200).json({
            message: 'Friend removed successfully',
            status: 1
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 0,
            error: error.message
        });
    }
};

module.exports = { removeFriend };
