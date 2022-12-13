class GetUserDto {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.fullName = user.fullName;
    this.isAdmin = user.isAdmin;
    this.decks = user.Decks;
  }
}

module.exports = GetUserDto;
