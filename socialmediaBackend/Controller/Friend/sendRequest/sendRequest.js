const FriendRequest = require("../../../Models/FriendRequestModle");

const newFriendRequest = async (req, res) => {
  try {
    const friendRequest = req.body;

    const exisitingFriendRequest = await FriendRequest.findOne({
      $or: [
        { senderId: req.body.senderId, reciverId: req.body.reciverId },
        { senderId: req.body.reciverId, reciverId: req.body.senderId }
      ]
    });

    if (!exisitingFriendRequest) {
      const newfriendRequest = await FriendRequest.create(friendRequest);

      return res.status(200).json({
        message: 'Friend Request Sent',
        friendRequest: newfriendRequest,
        status: 1,
      });
    } else {
      return res.status(200).json({
        message: 'Friend Request Already Exists',
        friendRequest: exisitingFriendRequest,
        status: 0,
      });
    }

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message: 'Process Failed',
      error: error.message, 
    });
  }
};

module.exports = { newFriendRequest };
