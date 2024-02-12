



export class UpdateProductDTO {
    title?: string;
  price?: number;
  description?: string;
  image?: string;


  constructor(userData: UpdateProduct) {
    this.title = userData?.title;
    this.price = userData?.price;
    this.description = userData?.description;
    this.image = userData?.image;
  }
}



type UpdateProduct = {
    title?: string;
    price?: number;
    description?: string;
    image?: string;
}