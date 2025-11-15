import { BrowserRouter, Route, Routes } from "react-router-dom";
import StatisticsPage from "../pages/statistics-page";
import DrawsPage from "../pages/draws-page";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DrawsPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
