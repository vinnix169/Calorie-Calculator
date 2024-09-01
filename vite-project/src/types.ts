export interface UserData {
    age: number;
    weight: number;
    height: number;
    activityLevel: number;
    gender: string;
}

export interface BmiData {
    bmi: number;
    bmiCategory: string;
}

export interface FormData {
    age: number;
    weight: number;
    height: number;
    activityLevel: number;
    gender: string;
}

export interface IntakeResult {
    maintain: number;
    lose10: number; //10%+ hízás
    lose20: number; //20%+ hízás
    gain10: number; //10%-fogyás
    gain20: number; //20%-fogyás
}

export interface Food {
    id: number;
    name: string;
    calories: number;
    serving: number;
    fat: number;
    carb: number;
    protein: number;
}

export interface UserFood {
    id: string;
    food: Food
}
//User étel sémája

//a megjelenítendő makrók sémája
export interface Stat {
    calories: number;
    fat: number;
    carb: number;
    protein: number;
}