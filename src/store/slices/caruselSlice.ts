import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState = {
    windowCarusel: 300,
    countBlocks: 3,
    step: 0
}

const CaruselSlice = createSlice({
    name: 'carusel',
    initialState,
    reducers: {
        getCarusel(state, action: PayloadAction<typeof initialState>) {
            state.windowCarusel = action.payload.windowCarusel
            state.countBlocks = action.payload.countBlocks
            state.step = action.payload.step
        }
    }
})

export default CaruselSlice.reducer
export const { getCarusel } = CaruselSlice.actions
