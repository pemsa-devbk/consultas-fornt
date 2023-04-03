import { useSelector, useDispatch } from 'react-redux';
import { TypeAccount } from '../models';
import { define } from '../redux/states/query';
import { AppStore } from '../redux/store';

export const useQueryStore = () => {
    const {accounts, type, dateEnd, dateStart} = useSelector( (state: AppStore) => state.query);
    const dispatch = useDispatch();

   

    const chargeAccounts = (accounts: number[], type: TypeAccount, dateStart: string = '', dateEnd: string = '') => {
        dispatch(define({ accounts, type, dateStart, dateEnd }))
    }

    return {
        accounts,
        type,
        dateEnd, 
        dateStart,
        // Methods
        chargeAccounts
    }
}