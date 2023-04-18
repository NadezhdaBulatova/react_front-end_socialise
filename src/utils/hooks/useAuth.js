import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser, logout } from "../../store/features/auth/authSlice";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(logout());
  };
  return useMemo(() => ({ user, logoutUser }), [user]);
};
