import { useDispatch, useSelector } from "react-redux"
import { clearErrorMessage, onLogin, onLogout, onStartSession } from "../redux/states/auth";
import { AppStore } from "../redux/store";
import { appInstance } from "../services/axios";

export const useAuthStore = () => {
    const { status, user, token, errorMessage } = useSelector((state: AppStore) => state.auth)
    const dispatch = useDispatch();

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout([]));
        try {
            const { data } = await appInstance.get('auth/check-auth');
            localStorage.setItem('token', data.token);
            localStorage.setItem('RF-token', data.refreshToken);
            dispatch(onLogin(data));
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('RF-token');
            
            handleMessageError(error);
        }
    }

    const finishCheckAuth = () => {
        dispatch(onLogout([]));
    }

    const handleMessageError = (error: any) => {
        localStorage.removeItem("token");
        if (typeof error === "string") {
            dispatch(onLogout([error]));
        } else {
            
            if (error.response) {
                if (error.response.data) {
                    dispatch(onLogout(error.response.data.message))
                } else {
                    dispatch(onLogout(['Error al iniciar sesión']))
                }
            } else {
                dispatch(onLogout(['Fallo en la red']))
            }
        }
        setTimeout(() => {
            dispatch(clearErrorMessage());
        }, 5000);
    }

    const startLogin = async (dataLogin: { email: string; password: string; }, onSuccess: () => void) => {
        dispatch(onStartSession());
        try {
            const { data } = await appInstance.post('auth', dataLogin);
            localStorage.setItem('token', data.token);
            localStorage.setItem('RF-token', data.refreshToken);
            dispatch(onLogin({ ...data }))
            // onSuccess();
        } catch (error) {
           handleMessageError(error)
        }
    }

    return {
        // Propiedades
        status,
        user,
        token,
        errorMessage,
        // Metodos
        checkAuthToken,
        finishCheckAuth,
        handleMessageError,
        onLogout,
        startLogin
    }
}