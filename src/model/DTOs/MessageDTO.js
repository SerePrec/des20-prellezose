class MessageDTO {
  constructor(data) {
    this.id = data.id || data._id;
    this.author = data.author;
    this.text = data.text;
    this.timestamp = data.timestamp;
  }
}

export { MessageDTO };
