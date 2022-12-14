class CreateUserDto {
  constructor(data) {
    this.email = data.email;
    this.fullName = data.fullName;
    this.password = data.password;
  }
}

module.exports = CreateUserDto;
