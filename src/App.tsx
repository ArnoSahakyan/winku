import './App.scss';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Suspense, lazy } from 'react';
import Layout from "./layout/layout";
import ErrorPage from './pages/NotProtected/ErrorPage/ErrorPage.tsx';
import ROUTES from './routes/routes.ts';
import Loader from './components/shared/Loader/Loader.tsx';
import AuthRoute from './components/AuthRoute/AuthRoute.tsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import Chat from './pages/Protected/Chat/Chat.tsx';

const LazyHomePage = lazy(() => import('./pages/Protected/HomePage/HomePage.tsx'));
const LazySignUp = lazy(() => import('./pages/NotProtected/SignUp/SignUp.tsx'));
const LazyPhotos = lazy(() => import('./pages/Protected/Photos/Photos.tsx'));
const LazyNewsFeed = lazy(() => import('./pages/Protected/NewsFeed/NewsFeed.tsx'));
const LazyLogIn = lazy(() => import('./pages/NotProtected/LogIn/LogIn.tsx'));
const LazyFriendsPage = lazy(() => import('./pages/Protected/FriendsPage/FriendsPage.tsx'));
const LazyFeed = lazy(() => import('./components/Feed/Feed.tsx'));
const LazyMessages = lazy(() => import('./components/Messages/Messages.tsx'));

export const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />} errorElement={<ErrorPage />}>

        <Route element={<AuthRoute />}>
          <Route path={ROUTES.LOGIN} element={<Suspense fallback={<Loader />}><LazyLogIn /> </Suspense>} />
          <Route path={ROUTES.SIGNUP} element={<Suspense fallback={<Loader />}><LazySignUp /> </Suspense>} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.HOME} element={<Suspense fallback={<Loader />}> <LazyHomePage /> </Suspense>}>
            <Route path={ROUTES.HOME} element={<LazyFeed />} />
            <Route path={ROUTES.PHOTOS} element={<LazyPhotos />} />
            <Route path={ROUTES.FRIENDS} element={<LazyFriendsPage />} />
            <Route path={ROUTES.MESSAGES} element={<LazyMessages />} />
            <Route path={ROUTES.CHAT} element={<Chat />} />
          </Route>

          <Route path={ROUTES.NEWSFEED} element={<Suspense fallback={<Loader />}> <LazyNewsFeed /> </Suspense>} />
        </Route>
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
};

export default App;
