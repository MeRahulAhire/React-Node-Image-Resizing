import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import fileDownload from 'js-file-download';
import b64toBlob from 'b64-to-blob';
function App() {
	const [ state, setState ] = useState({
		file: null
	});
	const fileHandler = (e) => {
		console.log(e.target.files[0].name);
		setState({ ...state, file: e.target.files[0] });
		document.getElementById('h1').innerHTML = e.target.files[0].name;
	};
	const fileUploader = () => {
		const formData = new FormData();

		formData.append('image', state.file, state.file.name);

		axios
			.post('http://localhost:4000/file', formData)
			.then((res) => {
				const data = res.data;
				// console.log(data);
				const blob = b64toBlob(data.b64Data, data.contentType);
				// console.log(blob);
				const [ fileName ] = state.file.name.split('.');
				fileDownload(blob, `${fileName}-resized.${data.extension}`);
			})
			.catch((err) => {
				console.error(err);
			});

		// console.log(state.file)
	};
	return (
		<div className="App">
			<div className="container">
				<input type="file" onChange={fileHandler} id="input" /> <br />
				<label htmlFor="input">
					<div className="label">
						<div className="h1">
							<h1 id="h1">Add File</h1>
						</div>
						<button onClick={fileUploader} className="button">
							Send File
						</button>
					</div>
				</label>
			</div>
		</div>
	);
}

export default App;
