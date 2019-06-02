import React, { useState } from "react";

import ProfileBox from "./profileBox";
import Projects from "./projects";

import styles from "../styles/user.js";

const User = ({ username }) => {
  // number of GiraffeTools projects
  const [activeProjects, setActiveProjects] = useState(0);
  return (
    <div className="d-flex justify-content-center" style={styles.userSection}>
      <ProfileBox username={username} activeProjects={activeProjects} />
      <Projects username={username} setActiveProjects={setActiveProjects} />
    </div>
  );
};
export default User;
