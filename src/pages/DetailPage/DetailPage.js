import { Routes, Route, Link } from "react-router-dom";

import './DetailPage.module.css';

function DetailPage() {
  return (
    <div>
      <p>DetailPage</p>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </div>
  )
}

export default DetailPage;
