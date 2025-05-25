export type User = {
    id: number;
    username: string;
};

export type Category = {
    id: number;
    name: string;
}

export type Ingredient = {
    id: number;
    name: string;
    amount: string;
}

export type Step = {
    id: number;
    step_number: number;
    instruction: string;
}

export type RecipeType = {
    id: number;
    title: string;
    description: string;
    main_photo_url: string;
    user: User;
    category: Category;
    ingredient: Ingredient[];
    step: Step[];
};
