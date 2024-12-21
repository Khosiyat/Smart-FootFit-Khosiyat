import React, { useState } from 'react';
import axios from 'axios';

const FootUploader: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('footImage', file);

            try {
                const response = await axios.post('http://localhost:5000/upload', formData);
                alert(`Upload Successful: ${response.data.message}`);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <button onClick={handleUpload}>Upload Foot Image</button>
        </div>
    );
};

export default FootUploader;
