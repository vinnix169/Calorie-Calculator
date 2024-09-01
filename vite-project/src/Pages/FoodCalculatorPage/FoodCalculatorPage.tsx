import axios, { AxiosResponse } from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Food, Stat, UserFood } from "../../types";
import FoodCalculator from "../../Components/FoodCalculator";

const FoodCalculatorPage: React.FC = () => {
    const [error, setError] = useState<Error>();
    const [foods, setFoods] = useState<Food[]>([]); //Az összes étel az adatbázisban
    const [queryFood, setQueryFood] = useState<Food[]>([]); //A megjelenítendő ételek keresésnél
    const [selectedFood, setSelectedFood] = useState<UserFood[]>([]); //Kiválaszott ételek
    const [search, setSearch] = useState<string>(""); //Keresési szöveg
    const [total, setTotal] = useState<Stat>({
        //Összes fogyasztott makrók összegei
        calories: 0,
        fat: 0,
        carb: 0,
        protein: 0,
    });
    const [serving, setServing] = useState<number>(100); //Étel mennyisége

    //Függvények, metódusok

    //Új étel hozzáadás a user ételei közé. Ha van error, akkor azt megjelenítjük useState változóval
    const postData = async (data: UserFood) => {
        if (data) {
            await axios
                .post("http://localhost:3000/userFood", data)
                .then((res) =>
                    console.log(
                        "User post: " + res.status + " " + res.statusText
                    )
                )
                .catch((err: Error) => {
                    console.error(err);
                    setError(err);
                });
        }
    };

    //Keresés kezelése:
    /*Bekérjük az searchbar értékét és kikeressük azokat az elemeket amikre igaz a keresés kulcsszava*/
    const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        //Keresés renderért felelős setState
        setSearch(event.target.value);
        //Filter használta a keresés string kiszűrésével
        const foundFood = foods?.filter((i) =>
            i.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        //Ha van találat, és van beírva valami az input-ba, akkor töltsük bele egy másik useState-be
        if (foundFood && event.target.value.length > 0) {
            setQueryFood(foundFood);
        } else {
            setQueryFood([]); //Ha nincs, akkor null, ez is feltételes megjelenítésre alapszik.
        }
    };

    //Kiválasztott ételek kezelése kattintásra
    const handleSelected = async (food: Food, _id: string) => {
        if (serving) {
            // Calculate the values based on the serving size
            const calories = (food.calories / food.serving) * serving;
            const fat = (food.fat / food.serving) * serving;
            const carb = (food.carb / food.serving) * serving;
            const protein = (food.protein / food.serving) * serving;

            // Create a new food object with the calculated values
            const newFood: UserFood = {
                id: _id,
                food: {
                    calories: parseFloat(calories.toFixed(1)),
                    fat: parseFloat(fat.toFixed(1)),
                    carb: parseFloat(carb.toFixed(1)),
                    protein: parseFloat(protein.toFixed(1)),
                    id: food.id,
                    name: food.name,
                    serving: serving,
                },
            };

            // Add the new food item to the selectedFood array
            setSelectedFood((prevSelectedFood) => [
                ...prevSelectedFood,
                newFood,
            ]);

            // Post the new food to the database
            await postData(newFood);

            // Reset the search and serving values
            setSearch("");
            setServing(100);
            setQueryFood([]);
        } else {
            alert("You have to enter the serving!");
        }
    };

    //Törlés kezelés: gombnyomásra hívodik, és ha megvan az adott id-jú étel, töröljük ki.
    const handleDelete = async (id: string) => {
        const deletedFood = selectedFood.filter((i) => i.id !== id);
        //ezzel kiszűrjük a meglévő adatok közül azt az elemet, amit megkap ez a függvény.
        setSelectedFood(deletedFood);
        //törlés az adatbázisból is.

        await axios
            .delete("http://localhost:3000/userFood/" + id)
            .then((res) => {
                console.log(
                    "Food delete: " + res.status + " " + res.statusText
                );
            });
    };

    useEffect(() => {
        //Összes étel lekérése
        axios
            .get("http://localhost:3000/foods")
            .then((res: AxiosResponse<Food[]>) => {
                if (res.data) {
                    setFoods(res.data);
                    console.log(
                        "Food fetch: " + res.status + " " + res.statusText
                    );
                }
            })
            .catch((err: Error) => {
                console.error(err);
                setError(err);
            });
        //Összes megevett étel betöltése
        axios
            .get("http://localhost:3000/userFood")
            .then((res: AxiosResponse<UserFood[]>) => {
                if (res.data) {
                    setSelectedFood(res.data);
                    console.log(
                        "User data fetch: " + res.status + " " + res.statusText
                    );
                }
            })
            .catch((err: Error) => {
                console.error(err);
                setError(err);
            });
    }, []);

    console.log(selectedFood);
    //kiválasztott ételek értékeinek összesítése
    useEffect(() => {
        if (selectedFood.length > 0) {
            //hozzuk létre a szükséges változókat
            let totalCalories = 0;
            let totalFat = 0;
            let totalCarbs = 0;
            let totalProtein = 0;

            //minden egyes fieldet szummázzuk össze
            selectedFood.forEach((i: UserFood) => {
                totalCalories += i.food.calories;
                totalFat += i.food.fat;
                totalCarbs += i.food.carb;
                totalProtein += i.food.protein;
            });
            //minden összeget tároljunk el
            setTotal({
                calories: parseFloat(totalCalories.toFixed(1)),
                fat: parseFloat(totalFat.toFixed(1)),
                carb: parseFloat(totalCarbs.toFixed(1)),
                protein: parseFloat(totalProtein.toFixed(1)),
            });
        }
    }, [selectedFood]); //csak akkor fog ez a useEffect lefutni, ha változik a kiválaszott ételek listája.

    const handleServing = (e: ChangeEvent<HTMLInputElement>) => {
        setServing(parseInt(e.target.value));
    };

    return (
        <>
            <FoodCalculator
                error={error!}
                serving={serving}
                queryFood={queryFood}
                selectedFood={selectedFood}
                search={search}
                total={total}
                handleDelete={handleDelete}
                handleSearch={handleSearch}
                handleServing={handleServing}
                handleSelected={handleSelected}
            />
        </>
    );
};

export default FoodCalculatorPage;
