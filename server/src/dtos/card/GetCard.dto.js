const GetMeaningDto = require("./GetMeaning.dto");

class GetCardDto {
  constructor(card) {
    this.word = card.word;
    this.description = card.description;
    this.status = card.status;
    this.meaning = new GetMeaningDto(card.Meaning);
  }
}

module.exports = GetCardDto;
