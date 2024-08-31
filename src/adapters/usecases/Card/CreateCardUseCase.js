const { BaseError, InvalidCardName } = require('../../../error/BaseError');
const CardService = require('../../services/CardService');

class CreateCardUseCase {
    constructor() {
        this.cardService = new CardService();
    }

    async execute(card,token) {
        try {
            if (!token) {
				throw new BaseError(400,"Por favor, passe o token no header da requisição");
			}
            if (!card.title || !card.description) {
                throw new BaseError(
                    400,
                    'Preencha os campos "título" e "descrição" para criar um card'
                );
            }

            if (card.title.length < 4) {
                throw new InvalidCardName();
            }

            return await this.cardService.createCard(card);
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = CreateCardUseCase;
