import React, { useState } from 'react';

const DownloadFile = () => {
    const [newFileName, setNewFileName] = useState('newFileName');

    const downloadFile = async () => {
        try {
            const response = await fetch('http://localhost:3000/download/' + newFileName);
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(new Blob([blob]));
                const a = document.createElement('a');
                a.href = url;
                a.download = newFileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            } else {
                console.error('Ошибка при скачивании файла');
            }
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
