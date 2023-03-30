import { CreatedProduct } from "./created-product";

export interface Product extends CreatedProduct {
    availability: boolean;
    id: string;
    count?: number;
}
