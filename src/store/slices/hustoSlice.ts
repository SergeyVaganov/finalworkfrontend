import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHistogramm } from "../../services/getHistogramm";
import { getObjectsearch } from '../../services/getObjectsearch';
import { clearDocs } from "./documentsSlice";


export const fetchHistogrum = createAsyncThunk(
    'hist/fetchHistogrum',
    async ({ accessToken, data }: { accessToken: string, data: IHistogrammRequesBody }, apiThink) => {
        const response = await Promise.all([getHistogramm(accessToken, data), getObjectsearch(accessToken, data)])
        apiThink.dispatch(clearDocs())
        return response
    },)


let initialState: IHistogrammResponse & IObjectsearch & { error: string, loading: boolean } = {
    error: '',
    loading: false,
    data: [],
    items: [],
    mappings: undefined
}

const histoSlice = createSlice({
    name: 'hist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchHistogrum.pending, (state) => {
            state.data = []
            state.items = []
            state.loading = true
            state.error = ''
        })
        builder.addCase(fetchHistogrum.fulfilled, (state, action) => {
            state.data = action.payload[0].data
            state.items = action.payload[1].items
            state.loading = false
        })
        builder.addCase(fetchHistogrum.rejected, (state, action) => {

            state.loading = false
            state.error = action.error.message || ''
        })
    },
})


export default histoSlice.reducer
