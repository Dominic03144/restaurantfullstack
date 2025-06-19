// src/utils/logout.ts
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/login");
  };

  return logoutUser;
};
