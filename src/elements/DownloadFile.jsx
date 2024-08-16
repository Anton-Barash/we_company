import axios from 'axios';
import React, { useState } from 'react';

const DownloadFile = () => {
    const [newFileName, setNewFileName] = useState('newFileName.jpg');

    const downloadFile = async () => {
        try {
            const response = fetch('http://localhost:3000/download/')
            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = newFileName;
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Ошибка при скачивании файла:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
            />
            <button onClick={downloadFile}>Скачать файл</button>
        </div>
    );
};

export default DownloadFile;
