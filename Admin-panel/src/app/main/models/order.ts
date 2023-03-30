export interface Order {
    firstname: string;
    lastname: string;
    phone: string;
    cart: {[type: string]: number};
    id: string;
}
