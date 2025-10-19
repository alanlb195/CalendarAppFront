import { useDispatch, useSelector } from "react-redux";
import { onChecking, clearErrorMessage, onLogin, onLogout, type AppDispatch, type RootState, onLogoutCalendar } from "../store";
import { calendarApi } from "../api";
import type { LoginResponse } from "../shared/interfaces/login.response";
import type { User } from "../shared/interfaces";

export const useAuthStore = () => {

    const dispatch = useDispatch<AppDispatch>();
    const { errorMessage, status, user } = useSelector((state: RootState) => state.auth);

    const setChecking = () => dispatch(onChecking());
    const handleLogin = (user: User) => dispatch(onLogin(user))
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

            localStorage.setItem('token', data.token);
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

            localStorage.setItem('token', data.token);
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
        localStorage.removeItem('token');
        logoutCalendar();
    }


    const checkAuthToken = async () => {

        const token = localStorage.getItem('token');

        if (!token) return handleLogout(undefined);

        try {
            const { data } = await calendarApi.get<LoginResponse>('/auth/renew');
            localStorage.setItem('token', data.token);
            handleLogin({ name: data.name, _id: data.uid })
        } catch (error) {
            localStorage.removeItem('token');
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