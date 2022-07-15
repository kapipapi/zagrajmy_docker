export type Product = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    category: string;
    tags: string[];
    mainPhotoUrl: string;
    mainPhotoObject: FileList;
    photosUrl: string[];
}

export type Products = Product[];

export type NewProductForm = {
    name: string;
    price: number;
    quantity: number;
    category: string;
    file: FileList;
}