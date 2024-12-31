import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface successAlertState {
  show: boolean,
  text: string
}

const initialState: successAlertState = {
  show: false,
  text: ''
}

export const successAlertSlice = createSlice({
  name: "successAlert",
  initialState,
  reducers: {
    setSuccessAlert(state, action: PayloadAction<{show: boolean, text: string}>) {
      state.show = action.payload.show
      state.text = action.payload.text
    },
  },
})

export const { setSuccessAlert } = successAlertSlice.actions
export default successAlertSlice.reducer
