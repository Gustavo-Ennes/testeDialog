import IToken from "@/app/interfaces/token";
import { jwtDecode as tokenDecoder } from "jwt-decode";

export const getFromToken = (key: keyof IToken): any => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token não encontrado no localStorage");
        return null;
    }

    try {
        const decodedToken = tokenDecoder<IToken>(token);

        if (decodedToken && key in decodedToken) {
            return decodedToken[key];
        } else {
            console.warn(`Chave "${key}" não encontrada no token.`);
            return null;
        }
    } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return null;
    }
};

export const saveToLocalStorageFromToken = (tokenKey: keyof IToken) => {
    const tokenValue = getFromToken(tokenKey);
    if (!tokenKey)
        console.log(`Impossible to retrieve user ${tokenKey} from token.`);

    localStorage.setItem(tokenKey, tokenValue);
};

export const storeEmailAndProfileFromToken = () => {
    saveToLocalStorageFromToken("email");
    saveToLocalStorageFromToken("profile");
};
