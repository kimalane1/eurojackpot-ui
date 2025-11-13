import { BrowserRouter, Route, Routes } from "react-router-dom";
import StatisticsPage from "../pages/StatisticsPage";
import DrawsPage from "../pages/DrawsPage";

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
