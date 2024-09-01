import React, { useEffect, useState } from "react";
import CalorieCalculator from "../../Components/CalorieCalculator";
import { IntakeResult, FormData } from "../../types";
import axios, { AxiosResponse } from "axios";

const CalorieCalculatorPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        age: 0,
        weight: 0,
        height: 0,
        activityLevel: 1, // Set default activity level here
        gender: "male", // Set default gender here
    });

    // Aktivitási leírás állapotának deklarálása useState segítségével
    const [activityDescription, setActivityDescription] = useState<string>("");

    // Napi kalóriaszükséglet állapotának deklarálása useState segítségével
    const [calorieIntake, setCalorieIntake] = useState<IntakeResult | null>(
        null
    );

    // Űrlapelem változásának kezelése
    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Napi kalóriaszükséglet kiszámítása
    const calculateCalories = () => {
        // Alap Harris-Benedict egyenlet a testtömeg és nem alapú energiaszükséglet kiszámítására (BMR)
        const { age, weight, height, activityLevel, gender } = formData; //összes szükséges mező
        const genderFactor = gender === "male" ? 5 : -161; //nem általi számolás megállapíása
        const bmr = 10 * weight + 6.25 * height - 5 * age + genderFactor; //kalkuláció

        // BMR kiegészítése aktivitási szint alapján
        const activityFactors = [1.2, 1.375, 1.55, 1.725, 1.9]; // Megfelelő aktivitási faktorok minden szinthez
        const calorieNeeds = Math.round(
            bmr * activityFactors[activityLevel - 1]
        );

        return calorieNeeds;
    };

    // Form submit kezelése
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const calorieNeeds = calculateCalories();
        setCalorieIntake({
            maintain: parseFloat(calorieNeeds.toFixed(1)),
            lose10: parseFloat((calorieNeeds * 0.9).toFixed(1)),
            lose20: parseFloat((calorieNeeds * 0.8).toFixed(1)),
            gain10: parseFloat((calorieNeeds * 1.1).toFixed(1)),
            gain20: parseFloat((calorieNeeds * 1.2).toFixed(1)),
        });

        await axios
            .put("http://localhost:3000/userData", formData)
            .then((res) => {
                console.log(
                    "User data put: " + res.status + " " + res.statusText
                );
            });
    };

    // Komponens létrejöttekor az aktivitási leírás frissítése

    // Csúszka változásának kezelése
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const activityLevel = parseInt(e.target.value);
        setFormData((prevState) => ({
            ...prevState,
            activityLevel,
        }));
        updateActivityDescription(activityLevel);
    };

    // Aktivitási szint társítása valamilyen leíráshoz
    const updateActivityDescription = (activityLevel: number) => {
        //amennyi a szint, olyan a szöveg.
        let activityDescription = "";
        switch (activityLevel) {
            case 1:
                activityDescription = "No exercise";
                break;
            case 2:
                activityDescription = "Little exercise (1-2/week)";
                break;
            case 3:
                activityDescription = "Moderate exercise (2-3/week)";
                break;
            case 4:
                activityDescription = "Lot of exercise (4-5/week)";
                break;
            case 5:
                activityDescription = "Extreme exercise (5-6/week)";
                break;
            default:
                activityDescription = "";
                break;
        }
        //állísuk be, hogy le tudjuk renderelni
        setActivityDescription(activityDescription);
    };

    //ha változik az aktivitás szintje, akkor változzon meg a szöveg is
    useEffect(() => {
        updateActivityDescription(formData.activityLevel);
    }, [formData.activityLevel]);

    //kezdeti értékek elkérése az adatbázisból
    useEffect(() => {
        axios
            .get("http://localhost:3000/userData")
            .then((res: AxiosResponse<FormData>) => {
                console.log(
                    "User data fetch: " + res.status + " " + res.statusText
                );
                setFormData(res.data);
            });
    }, []);

    return (
        <>
            <CalorieCalculator
                handleChange={handleChange}
                handleSliderChange={handleSliderChange}
                handleSubmit={handleSubmit}
                formData={formData}
                activityDescription={activityDescription}
                calorieIntake={calorieIntake}
            />
        </>
    );
};

export default CalorieCalculatorPage;
