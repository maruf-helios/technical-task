import { createContext, useState } from "react";
import "./App.css";
import InputUser from "./component/InputUser";

export const userContext = createContext();

function App() {
  const [userData, setUserData] = useState();
  return (
    <userContext.Provider value={[userData, setUserData]}>
      <InputUser />
    </userContext.Provider>
  );
}

export default App;
