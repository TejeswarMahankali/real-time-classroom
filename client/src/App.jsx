import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Teacher from "./pages/Teacher";
import Student from "./pages/Student";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/teacher" />} />

        <Route path="/teacher" element={<Teacher />} />

        <Route path="/student" element={<Student />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;