import React from "react";
import pluralize from "pluralize";

const ProfileBox = ({ user, active_giraffe_projects }) => (
  <div className="col-4 text-center">
    <div className="giraffe-box">
      <img src={user.avatar_url} id="profile-pic" />
      <h3 id="username">{user.login}</h3>
      <img src="/static/img/separator_grey.svg" className="separator-grey" />
      <div className="container text-center" id="active-project-counter">
        {active_giraffe_projects}
      </div>
      <div id="active-giraffe-text">
        active GiraffeTools {pluralize("project", active_giraffe_projects)}
      </div>
      <br />
      <img src="/static/img/separator_grey.svg" className="separator-grey" />
      {user.loggedIn && (
        <button type="button" className="btn">
          Logout
        </button>
      )}
    </div>
  </div>
);

export default ProfileBox;
