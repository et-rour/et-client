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

export const deleteUser = (state, { id }) => {
  const index = state.users.findIndex(
    (user) => user.id == id
  );

  if (index !== -1) {
    let newUsers = state.users;
    newUsers.splice(index, 1)
    state.users = newUsers;
  }
}

export const deleteUserPermanent = (state, { id }) => {
  const index = state.trash.findIndex(
    (element) => element.id == id
  );

  if (index !== -1) {
    let newTrash = state.trash;
    newTrash.splice(index, 1)
    state.trash = newTrash;
  }
}

export const restoreUser = (state, { id }) => {
  const index = state.trash.findIndex(
    (element) => element.id == id
  );

  if (index !== -1) {
    let newTrash = state.trash;
    const restoredElement = newTrash.splice(index, 1)
    state.trash = newTrash;
    state.users = [...state.users, restoredElement];
  }
};

export const getTrashUsers = (state, {users}) => {
  state.trash = users;
}