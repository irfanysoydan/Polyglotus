const GetCardDto = require("../card/GetCard.dto");

class GetDeckDto {
  constructor(deck) {
    this.name = deck.name;
    this.status = deck.status;
    this.cards = deck.Cards.map(card=>new GetCardDto(card));
  }
}

module.exports = GetDeckDto;
