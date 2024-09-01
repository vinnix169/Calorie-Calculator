import React, { ChangeEvent, SyntheticEvent } from "react";
import { BmiData, UserData } from "../types";

//A felhasználó adat sémája
interface Props {
    handleSubmit: (event: SyntheticEvent) => void;
    handleSetUserData: (event: ChangeEvent<HTMLInputElement>) => void;
    userData: UserData;
    bmiData: BmiData;
}

const BMI: React.FC<Props> = ({
    handleSubmit,
    userData,
    handleSetUserData,
    bmiData,
}) => {
    //JSX
    return (
        <div className="flex flex-col w-full items-center">
            {/*Űrlap használata */}
            <form
                className="flex flex-col w-72 p-5 border rounded-3xl my-10"
                action=""
                onSubmit={(e) => handleSubmit(e)}
            >
                <h2 className="text-3xl text-center mb-2">BMI</h2>
                <div className="mb-5">
                    <label className="block mb-2" htmlFor="weight">
                        Weight (kg)
                    </label>
                    <input
                        className="border rounded-lg w-full px-2 py-1"
                        type="text"
                        name="weight"
                        id="weight"
                        value={userData?.weight || ""}
                        onChange={(e) => handleSetUserData(e)}
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-2" htmlFor="height">
                        Height (cm)
                    </label>
                    <input
                        className="border rounded-lg w-full px-2 py-1"
                        type="text"
                        name="height"
                        id="height"
                        value={userData?.height || ""}
                        onChange={(e) => handleSetUserData(e)}
                    />
                </div>
                <input
                    className="border rounded-lg p-2 w-full bg-amber-500 text-white hover:bg-amber-400"
                    type="submit"
                />
            </form>

            {/*Csak akkor jelenjen meg a bmi, ha már kiszámoltuk */}
            {bmiData && (
                <div className="w-72 p-5 border rounded-3xl bg-amber-500 text-white">
                    <p>
                        BMI: {bmiData.bmi}, {bmiData.bmiCategory}
                    </p>
                </div>
            )}
        </div>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default BMI;
