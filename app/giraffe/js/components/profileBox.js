import React from "react";
import pluralize from "pluralize";

const ProfileBox = ({ user, active_giraffe_projects }) => (
  <div className="col-3 text-center giraffe-box">
    <img src={user.avatar_url} id="profile-pic" />
    <br />
    <img src="/static/img/separator_grey.svg" width="80%" />
    <br />
    <h3 id="username">{user.login}</h3>
    <div className="text-center" id="active-project-counter">
      {active_giraffe_projects}
    </div>
    active GiraffeTools {pluralize("project", active_giraffe_projects)}
    <br />
    <img src="/static/img/separator_grey.svg" width="80%" />
    {user.loggedIn && (
      <button type="button" className="btn">
        Logout
      </button>
    )}
  </div>
);

export default ProfileBox;
