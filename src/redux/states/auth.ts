import { createSlice } from '@reduxjs/toolkit';
import { AuthInfo, CompanyInfo, Status, UserInfo } from "../../models";

const userEmpty: UserInfo = {
    id: "",
    fullName: "",
    email: "",
    termsAndConditions: false,
    roles: []
}

const companyEmpty: CompanyInfo = {
    id: "",
    name: "",
    logoPath: "",
    primaryColor: "",
    shortName: ""
}

export const EmptyAuthState: AuthInfo = {
    status: Status.CHEKING,
    user: userEmpty,
    company: companyEmpty,
    token: '',
    refreshToken: '',
    errorMessage: []
}


export const authSlice = createSlice({
    name: 'auth',
    initialState: localStorage.getItem('token') ? { ...EmptyAuthState, token: localStorage.getItem('token') } : EmptyAuthState,
    reducers: {
        onCheking: (state) => {
            state.status = Status.CHEKING,
            state.user = userEmpty;
        },
        onStartSession: (state) => {
            state.status = Status.STARTSESSION;
        },
        onLogin: (state, action) => {
            const { token, company, ...user } = action.payload;
            state.user = { ...user };
            state.company = {...company};
            state.token = token;
            state.status = Status.AUTHENTICATED;
        },
        onLogout: (state, action) => {
            state.user = userEmpty;
            state.status = Status.UNAUTHENTICATED;
            state.token = '';
            state.errorMessage = action.payload;
        },
        accepTerms: (state, action) => {
            state.user.termsAndConditions = true;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = [];
        }
    }
});

export const { onCheking, onLogin, onLogout, clearErrorMessage, onStartSession, accepTerms } = authSlice.actions;

export default authSlice.reducer;