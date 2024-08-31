const { BaseError } = require('../../../error/BaseError');
const CardService = require('../../services/CardService');

class DeleteCardUseCase {
    constructor() {
        this.cardService = new CardService();
    }

    async execute(cardId,token) {
        try {
            if (!token) {
		throw new BaseError(400,"Por favor, passe o token no header da requisição");
	    }
            if (!cardId) {
                throw new BaseError(
                    400,
                    'Envie o id do Card para remoção'
                );
            }

            return await this.cardService.deleteCard(cardId);
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = DeleteCardUseCase;