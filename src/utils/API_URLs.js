export const baseURL = "http://127.0.0.1:8000/";
export const tokenRefresh = `${baseURL}account/api/token/refresh`;
export const getToken = `${baseURL}account/api/token`;
export const getTicket = `${baseURL}account/api/ticket`;
export const registerLink = `${baseURL}account/register/`;
export const getProfilesLink = `${baseURL}account/`;

export const getMessagesByConversation = (conv_name) =>
  `${baseURL}chat/messages/by_conversation/?conversation_name=${conv_name}`;

export const socketURL = `ws://127.0.0.1:8000/`;

export const getProfilesExceptOwn = `${baseURL}account/all_except_user`;

export const updateProfile = (user_id) => `${baseURL}account/${user_id}/`;

export const getOwnProfileLink = (user_id) => {
  return `${baseURL}account/${user_id}`;
};

export const searchProfiles = (query) => {
  return `${baseURL}account/search/?name=${query}`;
};

export const getPostsLink = (user_id) => {
  return `${baseURL}posts/by_author/${user_id}/`;
};

export const postsLink = `${baseURL}posts/`;

export const getProfileById = (id) => `${baseURL}account/${id}`;
