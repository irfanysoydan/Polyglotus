class CreateCardDto {
  constructor(card) {
    this.word = card.word;
    this.description = card.description;
    this.status = card.status;
  }
}

module.exports = CreateCardDto;
