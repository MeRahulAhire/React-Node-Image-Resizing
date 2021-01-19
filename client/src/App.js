import React, {useState} from 'react'
import 'style.css'
import axios from 'axios'
import fileDownload from 'js-file-download';
import b64toBlob from 'b64-to-blob'
function App() {
  const [state, setState] = useState({
    file: null,
  })
  const fileHandler = e => {
    console.log(e.target.files[0]);
    setState({...state, file: e.target.files[0]})

  }
  const fileUploader = () => {
    const formData = new FormData()

    formData.append('image', state.file, state.file.name);

    axios.post('http://localhost:4000/file',formData).then((res) => {
      const data = res.data
      console.log(data)
      const blob = b64toBlob(data.b64Data, data.contentType)
      console.log(blob)
      const [contentType, fileExtension] = data.contentType.split('/')
      const fileName = state.file.name
      fileDownload(blob , `${fileName}-resized.${fileExtension}`)
    }).catch((err) => {
      console.error(err)
    })


    // console.log(state.file)
  }
  return (
    <div className="App">
      <input type="file" onChange={fileHandler} />
      <button onClick={fileUploader}>Send File</button>
      <img src={state.imgSrc} alt=""id="img"/>
    </div>
  );
}

export default App;


