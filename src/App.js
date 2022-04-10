import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import InputUserAndTable from "./component/InputUserAndTable";
import ViewUserData from "./component/ViewUserData";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <InputUserAndTable /> */}
        <Route path="/" element={<InputUserAndTable/>}/>
        <Route path="view/:id" element={<ViewUserData/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
