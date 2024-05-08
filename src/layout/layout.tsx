import { Outlet } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Footer from "../components/Footer/Footer";

const Layout = () => {

  return (
    <>
      {/* <Navigation /> */}

      <main>
        <Outlet />
      </main>

      {/* <Footer /> */}
    </>
  );
};

export default Layout;
