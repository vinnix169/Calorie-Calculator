import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="flex w-full max-w-screen-xl h-16 p-2 items-center justify-around border-b mx-auto">
            {/*Hamburger logo */}
            <div className="w-fit">
                <div className="logo w-12 h-12"></div>
            </div>

            {/*Navigation Links */}
            <div className="flex justify-around w-fit">
                <Link
                    className="bg-amber-500 rounded-lg text-center w-20 m-1 p-1 hover:bg-amber-400 text-white"
                    to="/bmi"
                >
                    BMI
                </Link>
                <Link
                    className="bg-amber-500 rounded-lg text-center w-20 m-1 p-1 hover:bg-amber-400 text-white"
                    to="/foodCalculator"
                >
                    Foods
                </Link>
                <Link
                    className="bg-amber-500 rounded-lg text-center w-20 m-1 p-1 hover:bg-amber-400 text-white"
                    to="/calorieCalculator"
                >
                    Calculator
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
