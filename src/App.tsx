import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route
          path="*"
          element={
            <div className="text-white text-center mt-15 text-4xl">
              404 Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
