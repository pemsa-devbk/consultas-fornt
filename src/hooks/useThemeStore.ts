import { useSelector, useDispatch } from 'react-redux';
import { AppStore } from '../redux/store';
import {changeDark, changeLight} from '../redux/states/theme'


export const useThemeStore =() => {
    const {neutral, neutral80, primary, primary25, isDark} = useSelector( (state: AppStore) => state.theme);
    const dispatch = useDispatch();

    const applyLigthTheme = () => {
        dispatch( changeLight() );
    }

    const applyDarkTheme = () => {
        dispatch(changeDark());
    }

    return {
        neutral, 
        neutral80,
        primary,
        primary25,
        isDark,
        applyDarkTheme,
        applyLigthTheme
    }
}