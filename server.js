require('dotenv').config();

const express = require('express');
const sharp = require('sharp');
const cors = require('cors');
const formidable = require('formidable');

const app = express();
app.use(cors());

app.use(express.json());

app.post('/file', async (req, res) => {
	const form = formidable();
	form.parse(req, (err, fields, files) => {
		if (err) {
			next(err);
			return;
		}
		const imageInput = files.image.path;
		const contentType = files.image.type;
		 await sharp(imageInput)
			.resize(512, 512)
			.png()
			.toBuffer()
			.then((data) => {
				const base64Data = data.toString('base64');

				// const blobData = `data:${contentType};base64,${base64Data}`

				res.status(202).json({ b64Data: base64Data, contentType: contentType, extension: 'png' });
				// res.send(base64Data)
			})
			.catch((err) => console.log(err));
	});
});
app.listen(4000);
