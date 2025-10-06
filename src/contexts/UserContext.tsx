import useMe from '@/hooks/useMe';
import { User } from '@/utils/UserService';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const UserContext = createContext<User>(User.ANONYMOUS);

export function useUserContext() {
    return useContext(UserContext);
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>(User.ANONYMOUS);
    const { data } = useMe();

    useEffect(() => {
        if (data) {
            setUser(new User(data.username, data.email, data.roles));
        }
    }, [data]);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}