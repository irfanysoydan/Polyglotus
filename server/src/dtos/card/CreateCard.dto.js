class CreateCardDto {
  constructor(card) {
    this.word = card.word;
    this.description = card.description;
    this.status = card.status;
    this.deckId = null;
  }
}

module.exports = CreateCardDto;
