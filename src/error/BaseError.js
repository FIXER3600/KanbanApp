class BaseError extends Error {
	constructor(code,message) {
	  super(message);
	  this.code=code;
	}
      }
class InvalidEmail extends BaseError{
	constructor() {
	  super(400,"Email Inválido")
	}
}
class InvalidName extends BaseError{ 
	constructor(){
	    super(400, "Nome inválido")
	}
}
class InvalidPassword extends BaseError{
	    constructor(){
	      super(400,"Senha inválida")
	    }
}    
class UserNotFound extends BaseError{
	  constructor(){
	    super(404,"Usuário não encontrado")
	}
}
class InvalidCardName extends BaseError{
	constructor(){
	  super(400,"Nome de card inválido")
      }
}
class InvalidCardStatus extends BaseError{
	constructor(){
	  super(400,"Status inválido")
      }
}
class CardNotFound extends BaseError{
	constructor(){
	  super(404,"Card não encontrado")
      }
}
module.exports = {
	BaseError,
	InvalidEmail,
	InvalidName,
	InvalidPassword,
	UserNotFound,
	InvalidCardName,
	CardNotFound,
	InvalidCardStatus
};