import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getInfo, IInfo } from '../../services/getInfo'


export const fetchInfo = createAsyncThunk(
    'info/fetchInfo',
    async (accessToken: string) => {
        const response = await getInfo(accessToken)
        return response
    },
)

const initialState: IInfo & { error: string, loading: boolean } = {
    error: '',
    loading: false,
    eventFiltersInfo: {
        usedCompanyCount: 0,
        companyLimit: 0
    }
}

const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchInfo.pending, (state) => {

            state.loading = true
            state.error = ''
        })
        builder.addCase(fetchInfo.fulfilled, (state, action) => {
            state.eventFiltersInfo.companyLimit = action.payload.eventFiltersInfo.companyLimit
            state.eventFiltersInfo.usedCompanyCount = action.payload.eventFiltersInfo.usedCompanyCount
            state.loading = false
        })
        builder.addCase(fetchInfo.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || ''
        })
    },
})

export default infoSlice.reducer

