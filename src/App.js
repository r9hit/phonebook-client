import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Edit from "./pages/Edit";
import Home from "./pages/Home";
import NewContact from "./pages/NewContact";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/new" element={<NewContact />} />
      </Routes>
    </div>
  );
}

export default App;
