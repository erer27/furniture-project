import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MinaPage";
import CanvasContainer from "./threeJS/CanvasContainer";
import FurnitureModal from "./pages/FurnitureModal";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    // <div className=" flex flex-col items-center justify-center h-screen">
    //   <CanvasContainer />
    // </div>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/gallery" element={<CanvasContainer />}>
          <Route path=":cardId" element={<CanvasContainer />} />
        </Route>
        <Route path="/test" element={<FurnitureModal />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
