const { validationResult } = require("express-validator");
const CreateCardDto = require("../dtos/card/CreateCard.dto");
const GetCardDto = require("../dtos/card/GetCard.dto");
const HttpStatusCodes = require("http-status-codes");
const { ServiceResponse } = require("../common/serviceResponse");
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

      const cardFront = await db.Card.create(front);
      const cardBack = await db.Card.create(back);

      await db.Card.update(
        { meaningId: cardBack.id },
        {
          where: { id: cardFront.id },
        }
      );
      await db.Card.update(
        { meaningId: cardFront.id },
        {
          where: { id: cardBack.id },
        }
      );
      const cards = { front: cardFront, back: cardBack };
      res.status(HttpStatusCodes.CREATED).json(ServiceResponse.successWithData(cards, HttpStatusCodes.CREATED));
    } catch (error) {
      next(error);
    }
  };

  getCardById = async (req, res, next) => {
    try {
      const card = await db.Card.findOne({
        where: {
          id: req.params.id,
        },
        include: [{ as: "Meaning", model: db.Card }],
      });
      res.status(HttpStatusCodes.OK).json(ServiceResponse.successWithData(new GetCardDto(card), HttpStatusCodes.OK));
    } catch (error) {
      next(error);
    }
  };

  getAllCardsByDeckId = async (req, res, next) => {
    try {
      const { count, rows } = await db.Card.findAndCountAll({
        where: {
          deckId: req.params.deckId,
        },
      });

      const cardsData = { count: count, cards: rows };
      res.status(HttpStatusCodes.OK).json(ServiceResponse.successWithData(cardsData, HttpStatusCodes.OK));
    } catch (error) {
      next(error);
    }
  };

  deleteCardById = async (req, res, next) => {
    try {
      const response = await db.Card.destroy({ where: { id: req.params.id } });
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
    try {
      const response = await db.Card.update({ status: req.body.status }, { where: { id: req.params.id } });
      const card = await db.Card.findOne({ where: { id: req.params.id } });
      await db.Card.update({ status: req.body.status }, { where: { id: card.meaningId } });
      if (!response || !card)
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
