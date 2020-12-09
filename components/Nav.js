import React from "react";

export default function Nav() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <a className="nav__item__link" href="#">
            project
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__item__link">
            about
          </a>
        </li>
      </ul>
    </nav>
  );
}
