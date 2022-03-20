class UserDTO {
  constructor(data) {
    this.id = data.id || data._id;
    this.username = data.username;
    this.password = data.password;
  }
}

export { UserDTO };
