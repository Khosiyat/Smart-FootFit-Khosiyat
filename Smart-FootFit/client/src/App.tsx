import React from 'react';
import './App.css';
import FootUploader from './components/FootUploader';
import FootVisualizer from './components/FootVisualizer';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Smart-FootFit</h1>
            <FootUploader />
            <FootVisualizer />
        </div>
    );
};

export default App;
