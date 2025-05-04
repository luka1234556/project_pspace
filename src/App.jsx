import LogIn from "./LogIn.jsx"
import Register from "./Register.jsx"
import PersonalPage from "./PersonalPage.jsx";
import Profile from "./Profile.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return(
    <BrowserRouter> {/* Wrap Routes inside BrowserRouter */}
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/personalPage" element={<PersonalPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<div className="text-white text-center mt-10">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


