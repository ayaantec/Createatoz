import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createSelectorHook } from "react-redux";
import { Action, combineReducers } from "redux";
import { ReducerDeletation, ReducerDesign, ReducerFabricCurrentData, ReducerUser } from "./slice";

const DragAndDropReducer = combineReducers({
  user: ReducerUser,
  design: ReducerDesign,
  deleteOption: ReducerDeletation,
  fabricData: ReducerFabricCurrentData,
});

const DragAndDropResetActionType = 'dragAndDrop/ResetAllState';
export const ActionDragAndDropAppReset = (): { type: string } => ({ type: DragAndDropResetActionType });

const DragAndDropRootReducer: (...param: Parameters<typeof DragAndDropReducer>) => ReturnType<typeof DragAndDropReducer> = (state, action) => {
  if (action.type === DragAndDropResetActionType) {
    state = undefined
  }
  return DragAndDropReducer(state, action);
}

export const DragAndDropStore = configureStore({
  reducer: DragAndDropRootReducer,
  devTools: process.env.NODE_ENV === 'development',
});

export type DragAndDropAppState = ReturnType<typeof DragAndDropReducer>;

export type DragAndDropAppDispatch = typeof DragAndDropStore.dispatch;

export type DragAndDropAppThunk = ThunkAction<void, DragAndDropAppState, null, Action<string>>;

export type DragAndDropAppThunkApi<EXTR = unknown, REJECT = unknown> = {
  dispatch: DragAndDropAppDispatch;
  getState: () => DragAndDropAppState;
  requestId: string;
  extra: EXTR;
  signal: AbortSignal;
  rejectWithValue: (value: REJECT) => void;
};

export const useSelectorTyped = createSelectorHook<DragAndDropAppState>();