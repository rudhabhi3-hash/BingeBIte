import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/favorites"
          element={<Favorites />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
