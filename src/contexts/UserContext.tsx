import { User } from '@/utils/UserService';
import { createContext, ReactNode, useContext } from "react";

const UserContext = createContext<User>(User.ANONYMOUS);

export function useUserContext() {
    return useContext(UserContext);
}

export const UserProvider = ({ user, children }: { user: User, children: ReactNode }) => {
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}