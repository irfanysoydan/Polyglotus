class CreateUserDto {
  constructor(user) {
    this.email = user.email;
    this.fullName = user.fullName;
    this.password = user.password;
  }
}

module.exports = CreateUserDto;
