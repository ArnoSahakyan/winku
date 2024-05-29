import { useDispatch, useSelector } from "react-redux";
import { getAccessToken, getUserID } from '../store/features/userInfo/userInfoSlice'
import { userLogout } from '../store/features/userInfo/userInfoSlice';
import { useNavigate } from "react-router-dom";
import { persistor } from "../store/setup";
import { loginUser, signupUser } from "../store/features/userInfo/userThunks";
import { toast } from 'react-toastify';
import { TlogInFormState } from "../pages/NotProtected/LogIn/LogIn";
import { TsignUpFormState } from "../pages/NotProtected/SignUp/SignUp";

const notifyError = (error: string) => {
  toast.error(error)
}

const notifySuccess = (message: string) => {
  toast.success(message)
}

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userID = useSelector(getUserID);
  const accessToken = useSelector(getAccessToken);

  const isAuthenticated = () => {
    if (userID && accessToken) {
      return true
    } else {
      return false
    }
  }

  const signin = (values: TlogInFormState) => {
    dispatch(loginUser(values))
      .then((res) => {
        console.log("AAAA", res);

        if (res.meta.requestStatus === "fulfilled") {
          navigate('/');
        } else {
          notifyError(res.payload.message);
        }
      });
  }

  const signup = async (values: TsignUpFormState, { resetForm }: { resetForm: () => void }) => {
    console.log(values);
    const newValues = {
      ...values,
      roles: ['user']
    };

    try {
      const res = await dispatch(signupUser(newValues)).unwrap();
      console.log(res);
      if (res) {
        resetForm();
        notifySuccess(res.message);
        setTimeout(() => {
          navigate('/api/auth/signin');
        }, 1500);
      }
    } catch (err) {
      if (err instanceof Error) {
        notifyError(err.message);
      } else {
        notifyError("An unknown error occurred");
      }
    }
  };



  const logout = async () => {
    try {
      dispatch(userLogout());
      await persistor.purge();
      // localStorage.clear();
      navigate('/api/auth/signin');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return {
    isAuthenticated,
    signin,
    signup,
    logout,
  }
}

export const useAuthLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      dispatch(userLogout());
      await persistor.purge();
      navigate('/api/auth/signin');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return { logout };
}

export default useAuth;