// // import React, { useState } from 'react';

// // const FootUploader = () => {
// //     const [file, setFile] = useState<File | null>(null);
// //     const [loading, setLoading] = useState(false);
// //     const [recommendations, setRecommendations] = useState<any>(null);

// //     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const file = e.target.files ? e.target.files[0] : null;
// //         if (file) {
// //             setFile(file);
// //         }
// //     };

// //     const handleUpload = async () => {
// //         if (!file) return;

// //         setLoading(true);
// //         const formData = new FormData();
// //         formData.append('file', file);

// //         try {
// //             const response = await fetch('http://127.0.0.1:5000/upload_foot_scan', {
// //                 method: 'POST',
// //                 body: formData,
// //             });
// //             const result = await response.json();
// //             setRecommendations(result);
// //         } catch (error) {
// //             console.error('Error uploading foot scan:', error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <div>
// //             <input type="file" onChange={handleFileChange} />
// //             <button onClick={handleUpload} disabled={loading}>
// //                 {loading ? 'Uploading...' : 'Upload Scan'}
// //             </button>

// //             {recommendations && (
// //                 <div>
// //                     <h3>Recommended Shoe:</h3>
// //                     <p>Size: {recommendations.shoe_size}</p>
// //                     <p>Model: {recommendations.shoe_model}</p>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default FootUploader;


// import React, { useState } from 'react';

// const FootUploader = () => {
//     const [file, setFile] = useState<File | null>(null);
//     const [imageUrl, setImageUrl] = useState<string | null>(null); // Store the URL of the uploaded image
//     const [loading, setLoading] = useState(false);
//     const [recommendations, setRecommendations] = useState<any>(null);

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files ? e.target.files[0] : null;
//         if (file) {
//             setFile(file);
//             setImageUrl(URL.createObjectURL(file)); // Set the image URL for preview
//         }
//     };

//     const handleUpload = async () => {
//         if (!file) return;

//         setLoading(true);
//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await fetch('http://127.0.0.1:5000/upload_foot_scan', {
//                 method: 'POST',
//                 body: formData,
//             });
//             const result = await response.json();
//             setRecommendations(result); // Store the recommendations
//         } catch (error) {
//             console.error('Error uploading foot scan:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <input type="file" onChange={handleFileChange} />
//             <button onClick={handleUpload} disabled={loading}>
//                 {loading ? 'Uploading...' : 'Upload Scan'}
//             </button>

//             {/* Display the uploaded image if available */}
//             {imageUrl && (
//                 <div>
//                     <h3>Uploaded Foot Scan:</h3>
//                     <img src={imageUrl} alt="Uploaded Foot Scan" style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} />
//                 </div>
//             )}

//             {/* Display shoe recommendations if available */}
//             {recommendations && (
//                 <div>
//                     <h3>Recommended Shoe:</h3>
//                     <p>Size: {recommendations.shoe_size}</p>
//                     <p>Model: {recommendations.shoe_model}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FootUploader;




import React, { useState } from 'react';

const FootUploader = () => {
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setFile(file);
            setImageUrl(URL.createObjectURL(file));
            setRecommendations(null); // Clear previous recommendations
            setErrorMessage(null); // Clear previous errors
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

            if (!response.ok) {
                const error = await response.json();
                setErrorMessage(error.error);
            } else {
                const result = await response.json();
                setRecommendations(result);
            }
        } catch (error) {
            console.error('Error uploading foot scan:', error);
            setErrorMessage('An error occurred while uploading the image.');
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

            {imageUrl && (
                <div>
                    <h3>Uploaded Foot Scan:</h3>
                    <img src={imageUrl} alt="Uploaded Foot Scan" style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} />
                </div>
            )}

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

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
