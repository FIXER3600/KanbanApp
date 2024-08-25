const bcrypt = require("bcryptjs");

class HashManager {
    async hash(text) {
        const rounds = 12;
        const salt = await bcrypt.genSalt(rounds);
        const result = await bcrypt.hash(text, salt);
        return result;
    }

    async compare(text, hash) {
        return await bcrypt.compare(text, hash);
    }
}

module.exports = HashManager;
