// UserService.js
const UserModel = require('../../model/UserModel');
const IdGenerator = require('../../util/IdGenerator');
const HashManager = require('./HashManager');
const Authenticator = require('./Authenticator');
const { BaseError, UserNotFound, InvalidPassword } = require('../../error/BaseError');

class UserService {
    constructor() {
        this.hashManager = new HashManager();
        this.authenticator = new Authenticator();
        this.idGenerator = new IdGenerator();
    }

    async createUser(user) {
        const existingUser = await UserModel.getUserByEmail(user.email);
        if (existingUser) {
            throw new BaseError(409, 'Usuário já cadastrado');
        }

        const id = this.idGenerator.generate();
        const hashPassword = await this.hashManager.hash(user.password);

        await UserModel.create({
            id: id.v4(),
            name: user.name,
            email: user.email,
            password: hashPassword
        });

        const accessToken = this.authenticator.generateToken({ id });
        return accessToken;
    }
    async getUserByEmail(email) {
        const userFromDB = await UserModel.getUserByEmail(email);
        if (!userFromDB) {
            throw new UserNotFound();
        }
        return userFromDB;
    }

    async comparePassword(inputPassword, storedPassword) {
        const isPasswordValid = await this.hashManager.compare(inputPassword, storedPassword);
        if (!isPasswordValid) {
            throw new InvalidPassword();
        }
        return true;
    }

    generateAccessToken(userId) {
        return this.authenticator.generateToken({ id: userId });
    }
    async findAll()  {
        try {
            const users = await UserModel.findAll();
            return users;
        } catch (error) {
           return error;
        }
    }
}

module.exports = UserService;
