const cardRouter = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require("../controllers/cards.js");

cardRouter.get("/", getCards);
cardRouter.post("/", createCard);
cardRouter.delete("/:cardId", deleteCard);
cardRouter.put("/:cardId/likes", likeCard);
cardRouter.delete("/:cardId/likes", unlikeCard);

module.exports = cardRouter;
