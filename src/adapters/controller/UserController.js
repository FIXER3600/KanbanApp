const UserService = require("../services/UserService");
const CreateUseCase = require("../usecases/CreateUseCase")
const LoginUseCase = require("../usecases/LoginUseCase")
class UserController {
        constructor() {
		this.createUseCase = new CreateUseCase();
		this.loginUseCase = new LoginUseCase();
		this.userService = new UserService();
		this.signup = this.signup.bind(this);
		this.login = this.login.bind(this);
		this.findAll = this.findAll.bind(this);

	    }
	
     async signup(req, res) {
        const { name, email, password, role } = req.body;
        try {
            const user = { name, email, password, role };
            const result = await this.createUseCase.execute(user);
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
