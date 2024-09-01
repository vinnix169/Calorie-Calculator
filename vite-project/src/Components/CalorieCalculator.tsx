import React, { ChangeEvent, SyntheticEvent } from "react";
import { FormData, IntakeResult } from "../types";

interface Props {
    handleSubmit: (e: SyntheticEvent) => void;
    handleChange: (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
        arg: string
    ) => void;
    handleSliderChange: (e: ChangeEvent<HTMLInputElement>) => void;
    formData: FormData;
    activityDescription: string;
    calorieIntake: IntakeResult | null;
}

const Calculator: React.FC<Props> = ({
    handleChange,
    handleSubmit,
    handleSliderChange,
    formData,
    activityDescription,
    calorieIntake,
}) => {
    // Űrlapadatok állapotainak deklarálása useState segítségével
    console.log(calorieIntake);
    //JSX
    return (
        <div className="flex flex-col items-center">
            {formData && (
                <form
                    className="flex flex-col w-72 p-5 border rounded-3xl my-10"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-3xl mb-4">Calorie Calculator</h2>
                    <div className="mb-4">
                        <label className="block mb-2">Age:</label>
                        <input
                            className="border rounded-lg w-full px-2 py-1"
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={(e) => handleChange(e, "age")}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Gender:</label>
                        <select
                            className="border rounded-lg w-full px-2 py-1"
                            name="gender"
                            value={formData.gender}
                            onChange={(e) => handleChange(e, "gender")}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Weight (kg):</label>
                        <input
                            className="border rounded-lg w-full px-2 py-1"
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={(e) => handleChange(e, "w")}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Height (cm):</label>
                        <input
                            className="border rounded-lg w-full px-2 py-1"
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={(e) => handleChange(e, "h")}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Activity Level:</label>
                        <input
                            className="w-full"
                            type="range"
                            min="1"
                            max="5"
                            name="activityLevel"
                            value={formData.activityLevel}
                            onChange={handleSliderChange}
                        />
                        <p className="text-sm">{activityDescription}</p>
                    </div>
                    <button
                        className="border rounded-lg p-2 w-full bg-amber-500 text-white hover:bg-amber-400"
                        type="submit"
                    >
                        Calculate
                    </button>
                </form>
            )}
            {calorieIntake && (
                <div className="w-72 p-5 border rounded-3xl bg-amber-500 text-white">
                    <p className="mb-5">
                        Maintain: {calorieIntake!.maintain} (+0%)
                    </p>
                    <p>Light Loss: {calorieIntake!.lose10} (-10%)</p>
                    <p className="mb-5">
                        Moderate Loss: {calorieIntake!.lose20} (-20%)
                    </p>
                    <p>Light Gain: {calorieIntake!.gain10} (+10%)</p>
                    <p>Moderate Gain: {calorieIntake!.gain20} (+20%)</p>
                </div>
            )}
        </div>
    );
};

export default Calculator;
