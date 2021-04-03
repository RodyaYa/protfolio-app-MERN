module.exports = {
  PORT: process.env.PORT || 5000,
  CRON_PERIOD: process.env.CRON_PERIOD || "0 * * * *", // every hour
  MONGO_URL:
    process.env.MONGO_URL ||
    `mongodb+srv://rodion:Radik1001@cluster0.aobsr.azure.mongodb.net/learning_mern?retryWrites=true&w=majority`,
  JWT_SECRET: process.env.JWT_SECRET || "Rodya Oficial website",
  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET || "Rodya Oficial website 777",
  ROOT_EMAIL: process.env.ROOT_EMAIL || "test@mail.com",
  ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || "password",
};
