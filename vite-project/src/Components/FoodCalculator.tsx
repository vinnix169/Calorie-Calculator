import { ChangeEvent } from "react";
import Close from "../Images/close_FILL0_wght400_GRAD0_opsz24.svg";
import { Food, Stat, UserFood } from "../types";
import { v4 as uuid } from "uuid";

interface Props {
    error: Error;
    serving: number;
    queryFood: Food[];
    selectedFood: UserFood[];
    search: string;
    total: Stat;
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSelected: (food: Food, _id: string) => void;
    handleDelete: (id: string) => void;
    handleServing: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FoodCalculator: React.FC<Props> = ({
    error,
    serving,
    queryFood,
    selectedFood,
    search,
    total,
    handleDelete,
    handleSearch,
    handleSelected,
    handleServing,
}) => {
    console.log("aaaa", selectedFood);
    return (
        <div className=" w-full my-10 flex flex-col items-center">
            <div className=" w-fit  p-5 pt-0 rounded-3xl  flex flex-col items-center border">
                <h2 className="text-3xl p-5  font-bold ">
                    Food Calorie Calculator
                </h2>
                {/* Render error, ha van. */}
                {error && (
                    <p className="text-lg p-5 text-red-700 ">{`${error.name}: ${error.message}`}</p>
                )}

                {/* Keresés és súly input */}
                <div className="w-full flex justify-center">
                    <input
                        className="p-2 border rounded-lg mr-2"
                        style={{ width: "30vw" }}
                        type="search"
                        name=""
                        id=""
                        placeholder="Search for food..."
                        onChange={handleSearch}
                        value={search}
                    />
                    <input
                        className="p-2 w-32 border rounded-lg"
                        placeholder="Serving (g)"
                        type="text"
                        value={serving}
                        onChange={(e) => handleServing(e)}
                    />
                </div>

                {/* Ha keresünk és van találat, akkor render-eljük az eredményt */}
                {queryFood && (
                    <div
                        className=" border rounded-lg search-list translate-y-32 max-h-56 overflow-y-auto absolute cursor-pointer bg-white"
                        style={{ width: "38vw" }}
                    >
                        {queryFood.map((food) => (
                            <div
                                key={uuid()}
                                onClick={() => handleSelected(food, uuid())}
                                className=" border-b py-1 px-2 hover:bg-gray-200 hover:rounded-lg "
                            >
                                {`${food.name} (${food.calories}kcal/100g)`}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/*A fogyaszott ételek táblázata */}
            <div className=" w-11/12  p-5 flex flex-col items-center ">
                <div className="food-list" style={{ width: "40vw" }}>
                    {/* A fogyaszott ételek táblázat header-je */}
                    <div className="flex justify-between items-center h-16 bg-amber-500 rounded-t-lg">
                        <div className="w-1/3 p-2">Food name</div>
                        <div className="flex w-2/3 justify-end">
                            <div className="mr-1 w-1/3">Serving</div>
                            <div className="mr-1 w-1/3">kcal</div>
                            <div className="mr-1 w-1/6">Fat</div>
                            <div className="mr-1 w-1/6">Carb</div>
                            <div className="mr-1 w-1/6">Protein</div>

                            <div className="w-1/6"></div>
                        </div>
                    </div>
                    {/* Ha van fogyaszott étel, akkor listázzuk ki, mint táblázat elemei */}
                    {selectedFood.length > 0 &&
                        selectedFood.map((i) => (
                            <div
                                key={uuid()}
                                className="p-2 flex justify-between items-center  h-16 bg-amber-500/50 last:rounded-b-lg"
                            >
                                <div className="w-1/3">{i.food.name}</div>
                                <div className="flex w-2/3 justify-end items-center ">
                                    <div className="mr-1 w-1/3 ">
                                        {i.food.serving}g
                                    </div>
                                    <div className="mr-1 w-1/3 ">
                                        {i.food.calories}kcal
                                    </div>
                                    <div className="mr-1 w-1/6">
                                        {i.food.fat}g
                                    </div>
                                    <div className="mr-1 w-1/6">
                                        {i.food.carb}g
                                    </div>
                                    <div className="mr-1 w-1/6">
                                        {i.food.protein}g
                                    </div>
                                    <div className="w-1/6 flex justify-center">
                                        <button
                                            className="w-5 h-5 bg-red-600 rounded-md"
                                            type="button"
                                            value=""
                                            onClick={() => handleDelete(i.id)}
                                        >
                                            <img src={Close} alt="close" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    {/*Ha nincs elemünk, akkor íjuk ki, hogy nincs elem */}
                    {selectedFood?.length === 0 && <div>No items yet</div>}
                </div>
            </div>

            {/*Megevett ételek összesítése (Éhes lettem a sok "étel" szótol) */}
            <div className="w-1/2  p-5 rounded-3xl flex flex-row justify-between items-center">
                <div>Calories: {total.calories}kcal</div>
                <div>Fat: {total.fat}g</div>
                <div>Carbs: {total.carb}g</div>
                <div>Protein: {total.protein}g</div>
            </div>
        </div>
    );
};

export default FoodCalculator;
