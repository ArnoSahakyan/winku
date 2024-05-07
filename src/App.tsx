import './App.scss';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Suspense, lazy } from 'react';
import Layout from "./layout/layout";
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';
import ROUTES from './routes/routes.ts';
import Loader from './components/shared/Loader/Loader.tsx';

const LazyRoot = lazy(() => import('./routes/Root.tsx'));
const LazyHomePage = lazy(() => import('./pages/HomePage/HomePage.tsx'));
const LazySignUp = lazy(() => import('./pages/SignUp/SignUp.tsx'));
const LazyPhotos = lazy(() => import('./pages/Photos/Photos.tsx'));
const LazyNewsFeed = lazy(() => import('./pages/NewsFeed/NewsFeed.tsx'));
const LazyLogIn = lazy(() => import('./pages/LogIn/LogIn.tsx'));
const LazyFriendsPage = lazy(() => import('./pages/FriendsPage/FriendsPage.tsx'));
const LazyFeed = lazy(() => import('./components/Feed/Feed.tsx'));
const LazyMessages = lazy(() => import('./components/Messages/Messages.tsx'));

export const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />} errorElement={<ErrorPage />}>
        <Route path={ROUTES.ROOT} element={<Suspense fallback={<Loader />}><LazyRoot /> </Suspense>} />
        <Route path={ROUTES.LOGIN} element={<Suspense fallback={<Loader />}><LazyLogIn /> </Suspense>} />
        <Route path={ROUTES.SIGNUP} element={<Suspense fallback={<Loader />}><LazySignUp /> </Suspense>} />

        <Route path={ROUTES.HOME} element={<Suspense fallback={<Loader />}> <LazyHomePage /> </Suspense>}>
          <Route path={ROUTES.HOME} element={<LazyFeed />} />
          <Route path={ROUTES.PHOTOS} element={<LazyPhotos />} />
          <Route path={ROUTES.FRIENDS} element={<LazyFriendsPage />} />
          <Route path={ROUTES.MESSAGES} element={<LazyMessages />} />
        </Route>

        <Route path={ROUTES.NEWSFEED} element={<Suspense fallback={<Loader />}> <LazyNewsFeed /> </Suspense>} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
};

export default App;
