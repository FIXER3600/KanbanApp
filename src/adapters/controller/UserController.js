const UserService = require("../services/UserService");
const CreateUserUseCase = require("../usecases/User/CreateUserUseCase")
const LoginUseCase = require("../usecases/User/LoginUseCase")
class UserController {
        constructor() {
		this.createUserUseCase = new CreateUserUseCase();
		this.loginUseCase = new LoginUseCase();
		this.userService = new UserService();
		this.signup = this.signup.bind(this);
		this.login = this.login.bind(this);
		this.findAll = this.findAll.bind(this);
	    }
	
     async signup(req, res) {
        const { name, email, password } = req.body;
        try {
            const user = { name, email, password };
            const result = await this.createUserUseCase.execute(user);
            if (result.success === false) {
                return res.status(400).json({ message: result.message });
            }
            res.status(201).json({token:result});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = { email, password };
            const result = await this.loginUseCase.execute(user);
            if (result.success === false) {
                return res.status(400).json({ message: result.message });
            }
            res.status(201).json({token:result});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async findAll  (req, res)  {
       const result=await this.userService.findAll()
       if (result.success === false) {
	        return res.status(400).json({ message: result.message });
       }
       res.status(200).json(result)
    }
}

module.exports = new UserController();
