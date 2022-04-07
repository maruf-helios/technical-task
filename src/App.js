import { createContext, useState } from "react";
import "./App.css";
import InputUserAndTable from "./component/InputUserAndTable";

export const userContext = createContext();

function App() {
  const [userData, setUserData] = useState();
  return (
    <userContext.Provider value={[userData, setUserData]}>
      <InputUserAndTable />
    </userContext.Provider>
  );
}

export default App;
