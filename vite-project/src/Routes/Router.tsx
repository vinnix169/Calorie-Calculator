import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BMIPage from "../Pages/BMIPage/BMIPage";

import CalorieCalculatorPage from "../Pages/CalorieCalculatorPage/CalorieCalculatorPage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import FoodCalculatorPage from "../Pages/FoodCalculatorPage/FoodCalculatorPage";

export const router = createBrowserRouter([
    {
        path: "",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "bmi",
                element: <BMIPage />,
            },
            {
                path: "calorieCalculator",
                element: <CalorieCalculatorPage />,
            },
            {
                path: "foodCalculator",
                element: <FoodCalculatorPage />,
            },
        ],
    },
]);
