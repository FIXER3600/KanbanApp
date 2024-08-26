// signupController.test.js
const userController = require('../../../adapters/controller/UserController');

describe('Signup', () => {
    beforeEach(() => {
        // Mock the dependencies
        userController.createUseCase = {
            execute: jest.fn(),
        };
    });

    test('should create a user and return a token with status 201 when successful', async () => {
        const req = {
            body: {
                name: 'John Doe',
                email: 'john.doe77@example.com',
                password: 'password123',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const mockResult = { token: { token: 'some-token' } }; // Adjusted structure here
        userController.createUseCase.execute.mockResolvedValue(mockResult);

        await userController.signup(req, res);

        expect(userController.createUseCase.execute).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith( mockResult.token ); // Correct assertion
    });

    test('should return 400 with error message when creation fails', async () => {
        const req = {
            body: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const mockResult = { success: false, message: 'Creation failed' };
        userController.createUseCase.execute.mockResolvedValue(mockResult);

        await userController.signup(req, res);

        expect(userController.createUseCase.execute).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Creation failed' });
    });

    test('should return 500 with error message when an exception is thrown', async () => {
        const req = {
            body: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'password123',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        const errorMessage = 'An unexpected error occurred';
        userController.createUseCase.execute.mockRejectedValue(new Error(errorMessage));

        await userController.signup(req, res);

        expect(userController.createUseCase.execute).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
});
