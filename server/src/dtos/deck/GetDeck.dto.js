
class GetDeckDto {
  constructor(deck) {
    this.name = deck.name;
    this.status = deck.status;
    this.cards = deck.Cards;
  }
}

module.exports = GetDeckDto;
