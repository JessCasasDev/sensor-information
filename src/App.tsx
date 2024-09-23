import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Sensor from "./Pages/Sensor/Sensor";
import { AuthenticationGuard } from "./Utils/AuthenticationGuard";

import Login from "./Pages/Login/Login";

function App() {
  return (
    <Routes>
      <Route
        element={<Login />}
        path="/login"
      />
      <Route
        element={<AuthenticationGuard Component={Sensor} />}
        path="/sensor"
      />
       <Route path='*' element={<Navigate to='/sensor' />} />
    </Routes>
  );
}

export default App;
