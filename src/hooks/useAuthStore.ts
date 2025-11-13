import { useDispatch, useSelector } from "react-redux";
import { onChecking, clearErrorMessage, onLogin, onLogout, type AppDispatch, type RootState, onLogoutCalendar, onOffline } from "../store";
import { calendarApi } from "../api";
import type { LoginResponse } from "../shared/interfaces/login.response";
import type { User } from "../shared/interfaces";
import { clearSession, getUserFromLocalStorage, saveSession } from '../utils/localStorage.user.data';

export const useAuthStore = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { errorMessage, status, user } = useSelector((state: RootState) => state.auth);

    const setChecking = () => dispatch(onChecking());
    const handleLogin = (user: User) => dispatch(onLogin(user))
    const handleOffline = (user: User) => dispatch(onOffline(user))
    const handleLogout = (errorMessage: string | undefined) => dispatch(onLogout(errorMessage))
    const handleClearErrorMessage = () => dispatch(clearErrorMessage())
    const logoutCalendar = () => dispatch(onLogoutCalendar());


    const startLogin = async (email: string, password: string) => {
        setChecking();
        // console.log({ email, password });
        try {

            const { data } = await calendarApi.post<LoginResponse>('/auth', {
                email,
                password,
            });
            saveSession(data);
            handleLogin({ name: data.name, _id: data.uid });

            // console.log({ data });
        } catch (error) {
            handleLogout('Invalid credentials');
            setTimeout(() => {
                handleClearErrorMessage();
            }, 10);
        }
    }

    const startRegister = async (name: string, email: string, password: string) => {
        setChecking();
        // console.log({ email, password });
        try {

            const { data } = await calendarApi.post<LoginResponse>('/auth/new', {
                email,
                password,
                name,
            });
            saveSession(data);
            handleLogin({ name: data.name, _id: data.uid });

            // console.log({ data });
        } catch (error: any) {
            handleLogout(error.response.data?.msg || '--');
            setTimeout(() => {
                handleClearErrorMessage();
            }, 10);
        }
    }

    const startLogout = () => {
        handleLogout(undefined);
        clearSession();
        logoutCalendar();
    }


    const checkAuthToken = async () => {

        const token = localStorage.getItem('token');

        if (!token) return handleLogout(undefined);

        try {
            const { data } = await calendarApi.get<LoginResponse>('/auth/renew');
            localStorage.setItem('token', data.token);
            handleLogin({ name: data.name, _id: data.uid })
        } catch (error: any) {

            // No connection, PWA mode
            if (!navigator.onLine || error.code === 'ERR_NETWORK') {
                const user = getUserFromLocalStorage();
                handleOffline(user);
                return;
            }

            // Invalid Token
            if (error.response && error.response.status === 401) {
                clearSession();
                handleLogout(undefined);
                return;
            }
            // unknown error
            clearSession();
            handleLogout(undefined);
        }

    }

    return {
        //* Properties
        errorMessage,
        status,
        user,
        //* Methods
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }
}