class CreateDeckDto {
  constructor(deck) {
    this.name = deck.name;
    this.userId = deck.userId;
  }
}

module.exports = CreateDeckDto;
