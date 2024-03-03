import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Settings() {
  return (
    <>
      <br />
      <div>Hello From Settings</div>
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <ul>
              <li>
                <Link to={"appsettings"}>App Settings</Link>
              </li>
              <li>
                {" "}
                <Link to={"profilesettings"}>Profile Settings</Link>
              </li>
              <li>
                {" "}
                <Link to={"websettings"}>Web Settings</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-8">
            {" "}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
