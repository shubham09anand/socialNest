import API from '../../Services/API';

export const warning = (hook, value, time) => {
     hook(value);
     setTimeout(() => {
          hook(!value);
     }, time);
}

export const handleUpdateDesc = async ({ groupId, editedName, editedDesc }) => {
     if (!editedName.trim() || !editedDesc.trim()) {
          alert("Group name and description cannot be empty or just spaces.");
          throw new Error("Validation failed");
     }
     const response = await API.post('/updateGroup', { groupId, groupName: editedName.trim(), groupDesc: editedDesc.trim() });
     return response.data;
}

export const getGroupMember = async (groupId) => {
     const response = await API.post('/groupMemberList', { groupId });
     return response.data;
};

export const removeMember = async ({ groupId, userId }) => {
     const response = await API.post('/removeMemberByAdmin', { groupId, userId });
     return response;
};

export const makeMoreAdmin = async ({ groupId, newAdminId }) => {
     const response = await API.post('/makeMoreAdmin', { groupId, newAdminId });
     return response;
}

export const removeAdmin = async ({ groupId, userId }) => {
     const response = API.post('/removeAdmin', { groupId, userId });
     return response;
}

export const getScheduledMessage = async ({ groupId, senderId }) => {
     const response = await API.post('/getPendingMessage', { groupId, senderId });
     return response.data;
}

export const pendingRequest = async ({ groupId }) => {
     const response = await API.post('/fetchAllPendingRequest', { groupId });
     return response.data;
};

export const processRequest = async ({ groupId, action, requesterId, requestId }) => {
     const response = await API.post('/processJoingRequest', { groupId, action, requesterId, requestId });
     return response.data;
};