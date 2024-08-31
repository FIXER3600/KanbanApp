const CardModel = require('../../model/CardModel');
const IdGenerator = require('../../util/IdGenerator');
const HashManager = require('./HashManager');
const Authenticator = require('./Authenticator');
class CardService{
	constructor() {
		this.hashManager = new HashManager();
		this.authenticator = new Authenticator();
		this.idGenerator = new IdGenerator();
	    }
	async createCard(card){
		const id = this.idGenerator.generate();
		try {
			return await CardModel.create({
				id:id.v4(),
				title:card.title,
				description:card.description,
				status:'TO-DO'
			});	
		} catch (error) {
			return error
		}
	}
	async editCard(card,cardId){
		try {	
			return await CardModel.update({
				title:card.title,
				description:card.description,
				status:card.status
			},{where:{id:cardId}});
		} catch (error) {
			return error
		}
	}
	async deleteCard(cardId){
		try {
			return await CardModel.destroy({where:{id:cardId}});
		} catch (error) {
			return error
		}
	}
	async findAll(){
		try {
			const cards = await CardModel.findAll();
            		return cards;
		} catch (error) {
			return error
		}
	}
	async findById(cardId){
		try {
			return await CardModel.findByPk({where:{id:cardId}});
		} catch (error) {
			return error
		}
	}
}
module.exports = CardService