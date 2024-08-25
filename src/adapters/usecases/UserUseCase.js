const UserModel = require("../../model/UserModel")
const IdGenerator = require('../../util/IdGenerator');
const HashManager = require("../services/HashManager")
const Authenticator = require("../../adapters/services/Authenticator")
const { BaseError, InvalidEmail, InvalidName, InvalidPassword } = require('../../error/BaseError');

class UserUseCase{
	hashManager = new HashManager();
	authenticator = new Authenticator();
	async createUser(user) {
		try {
		    if (!user.name || !user.email || !user.password) {
			throw new BaseError(
			    400,
			    'Preencha os campos "name", "email" e "password"'
			);
		    }
	    
		    if (user.name.length < 4) {
			throw new InvalidName();
		    }
	    
		    if (!user.email.includes("@")) {
			throw new InvalidEmail();
		    }
	    
		    if (user.password.length < 6) {
			throw new InvalidPassword();
		    }
	    
		    const existingUser = await UserModel.getUserByEmail(user.email);
		    if (existingUser) {
			throw new BaseError(409, 'Usuário já cadastrado');
		    }
	    
		    const idGenerator = new IdGenerator();
		    const id = idGenerator.generate();
	    
		   
		    const hashPassword = await hashManager.hash(user.password);
	    
		    await UserModel.create({
			id: id.v4(),
			name: user.name,
			email: user.email,
			password: hashPassword
		    });
	    
		    const accessToken = authenticator.generateToken({ id });
	    
		    return accessToken;
		} catch (error) {
			throw new Error( error);
		}
	    }
	    
	async login(input) {
		try {
		    if (!input.email || !input.password) {
			throw new BaseError(400, 'Preencha todos os campos da requisição');
		    }
		    
		    if (!input.email.includes("@")) {
			throw new InvalidEmail();
		    }
		    
		    const userFromDB = await UserModel.getUserByEmail(input.email);
		    
		    if (!userFromDB) {
			throw new UserNotFound(); // Utilize a classe específica UserNotFound
		    }
		    
		    const hashCompare = await hashManager.compare(input.password, userFromDB.getPassword());
		    if (!hashCompare) {
			throw new InvalidPassword(); // Utilize a classe específica InvalidPassword
		    }
	    
		    const accessToken = authenticator.generateToken({ id: userFromDB.getId() });
	    
		    return accessToken;
		} catch (error) {
			throw new Error( error);
		}
	    }
	    
}
module.exports = UserUseCase