



export class CreateProductDTO {
    title: string;
  price: number;
  description: string;
  image?: string;


  constructor(userData: CreateProduct) {
    this.title = userData.title;
    this.price = userData.price;
    this.description = userData.description;
    this.image = userData?.image;
  }
}



type CreateProduct = {
    title: string;
    price: number;
    description: string;
    image?: string;
}