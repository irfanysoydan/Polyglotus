const { validationResult } = require("express-validator");
const createError = require("http-errors");
const CreateDeckDto = require("../dtos/deck/CreateDeck.dto");
const GetDeckDto = require("../dtos/deck/GetDeck.dto");
const HttpStatusCodes = require("http-status-codes");
const { ServiceResponse } = require("../common/serviceResponse");
const services = require("../services/index.services");

const db = require("../models");

class DeckController {
  createDeck = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors);
    }
    try {
      const data = new CreateDeckDto(req.body);
      data.userId = req.user.id;

      const deck = await services.deck.create(data);
      return res.status(HttpStatusCodes.CREATED).json(ServiceResponse.successWithData(deck, HttpStatusCodes.CREATED));
    } catch (error) {
      next(error);
    }
  };

  getDeckById = async (req, res, next) => {
    try {
      const deck = await services.deck.getById(req.params.id, req.user.id);
      if (!deck)
        return res
          .status(HttpStatusCodes.OK)
          .json(ServiceResponse.fail(HttpStatusCodes.NOT_FOUND, "/decks/", "Bu isimde bir deste bulunamadı."));
      return res.status(HttpStatusCodes.OK).json(ServiceResponse.successWithData(new GetDeckDto(deck), HttpStatusCodes.OK));
    } catch (error) {
      next(error);
    }
  };

  getAllDecks = async (req, res, next) => {
    try {
      const decks = await services.deck.getAll(req.user.id);
      if (decks.length === 0)
        return res
          .status(HttpStatusCodes.OK)
          .json(ServiceResponse.fail(HttpStatusCodes.NOT_FOUND, "/decks/", "Sisteme kayıtlı deste bulunamadı."));

      decks.forEach((deck) => {
        let statusCount = 0;
        const cardLength = deck.Cards.length / 2;
        deck.dataValues.cardCount = cardLength;
        deck.Cards.forEach((card) => {
          if (card.status === true) {
            statusCount++;
          }
        });
        deck.dataValues.percentage = Math.floor((statusCount / (cardLength * 2)) * 100);
        if (statusCount === 0) {
          deck.dataValues.percentage = 0;
        }
      });
      console.log(decks);

      return res.status(HttpStatusCodes.OK).json(ServiceResponse.successWithData(decks, HttpStatusCodes.OK));
    } catch (error) {
      next(error);
    }
  };

  deleteDeck = async (req, res, next) => {
    try {
      const response = await services.deck.delete(req.params.id, req.user.id);
      if (!response)
        return res
          .status(HttpStatusCodes.OK)
          .json(ServiceResponse.fail(HttpStatusCodes.NOT_FOUND, "/decks/", "Böyle bir deste bulunamadı."));
      return res.status(HttpStatusCodes.OK).json(ServiceResponse.success(null, HttpStatusCodes.OK));
    } catch (error) {
      next(error);
    }
  };

  getDeckStatsById = async (req, res, next) => {
    let statusCount = 0;
    let percentage = 0;
    const id = req.params.id;
    try {
      const deck = await services.deck.getById(id, req.user.id);
      deck.Cards.forEach((element) => {
        if (element.status) {
          statusCount++;
        }
      });
      if (deck.Cards.length !== 0) {
        percentage = Math.floor((statusCount / deck.Cards.length) * 100);
      }
      const data = { percentage };
      if (percentage == 100) {
        await services.deck.updateStatus(id, true);
      } else {
        await services.deck.updateStatus(id, false);
      }
      if (!deck)
        return res
          .status(HttpStatusCodes.OK)
          .json(ServiceResponse.fail(HttpStatusCodes.NOT_FOUND, "/decks/", "Bu isimde bir deste bulunamadı."));
      return res.status(HttpStatusCodes.OK).json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new DeckController();
