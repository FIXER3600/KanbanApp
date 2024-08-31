const express = require("express");
const cardController = require('../adapters/controller/CardController');

const cardRouter = express.Router();

cardRouter.get("/all", cardController.findAll);
cardRouter.post("/new", cardController.createCard);
cardRouter.put("/edit/:cardId", cardController.editCard);
cardRouter.delete("/delete/:cardId", cardController.deleteCard);
module.exports = cardRouter;
