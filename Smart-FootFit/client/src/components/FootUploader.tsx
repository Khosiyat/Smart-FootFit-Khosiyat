import React, { useState } from 'react';

const FootUploader = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<any>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setFile(file);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:5000/upload_foot_scan', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            setRecommendations(result);
        } catch (error) {
            console.error('Error uploading foot scan:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Scan'}
            </button>

            {recommendations && (
                <div>
                    <h3>Recommended Shoe:</h3>
                    <p>Size: {recommendations.shoe_size}</p>
                    <p>Model: {recommendations.shoe_model}</p>
                </div>
            )}
        </div>
    );
};

export default FootUploader;
