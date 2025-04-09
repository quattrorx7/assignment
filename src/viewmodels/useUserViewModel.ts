import { useUserStore } from '../stores';

export const useUserViewModele = () => {
  const { setUserData, userData } = useUserStore(state => state);

  const login = async () => {
    setUserData(null);
  };

  const logout = async () => {
    setUserData(null);
  };

  return { login, logout };
};
