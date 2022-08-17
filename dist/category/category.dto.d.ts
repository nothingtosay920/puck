declare class Categorylabel {
    name: string;
    description: string;
    label_id: string;
}
export declare class Category {
    name: string;
    description: string;
    category_id: string;
    labels: Categorylabel[];
}
export {};
