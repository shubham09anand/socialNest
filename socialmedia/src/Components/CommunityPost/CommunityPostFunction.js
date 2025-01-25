import API from "../../Services/API";

export const warning = (hook, value, time) => {
     hook(value);
     setTimeout(() => {
          hook(!value);
     }, time);
}

export const getProfilePic = async (postMakerIdArray) => {
     if (Array.isArray(postMakerIdArray) && postMakerIdArray.length > 0) {
          const response = await API.post('/profilePicture', { userIdArray: postMakerIdArray });
          return response.data?.photo;
     }
};

export const createPost = async ({ groupId, userId, type, postPhoto, postMessage }) => {
     const response = await API.post("/createGroupPost", { groupId: groupId, userId: userId, type: type, postPhoto: postPhoto, postMessage: postMessage });
     return response.data;
};

export const fetchGroupPost = async (groupId, page) => {
     if (groupId) {
          const response = await API.post('/fetchGroupPost', { groupId, page });
          return response;
     }
}

export const getPostComment = async ({ postId,page }) => {
     const response = await API.post("/fetchPostComment", { postId,page });
     return response.data;
};

export const deletePost = async ({ groupId, postId }) => {
     const response = await API.post('/deleteGroupPost', { groupId, postId });
     return response.data;
};
