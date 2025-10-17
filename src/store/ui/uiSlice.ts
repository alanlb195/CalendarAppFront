import { createSlice } from '@reduxjs/toolkit'

export interface UiState {
  isDateModalOpen: boolean
}

const initialState: UiState = {
  isDateModalOpen: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onOpenDateModal: (state) => {
        state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
        state.isDateModalOpen = false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions

export default uiSlice.reducer