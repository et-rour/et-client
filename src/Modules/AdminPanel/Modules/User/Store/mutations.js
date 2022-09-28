export const getUsers = (state, users) => {
  state.users = users;
};

export const fetchUserDetails = async (state, user) => {
  state.userDetails = user;
};

export const changeIsActiveUser = (state, { isActive }) => {
  const newUserData = {
    ...state.userDetails,
    isActive,
  };

  state.userDetails = newUserData;
};

export const changeIsOwnerStatus = (state, { isOwner }) => {
  const newUserData = {
    ...state.userDetails,
    isOwner,
  };

  state.userDetails = newUserData;
};

export const changeIsAdminRol = (state, { isAdmin }) => {
  const newUserData = {
    ...state.userDetails,
    isAdmin,
  };

  state.userDetails = newUserData;
};
