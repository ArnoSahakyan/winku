import { Link } from "react-router-dom";
import ROUTES from "./routes";
import './Root.scss'

export default function Root() {
  return (
    <div className="Root">
      <h1>Welcome to Winku</h1>
      <div className="Root__btns">
        <Link to={ROUTES.LOGIN}>Log In</Link>
        <Link to={ROUTES.SIGNUP}>Sign Up</Link>
      </div>
    </div>
  );
}