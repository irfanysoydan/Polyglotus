const { validationResult } = require("express-validator");
const CreateCardDto = require("../dtos/card/CreateCard.dto");
const GetCardDto = require("../dtos/card/GetCard.dto");
const HttpStatusCodes = require("http-status-codes");
const { ServiceResponse } = require("../common/serviceResponse");
const services = require("../services/index.services");

const db = require("../models");
class CardController {
  createCard = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors);
    }
    try {
      const front = new CreateCardDto(req.body.front);
      const back = new CreateCardDto(req.body.back);
      front.deckId = req.body.deckId;
      back.deckId = req.body.deckId;

      const cardFront = await services.card.create(front);
      const cardBack = await services.card.create(back);

      await services.card.updateMeaning(cardFront.id, cardBack.id);
      await services.card.updateMeaning(cardBack.id, cardFront.id);

      const cards = { front: cardFront, back: cardBack };
      res.status(HttpStatusCodes.CREATED).json(ServiceResponse.successWithData(cards, HttpStatusCodes.CREATED));
    } catch (error) {
      next(error);
    }
  };

  getCardById = async (req, res, next) => {
    try {
      const card = await services.card.getById(req.params.id);
      res.status(HttpStatusCodes.OK).json(ServiceResponse.successWithData(new GetCardDto(card), HttpStatusCodes.OK));
    } catch (error) {
      next(error);
    }
  };

  getAllCardsByDeckId = async (req, res, next) => {
    try {
      const { count, rows } = await services.card.getAllByDeckId(req.params.deckId);

      const cardsData = { count: count / 2, cards: rows };
      res.status(HttpStatusCodes.OK).json(ServiceResponse.successWithData(cardsData, HttpStatusCodes.OK));
    } catch (error) {
      next(error);
    }
  };

  deleteCardById = async (req, res, next) => {
    try {
      const response = await services.card.delete(req.params.id);
      if (!response)
        return res
          .status(HttpStatusCodes.OK)
          .json(ServiceResponse.fail(HttpStatusCodes.NOT_FOUND, "/cards/", "Böyle bir kart bulunamadı."));
      res.status(HttpStatusCodes.OK).json(ServiceResponse.successWithData(response, HttpStatusCodes.OK));
    } catch (error) {
      next(error);
    }
  };

  updateCardStatus = async (req, res, next) => {
    const status = req.body.status;
    try {
      await services.card.updateStatus(req.params.id, status);
      const card = await services.card.getById(req.params.id);
      await services.card.updateStatus(card.meaningId, status);
      if (!card)
        return res
          .status(HttpStatusCodes.OK)
          .json(ServiceResponse.fail(HttpStatusCodes.NOT_FOUND, "/cards/", "Böyle bir kart bulunamadı."));
      res.status(HttpStatusCodes.OK).json(ServiceResponse.success(null, HttpStatusCodes.OK));
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new CardController();
