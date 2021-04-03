const bcrypt = require("bcryptjs");

module.exports = {
  hash: (password) => bcrypt.hash(password, 12),
  compare: async (password, hash) => {
    const isPasswordEquals = await bcrypt.compare(password, hash);

    if (!isPasswordEquals) {
      throw new Error("Wrong email or password", 404);
    }
  },
};
