import { createContext, ReactNode } from "react";

interface UserProps {
    name: string;
    avatarURL: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    signIn: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps){
    async function signIn() {
        
    }

    return(
        <AuthContext.Provider value={{
            signIn,
            user: {
                name: "David",
                avatarURL: "https://github.com/davidferreiraa.png"
            }
        }}>
            { children }
        </AuthContext.Provider>
    )
}
