import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getDocuments } from '../../services/getDocuments'


export const fetchDocuments = createAsyncThunk('doc/fetchDocuments',
    async ({ accessToken, ids }: { accessToken: string, ids: string[] }, thinkApi) => {
        const response = await getDocuments(accessToken, ids)
        return response
    }
)

const initialState = {
    limit: 10,
    page: 0,
    error: '',
    loading: false,
    docs: [] as IDocumentsResponse[],
}

const documentSlice = createSlice({
    name: 'doc',
    initialState,
    reducers: {
        pageInc(state) {
            state.page = state.page + 1
        },
        pageSet(state, action: PayloadAction<{ page: number }>) {
            state.page = action.payload.page
        },
        clearDocs(state) {
            state.docs = []
            state.page = 0
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDocuments.pending, (state) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(fetchDocuments.fulfilled, (state, action) => {
            state.docs = [...state.docs, ...action.payload]
            state.loading = false
            state.error = ''
        })
        builder.addCase(fetchDocuments.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || ''
        })
    }
})


export const { pageInc, pageSet, clearDocs } = documentSlice.actions
export default documentSlice.reducer