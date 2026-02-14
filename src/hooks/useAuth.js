import { useEffect } from "react";
import useAuthStore from "../store/auth.store";
import api from "../services/api";

const useAuth = () => {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isAuthLoading = useAuthStore((s) => s.isAuthLoading);
  const setUser = useAuthStore((s) => s.setUser);
  const setAuthLoading = useAuthStore((s) => s.setAuthLoading);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;
    if (isAuthenticated || isAuthLoading) return;

    const fetchUser = async () => {
      try {
        setAuthLoading(true);
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        logout();
      } finally {
        setAuthLoading(false);
      }
    };

    fetchUser();
  }, [isAuthenticated, isAuthLoading, setUser, setAuthLoading, logout]);

  return { user, isAuthenticated, isAuthLoading };
};

export default useAuth;