import { useDispatch, useSelector } from "react-redux";
import { getAccessToken, getUserID } from '../store/features/userInfo/userInfoSlice'
import { userLogout } from '../store/features/userInfo/userInfoSlice';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AppDispatch, persistor, store } from "../store/setup";
import { changeOnlineStatus, loginUser, signupUser } from "../store/features/userInfo/userThunks";
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
  const dispatch = useDispatch<AppDispatch>();
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
        if (res.meta.requestStatus != "fulfilled") {
          notifyError("Something went wrong, please try again");
        }
      })
      .then(() => dispatch(changeOnlineStatus({ onlineStatus: 'online' })))
  }

  const signup = async (values: TsignUpFormState, { resetForm }: { resetForm: () => void }) => {
    const newValues = {
      ...values,
      roles: ['user']
    };

    try {
      const res = await dispatch(signupUser(newValues)).unwrap();
      if (res) {
        resetForm();
        notifySuccess(res.message);
        setTimeout(() => {
          navigate('/auth/signin');
        }, 750);
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
    dispatch(changeOnlineStatus({ onlineStatus: "offline" }))
      .then(() => dispatch(userLogout()))
      .then(() => persistor.purge())
      .then(() => navigate('/auth/signin'))
      .catch((error) => console.error("Logout failed", error))
  };


  return {
    isAuthenticated,
    signin,
    signup,
    logout,
  }
}

export const performLogout = async (navigate?: NavigateFunction) => {
  try {
    store.dispatch(userLogout());
    await persistor.purge();
    if (navigate) {
      navigate('/auth/signin');
    }
  } catch (error) {
    console.error("Logout failed", error);
  }
};

export default useAuth;