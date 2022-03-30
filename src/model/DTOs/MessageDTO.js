class MessageDTO {
  constructor(data) {
    this.author = data.author;
    this.text = data.text;
    data.id || data._id ? (this.id = data.id || data._id.toString()) : null;
    data.timestamp ? (this.timestamp = data.timestamp) : null;
  }
}

export { MessageDTO };
