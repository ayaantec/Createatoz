import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiSchemaProfileData } from "../../../models";
import { DataUtils } from "../../../utils";
import { AppLocalStorage } from "../../Storage";
import { TypeSelectedUser } from '../../../models/api/profile';

type InitialDesignState = {
  isLoggedIn: boolean;
  profile?: ApiSchemaProfileData;
  isAdmin: boolean;
  isCollaborator: boolean;
  isUser: boolean;
  selectedUser?: TypeSelectedUser;
};

function GetInitialState(): InitialDesignState {
  const profile = AppLocalStorage.Profile;
  let isAdmin: boolean, isUser: boolean, isCollaborator: boolean;
  isAdmin = isUser = isCollaborator = false;
  if (profile) {
    isAdmin = DataUtils.GetRoleIsAdmin(profile);
    isUser = DataUtils.GetRoleIsUser(profile);
    isCollaborator = DataUtils.GetRoleIsCollaborator(profile);
  }
  return {
    isLoggedIn: !!AppLocalStorage.AccessToken,
    profile,
    isAdmin,
    isUser,
    isCollaborator,
  };
}

const userSlice = createSlice({
  initialState: GetInitialState(),
  name: "designSlice",
  reducers: {
    SetIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      if (!action.payload) AppLocalStorage.ClearAuth();
      return { ...state, isLoggedIn: action.payload };
    },
    SetProfile: (state, action: PayloadAction<ApiSchemaProfileData>) => {
      AppLocalStorage.Profile = action.payload;
      const isAdmin = DataUtils.GetRoleIsAdmin(action.payload);
      const isUser = DataUtils.GetRoleIsUser(action.payload);
      const isCollaborator = DataUtils.GetRoleIsCollaborator(action.payload);
      return {
        ...state,
        profile: action.payload,
        isAdmin,
        isCollaborator,
        isUser,
      };
    },
    SetSelectedUser: (state, action: PayloadAction<TypeSelectedUser>) => {
      return {
        ...state,
        selectedUser: action.payload,
      };
    },
  },
});

export const ReducerUser = userSlice.reducer;
export const ActionsUser = userSlice.actions;
