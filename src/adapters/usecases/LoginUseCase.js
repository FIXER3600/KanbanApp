// LoginUserUseCase.js
const BaseError = require('../../error/BaseError');
const UserService = require('../services/UserService');

class LoginUserUseCase {
    constructor() {
        this.userService = new UserService();
    }

    async execute(input) {
        try {
            if (!input.email || !input.password) {
                throw new BaseError(400, 'Preencha todos os campos da requisição');
            }

            if (!input.email.includes("@")) {
                throw new InvalidEmail();
            }

            const userFromDB = await this.userService.getUserByEmail(input.email);
	    if (!userFromDB) {
		throw new BaseError(400,"Email ou Senha inválidos"); // Utilize a classe específica UserNotFound
	    }
            await this.userService.comparePassword(input.password, userFromDB.password);

            const accessToken = this.userService.generateAccessToken(userFromDB.id);

            return accessToken;
        } catch (error) {
                throw new Error( error);
        }
    }
}

module.exports = LoginUserUseCase;
