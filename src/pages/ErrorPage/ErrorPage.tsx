import { Link, useRouteError } from "react-router-dom";
import ROUTES from "../../routes/routes";
import './ErrorPage.scss'

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string } | null;

  return (
    <div className="ErrorPage">
      <img src="/error404.jpg" alt="Error 404" />
      <div className="ErrorPage__message">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        {error && (
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        )}
        <Link to={ROUTES.HOME}>Back to Home</Link>
      </div>
    </div>
  );
}
