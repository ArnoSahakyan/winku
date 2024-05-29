import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import useAuth from "../hooks/useAuth";

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const isAuth = isAuthenticated()

  return (
    <>
      {isAuth && <Navigation />}

      <main>
        <Outlet />
      </main>

      {isAuth && <Footer />}
    </>
  );
};

export default Layout;
