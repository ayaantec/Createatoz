import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeDesignConfigData } from "../../../models";

type InitialDesignState = {
  isUploadingDesign?: boolean;
  currentDesignConfig?: TypeDesignConfigData;
  currentDesignName?: string;
  currentDesignSubcategory?: string;
};

function GetInitialState(): InitialDesignState {
  return {};
}

const designSlice = createSlice({
  initialState: GetInitialState(),
  name: "designSlice",
  reducers: {
    SetIsUploadingDesign: (state, action: PayloadAction<boolean>) => ({ ...state, isUploadingDesign: action.payload }),
    SetCurrentDesignConfig: (state, action: PayloadAction<TypeDesignConfigData>) => ({ ...state, currentDesignConfig: action.payload }),
    SetDesignName: (state, action: PayloadAction<string>) => ({ ...state, currentDesignName: action.payload }),
    SetDesignSubcategory: (state, action: PayloadAction<string>) => ({ ...state, currentDesignSubcategory: action.payload }),
  },
});

export const ReducerDesign = designSlice.reducer;
export const ActionsDesign = designSlice.actions;