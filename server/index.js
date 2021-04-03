const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const { PORT, MONGO_URL } = require("./config/configs");

const mainRouters = require("./routes/main.routes");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static(path.join(process.cwd(), "uploads")));

app.use(cors());
app.use(fileUpload());
app.use(morgan("dev"));

app.use("/", mainRouters);

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} `);
    });
  })
  .catch((e) => {
    console.log(e.message);
  });

mongoose.set("useFindAndModify", false);
