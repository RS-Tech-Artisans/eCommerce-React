import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type Token = null | string;
type SessionContexType = { token: Token; setToken: (token: Token) => void };

export const SessionContext = createContext<SessionContexType>({
  token: null,
  setToken: () => {},
});

export const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<Token>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('refresh_token');
    setToken(storedToken);
  }, []);

  return (
    <SessionContext.Provider value={{ token, setToken }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
