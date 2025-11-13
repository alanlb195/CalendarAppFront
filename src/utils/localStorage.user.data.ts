import type { User } from "../shared/interfaces";
import type { LoginResponse } from "../shared/interfaces/login.response";

export const saveSession = (data: LoginResponse) => {
    localStorage.setItem("token", data.token);
    
    //* PWA support - to get user basic information
    localStorage.setItem("user", JSON.stringify({ name: data.name, _id: data.uid }));
};

export const clearSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export const getUserFromLocalStorage = (): User => {
    try {
        const userString = localStorage.getItem('user');
        return userString && JSON.parse(userString);
    } catch {
        return { _id: 'offline-user-id', name: 'offline-user-name' };
    }
};