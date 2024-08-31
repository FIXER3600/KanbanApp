const CardService = require('../services/CardService')
const CreateCardUseCase = require('../usecases/Card/CreateCardUseCase');
const DeleteCardUseCase = require('../usecases/Card/DeleteCardUseCase');
const EditCardUseCase = require('../usecases/Card/EditCardUseCase');
class CardController{
	constructor() {
		this.createCardUseCase = new CreateCardUseCase();
		this.editCardUseCase = new EditCardUseCase();
		this.deleteCardUseCase = new DeleteCardUseCase();
		this.cardService = new CardService();
		this.createCard=this.createCard.bind(this)
		this.editCard=this.editCard.bind(this)
		this.deleteCard=this.deleteCard.bind(this)
		this.findAll=this.findAll.bind(this)
	}
	async createCard(req,res){
		const auth=req.headers.authorization;
		const {title,description,status}=req.body;
		
		const newCard={
			title,
			description,
			status
		}
		const result = await this.createCardUseCase.execute(newCard,auth)
		if (result.success === false) {
			return res.status(400).json({ "mensagem": "Erro ao criar o card"});
		}
		res.status(201).json({"mensagem": "Card criado com sucesso!"});
	} 	
	async editCard(req,res){
		const auth=req.headers.authorization;
		const {title,description,status}=req.body;
		const {cardId}=req.params;
		const card={
			title,
			description,
			status
		}	
		const result = await this.editCardUseCase.execute(card,cardId,auth)
		if (result[0] !== 1) {
			return res.status(400).json({ "mensagem": "Erro ao editar o card" });
		}
		res.status(200).json({"mensagem":"Card editado  com sucesso!"});
	}
	async deleteCard(req,res){
		const auth=req.headers.authorization;
		const {cardId}=req.params;	
		const result = await this.deleteCardUseCase.execute(cardId,auth)
		if (result !== 1) {
			return res.status(400).json({ message: result.message });
		}
		res.status(200).json({"mensagem":"Card deletado com sucesso!"});
	}	
	async findAll  (req, res)  {

		const result=await this.cardService.findAll()
		if (result.success === false) {
		 return res.status(400).json({"mensagem": "Nenhum card encontrado" });
	     	}
		res.status(200).json(result)
	}    
}
module.exports = new CardController();

