// CreateUserUseCase.js
const { BaseError, InvalidEmail, InvalidName, InvalidPassword } = require('../../error/BaseError');
const UserService = require('../services/UserService');

class CreateUseCase {
    constructor() {
        this.userService = new UserService();
    }

    async execute(user) {
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

            return await this.userService.createUser(user);
        } catch (error) {
                throw new Error(error);
        }
    }
}

module.exports = CreateUseCase;
