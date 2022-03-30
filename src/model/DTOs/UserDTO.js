class UserDTO {
  constructor(data) {
    this.username = data.username;
    this.password = data.password;
    data.id || data._id ? (this.id = data.id || data._id.toString()) : null;
    data.timestamp ? (this.timestamp = data.timestamp) : null;
  }
}

export { UserDTO };
