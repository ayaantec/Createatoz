import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type TypeFolder = {
  id: string;
  name: string;
}
type InitialState = {
  categoryId?: TypeFolder;
  subcategoryId?: TypeFolder;
};

function GetInitialState(): InitialState {
  let categoryId: TypeFolder = {
    id: '',
    name: ''
  }, subcategoryId: TypeFolder = {
    id: '',
    name: ''
  };

  return{
    categoryId,
    subcategoryId
  };
}

const deletationSlice = createSlice({
  initialState: GetInitialState(),
  name: "deletationSlice",
  reducers: {
    SetCategoryId: (state, action: PayloadAction<TypeFolder>) => ({...state, categoryId: action.payload}),
    SetSubcategoryId: (state, action: PayloadAction<TypeFolder>) => ({...state, subcategoryId: action.payload})
  }
});

export const ReducerDeletation = deletationSlice.reducer;
export const ActionsDeletaion = deletationSlice.actions;