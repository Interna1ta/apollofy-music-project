import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import PropTypes from "prop-types";

import * as ROUTES from "./routes";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login/Login";
import ResetPassword from "./pages/ResetPassword";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound";

import Playlists from "./pages/Playlists";
import Genres from "./pages/Genres";
import Albums from "./pages/Albums";
import TracksByGenre from "./pages/TracksByGenre";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Statistics from "./pages/Statistics";
import Create from "./pages/Create";

import { onAuthStateChanged } from "./services/auth";
import { authSelector, syncSignIn, signOut } from "./store/auth";

import TrackCreateForm from "./components/organisms/forms/TrackForm/TrackCreateForm";
import TrackUpdateForm from "./components/organisms/forms/TrackForm/TrackUpdateForm";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { darkTheme, lightTheme } from "./styles/Themes";
import { useDarkMode } from "./hooks/useDarkMode";
import { themeSelector } from "./store/theme";

const PrivateWrapper = ({ auth: { isAuthenticated } }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();
  const [hasMounted, setHasMounted] = useState(false);
  const { isAuthenticated } = useSelector(authSelector);
  const [mountedComponent] = useDarkMode();
  const { theme } = useSelector(themeSelector);

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = onAuthStateChanged((user) => {
      if (!hasMounted) {
        if (user) {
          dispatch(syncSignIn());
        } else {
          dispatch(signOut());
        }
      }
    });

    setHasMounted(true);

    return () => {
      if (unsubscribeFromAuth) {
        unsubscribeFromAuth();
      }
    };
  }, [dispatch, hasMounted]);

  if (!mountedComponent) return <div />;

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <ThemeProvider theme={themeMode}>
          <GlobalStyles />
          <Routes>
            <Route path="albums" element={<Albums />} />
            <Route path="playlists/:playlistId" element={<Playlists />} />
            <Route path="users/:profileId" element={<Profile />} />
            <Route path="genres/:genreId" element={<Genres />} />
            <Route path="playlists" element={<Playlists />} />
            <Route path="create" element={<Create />} />
            <Route path="users" element={<Users />} />
            <Route path="stats" element={<Statistics />} />
            <Route path="tracks/:genre" element={<TracksByGenre />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
            <Route path="track/add" element={<TrackCreateForm />} />
            <Route path="track/update/:id" element={<TrackUpdateForm />} />
            {isAuthenticated && (
              <Route element={<PrivateWrapper auth={{ isAuthenticated }} />}>
                <Route path={ROUTES.HOME} exact element={<Home />} />
              </Route>
            )}
            {isAuthenticated && (
              <Route element={<PrivateWrapper auth={{ isAuthenticated }} />}>
                <Route path={ROUTES.EDIT_PROFILE} element={<EditProfile />} />
              </Route>
            )}
            {isAuthenticated && (
              <Route element={<PrivateWrapper auth={{ isAuthenticated }} />}>
                <Route path="*" element={<NotFound />} />
              </Route>
            )}
          </Routes>
        </ThemeProvider>
      </>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

PrivateWrapper.propTypes = {
  auth: PropTypes.exact({
    isAuthenticated: PropTypes.bool,
  }),
};

PrivateWrapper.defaultProps = {
  auth: {
    isAuthenticated: false,
  },
};

export default App;
