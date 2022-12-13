class GetMeaningDto {
  constructor(meaning) {
    this.word = meaning.word;
    this.description = meaning.description;
    this.status = meaning.status;
  }
}

module.exports = GetMeaningDto;
