import { configureStore } from "@reduxjs/toolkit";
import { AuthInfo, QueryInfo, ThemeInfo } from "../models";
import authSliceReducer from './states/auth';
import themeSliceReducer from './states/theme';
import querySliceReducer from './states/query';



export interface AppStore {
    auth: AuthInfo,
    theme: ThemeInfo,
    query: QueryInfo,
}

export default configureStore<AppStore>({
    reducer: {
        auth: authSliceReducer,
        theme: themeSliceReducer,
        query: querySliceReducer
    }
});
