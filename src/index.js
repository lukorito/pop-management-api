import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./swagger.yaml");

dotenv.config();

const app = express();

// allow cors
app.use(cors());
// allow use of body parser
app.use(bodyParser.json());

//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// db connection
mongoose.connect(process.env.MONGO_DB_URI, {
	useCreateIndex: true,
	useNewUrlParser: true,
});

const PORT = process.env.PORT || 3001;

app.use("/api", router);

app.get("/", (req, res, next) => {
	res.status(200).send({
		message: "Welcome to the beginning",
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
