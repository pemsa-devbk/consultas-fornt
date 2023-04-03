import { createSlice } from '@reduxjs/toolkit';
import { QueryInfo, TypeAccount } from '../../models';

const QueryEmpty: QueryInfo = {
    accounts: [],
    type: TypeAccount.WITHOUT,
    dateStart: '',
    dateEnd: ''
}

export const querySlice = createSlice({
    name: 'query',
    initialState: QueryEmpty,
    reducers: {
        define: (state, action) => {
            state.accounts = action.payload.accounts;
            state.type = action.payload.type;
            state.dateStart = action.payload.dateStart;
            state.dateEnd = action.payload.dateEnd;
        }
    }
})

export const {define} = querySlice.actions;

export default querySlice.reducer;
