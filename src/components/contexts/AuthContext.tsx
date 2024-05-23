import { ReactNode, createContext, useEffect, useState } from 'react';
import { getAuthUser } from 'src/lib/auth';

export const AuthContext = createContext({
  user: null,
});

export function AuthContextProvider({
  children,
  getAuthUser,
}: {
  children: ReactNode;
  getAuthUser: Function;
}) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      const user = await getAuthUser();
      setUser(user);
    })();
  }, [getAuthUser]);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}
