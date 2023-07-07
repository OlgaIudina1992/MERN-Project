import { BrowserRouter, Routes, Route, } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePostPage from "./pages/CreatePostPage";
import SinglePostPage from "./pages/SinglePostPage";
import EditPostPage from "./pages/EditPosPage";

function App() {  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/post" element={<CreatePostPage />}/>
        <Route path="/post/:id" element={<SinglePostPage />}/>
        <Route path="/edit/:id" element={<EditPostPage />}/>        
      </Routes>
    </BrowserRouter>
  )
}

export default App
