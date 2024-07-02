import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import useAuth, { notifyError } from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { postError } from "../store/features/post/postSlice";
import { getUserError } from "../store/features/userInfo/userInfoSlice";
import { useSelector } from "react-redux";
import { getFriendsError } from "../store/features/friends/friendsSlice";

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const isAuth = isAuthenticated()
  const error = useSelector(getUserError)
  const postErrors = useSelector(postError)
  const friendErrors = useSelector(getFriendsError)

  useEffect(() => {
    error && notifyError(error)
    postError && notifyError(postErrors)
    friendErrors && notifyError(friendErrors)
  }, [error, postErrors, friendErrors])

  return (
    <>
      {isAuth && <Navigation />}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <main>
        <Outlet />
      </main>

      {isAuth && <Footer />}
    </>
  );
};

export default Layout;
