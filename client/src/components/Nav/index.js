import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info">
      <a className="navbar-brand" href="/">
        Google Books Search
      </a>
      <a className="navbar-brand" href="/favorites">
        Favorites
      </a>
    </nav>
  );
}

export default Nav;
