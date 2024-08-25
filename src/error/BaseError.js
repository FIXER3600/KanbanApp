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
module.exports = {
	BaseError,
	InvalidEmail,
	InvalidName,
	InvalidPassword,
	UserNotFound,
};