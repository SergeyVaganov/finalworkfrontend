import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getToken } from '../../services/getToken'
import { SignInSchemaType } from '../../components/SignInForm/SignInForm'


export const fetchAuthorize = createAsyncThunk(
    'auth/fetchAuthorize',
    async (data: SignInSchemaType) => {
        const response = await getToken(data)
        return response
    },
)

export interface IAuth {
    authorized: boolean,
    error: string,
    loading: boolean,
    accessToken: string,
    expire: string | null,
    login: string
}

const initialState: IAuth = {
    authorized: false,
    error: '',
    loading: false,
    accessToken: '',
    expire: null,
    login: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut(state) {
            state.authorized = false
            state.accessToken = ''
            state.expire = null
            state.login = ''
        },
        authorizedOff(state) {
            state.authorized = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuthorize.pending, (state) => {
            state.login = ''
            state.loading = true
            state.error = ''
        })
        builder.addCase(fetchAuthorize.fulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken
            state.login = action.payload.login
            state.loading = false
            state.authorized = true
            state.expire = action.payload.expire
        })
        builder.addCase(fetchAuthorize.rejected, (state, action) => {
            state.accessToken = ''
            state.loading = false
            state.authorized = false
            state.expire = null
            state.error = action.error.message || ''
        })
    },
})

export const { signOut, authorizedOff } = authSlice.actions
export default authSlice.reducer