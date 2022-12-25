const { validationResult } = require("express-validator");
const createError = require("http-errors");
const CreateDeckDto = require("../dtos/deck/CreateDeck.dto");
const GetDeckDto = require("../dtos/deck/GetDeck.dto");
const HttpStatusCodes = require("http-status-codes");
const { ServiceResponse } = require("../common/serviceResponse");

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

      const deck = await db.Deck.create(data);
      res.status(HttpStatusCodes.CREATED).json(ServiceResponse.successWithData(deck, HttpStatusCodes.CREATED));
    } catch (error) {
      next(error);
    }
  };

  getDeckById = async (req, res, next) => {
    try {
      const deck = await db.Deck.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
        include: {
          model: db.Card,
          include: {
            as: "Meaning",
            model: db.Card,
          },
        },
      });
      if (!deck)
        return res
          .status(HttpStatusCodes.OK)
          .json(ServiceResponse.fail(HttpStatusCodes.NOT_FOUND, "/decks/", "Bu isimde bir deste bulunamadı."));
      res.status(HttpStatusCodes.OK).json(ServiceResponse.successWithData(new GetDeckDto(deck), HttpStatusCodes.OK));
    } catch (error) {
      next(error);
    }
  };

  getAllDecks = async (req, res, next) => {
    try {
      const decks = await db.Deck.findAll({
        where: { userId: req.user.id },
      });
      if (decks.length === 0)
        return res
          .status(HttpStatusCodes.OK)
          .json(ServiceResponse.fail(HttpStatusCodes.NOT_FOUND, "/decks/", "Sisteme kayıtlı deste bulunamadı."));
      res.status(HttpStatusCodes.OK).json(ServiceResponse.successWithData(decks, HttpStatusCodes.OK));
    } catch (error) {
      next(error);
    }
  };

  deleteDeck = async (req, res, next) => {
    try {
      const response = await db.Deck.destroy({
        where: { id: req.params.id, userId: req.user.id },
      });
      if (!response)
        return res
          .status(HttpStatusCodes.OK)
          .json(ServiceResponse.fail(HttpStatusCodes.NOT_FOUND, "/decks/", "Böyle bir deste bulunamadı."));
      res.status(HttpStatusCodes.OK).json(ServiceResponse.success(null, HttpStatusCodes.OK));
    } catch (error) {
      next(error);
    }
  };

  getDeckStatsById = async (req, res, next) => {
    let statusCount = 0;
    try {
      const deck = await db.Deck.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
        include: {
          model: db.Card,
        },
      });
      deck.Cards.forEach((element) => {
        if (element.status) {
          statusCount++;
        }
      });
      const percentage = (statusCount / deck.Cards.length) * 100;
      if (percentage == 100) {
        await db.Deck.update(
          {
            status: true,
          },
          { where: { id: req.params.id } }
        );
      } else {
        await db.Deck.update({ status: false }, { where: { id: req.params.id } });
      }
      if (!deck)
        return res
          .status(HttpStatusCodes.OK)
          .json(ServiceResponse.fail(HttpStatusCodes.NOT_FOUND, "/decks/", "Bu isimde bir deste bulunamadı."));
      res.status(HttpStatusCodes.OK).json(ServiceResponse.successWithData(percentage, HttpStatusCodes.OK));
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new DeckController();
