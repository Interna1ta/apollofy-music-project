import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as ROUTES from "../../routes";
import withLayout from "../../components/hoc/withLayout";
import * as API from "../../api";

import { authSelector, signOut } from "../../redux/auth";
import { fetchingUserData, saveUserData, fetchSuccess, userLoggedOut } from "../../redux/user";
import { getCurrentUserToken } from "../../services/auth";

function Home() {
  const { currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(signOut());
    dispatch(userLoggedOut());
  }

  async function editProfile() {
    dispatch(fetchSuccess());
    navigate(ROUTES.EDIT_PROFILE);
  }

  return (
    <main className="p-4">
      <section className="p-4">
        {currentUser && (
          <h1 className="text-xl">Hello {currentUser.username && currentUser.username}</h1>
        )}
        <button type="button" onClick={logout}>
          Logout
        </button>
        <button type="button" onClick={editProfile}>
          Edit Profile
        </button>
      </section>
    </main>
  );
}

export default withLayout(Home);
