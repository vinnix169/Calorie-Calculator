import Router from "./Routes/Router";
import "./App.css";
import BMIPage from "./Pages/BMIPage/BMIPage";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";

const App = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default App;
