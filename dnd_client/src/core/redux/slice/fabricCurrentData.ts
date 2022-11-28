import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFabricCurrentStateData, TypeFabricObjectSelection } from "../../../models";

type FabricCurrentDataState = TFabricCurrentStateData & {
  isWorking: boolean,
  taskCount: number,
}

function GetInitialState(): FabricCurrentDataState {
  return {
    isWorking: false,
    taskCount: 0,
  };
}

const fabricCurrentDataSlice = createSlice({
  initialState: GetInitialState(),
  name: 'fabricCurrentDataSlice',
  reducers: {
    SetObjectSelection: (state, action: PayloadAction<TypeFabricObjectSelection>) => ({ ...state, selection: action.payload }),
    ClearObjectSelection: (state) => ({ ...state, selection: undefined }),
    SetPanMode: (state, action: PayloadAction<boolean>) => ({ ...state, isPanMode: action.payload }),
    SetCanZoomIn: (state, action: PayloadAction<boolean>) => ({ ...state, canZoomIn: action.payload }),
    SetCanZoomOut: (state, action: PayloadAction<boolean>) => ({ ...state, canZoomOut: action.payload }),
    TaskStarted: (state) => {
      const taskCount = state.taskCount + 1;
      return { ...state, taskCount, isWorking: taskCount > 0 };
    },
    TaskEnded: (state) => {
      const taskCount = Math.max(0, state.taskCount - 1);
      return { ...state, taskCount, isWorking: taskCount > 0 };
    },
  },
});

export const ReducerFabricCurrentData = fabricCurrentDataSlice.reducer;
export const ActionsFabricCurrentData = fabricCurrentDataSlice.actions;