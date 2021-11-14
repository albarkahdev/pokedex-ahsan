import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import DetailPage from "./pages/DetailPage/DetailPage";

import styles from './App.css';

function App() {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:pokemonId" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
