class ProductDTO {
  constructor(data) {
    this.title = data.title;
    this.price = data.price;
    this.thumbnail = data.thumbnail;
    data.id || data._id ? (this.id = data.id || data._id) : null;
    data.timestamp ? (this.timestamp = data.timestamp) : null;
  }
}

export { ProductDTO };
