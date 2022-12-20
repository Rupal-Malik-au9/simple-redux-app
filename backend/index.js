const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3002;
const url = process.env.URL;
const cors = require("cors");

const client = new MongoClient(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
	const collection = client.db("posts").collection("post");

	const corsOptions = {
		origin: "*",
		credentials: true, //access-control-allow-credentials:true
		optionSuccessStatus: 200,
	};
	// middleware
	app.use(cors(corsOptions));

	app.use(express.json());
	app.use(express.urlencoded());
	// GET
	app.get("/", (req, res) => {
		collection.find().toArray((err, data) => {
			res.send(data);
		});
	});
	// POST
	app.post("/add", (req, res) => {
		collection
			.insertOne(req.body)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => {
				res.status(500).json({ err: "new post cannot be created" });
			});
	});

	// UPDATE
	app.put("/:id", (req, res) => {
		console.log(req.params.id, "req.body", req.body);
		collection
			.updateOne(
				{ _id: ObjectId(req.params.id) },
				{ $set: { name: req.body.name, text: req.body.text } },
				{ upsert: true }
			)
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json({ err: "post cannot be edited" });
			});
	});

	// DELETE
	app.delete("/:id", (req, res) => {
		console.log(req.params.id, "id is required");
		collection
			.deleteOne({ _id: ObjectId(req.params.id) })
			.then((result) => {
				res.status(200).json(result);
			})
			.catch((err) => {
				res.status(500).json({ err: "post cannot be deleted" });
			});
	});

	app.listen(port, (err) => {
		if (err) throw err;
		console.log(`App is running on http://localhost:${port}/`);
	});

	// client.close();
});
