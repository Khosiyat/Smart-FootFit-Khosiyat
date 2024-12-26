import React from 'react';
import './App.css';
import FootUploader from './components/FootUploader.tsx';



function App() {
  return (
    <div className="App">
      <h1>Make Your Life easy with Smart FootFit</h1>
      <FootUploader /> {/* Add the upload component here */}
    </div>
  );
}

export default App;
