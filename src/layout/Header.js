import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <Link to="/">홈</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to="/articles">글 목록</Link>
      <hr />
    </header>
  );
};

export default Header;
