
class GetCardDto {
  constructor(card) {
    this.word = card.word;
    this.description = card.description;
    this.status = card.status;
    this.meaning = card.meaningId;
  }
}

module.exports = GetCardDto;
