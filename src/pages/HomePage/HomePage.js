import { Link } from "react-router-dom";

import './HomePage.module.css';

function HomePage() {
  return (
    <div>
      <p>HomePage</p>
      <nav>
        <Link to="/1">Detail</Link>
      </nav>
    </div>
  )
}

export default HomePage;
