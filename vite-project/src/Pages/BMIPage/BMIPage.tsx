import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import BMI from "../../Components/BMI";
import axios, { AxiosResponse } from "axios";
import { BmiData, UserData } from "../../types";

//a BMI sémája

const BMIPage: React.FC = () => {
    //Változók
    //Ez felel a fehasználó adatainak tárolásáért, renderelésért
    const [userData, setUserData] = useState<UserData>({
        age: 0,
        weight: 0,
        height: 0,
        activityLevel: 0,
        gender: "",
    });
    //Ez pedig a BMI adatokért
    const [bmiData, setBmiData] = useState<BmiData>({
        bmi: 0,
        bmiCategory: "-",
    });

    //Kiszámolja súly és magasság alapján a BMI-t
    const calculateBMI = (weight: number, height: number) => {
        const heightInMeters = height / 100;

        const bmi = weight / (heightInMeters * heightInMeters);

        return bmi.toFixed(2);
    };

    //A kiszámolt bmi-t kategóriába sorolja
    const getBMICategory = (bmiNumber: number) => {
        if (bmiNumber < 18.5) {
            return "Underweight";
        } else if (bmiNumber >= 18.5 && bmiNumber < 25) {
            return "Normal weight";
        } else if (bmiNumber >= 25 && bmiNumber < 30) {
            return "Overweight";
        } else {
            return "Obesity";
        }
    };

    //A kiszámolás kezelése gombnyomásra (avagy form submit-ra)

    const handleSubmit = async (e: SyntheticEvent) => {
        //A megadott adatok alapján kiszámoljuk a bmi-t és kategóriát is adunk hozzá
        e.preventDefault();
        if (userData) {
            //BMI kalkuláció
            const bmiNumber = calculateBMI(userData.weight, userData.height);
            //Kalkuláció kategoriába sorolása
            const bmiCategory = getBMICategory(Number(bmiNumber));
            //bmi és kategória hozzáadása
            setBmiData({ bmi: Number(bmiNumber), bmiCategory });
            //töltsük fel adatbázisba
            await axios
                .put("http://localhost:3000/userData", userData)
                .then((res: AxiosResponse<UserData>) => {
                    console.log(
                        "User data fetch: " + res.status + " " + res.statusText
                    );
                    setUserData(res.data);
                });
        }
    };

    const handleSetUserData = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedUserData = { ...userData, [name]: value };
        setUserData(updatedUserData);
    };

    //Töltsük be első rendernél a meglévő adatokat
    useEffect(() => {
        axios
            .get("http://localhost:3000/userData")
            .then((res: AxiosResponse<UserData>) => {
                console.log(
                    "User data fetch: " + res.status + " " + res.statusText
                );
                setUserData(res.data);
            });
    }, []);

    console.log(userData, bmiData);

    return (
        <>
            <BMI
                handleSetUserData={handleSetUserData}
                handleSubmit={handleSubmit}
                bmiData={bmiData}
                userData={userData}
            />
        </>
    );
};

export default BMIPage;
