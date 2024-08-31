const { BaseError, InvalidCardName, InvalidCardStatus, CardNotFound } = require('../../../error/BaseError');
const CardService = require('../../services/CardService');

class EditCardUseCase {
    constructor() {
        this.cardService = new CardService();
    }

    async execute(card,cardId,token) {
        try {
	    const cardExist = await this.cardService.findById(cardId);
	    if (!cardExist) {
		throw new CardNotFound();
	    }
            if (!token) {
		throw new BaseError(400,"Por favor, passe o token no header da requisição");
	    }
            if (!card.title || !card.description) {
                throw new BaseError(
                    400,
                    'Preencha os campos "título", "descrição" e "status" para editar um card'
                );
            }
            if (card.title.length < 4) {
                throw new InvalidCardName();
            }
	    if (card.status != 'TO-DO' && card.status != 'DOING' && card.status != 'DONE') {
		throw new InvalidCardStatus();
	    }

            return await this.cardService.editCard(card,cardId);
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = EditCardUseCase;