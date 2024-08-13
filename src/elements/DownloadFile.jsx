import axios from 'axios';
import React, { useState } from 'react';

const DownloadFile = () => {
    const [newFileName, setNewFileName] = useState('newFileName.jpg');

    const downloadFile = async () => {
        try {
            const u = 'http://ew-ks3-buket.ks3-sgp.ksyuncs.com/1/61/597?KSSAccessKeyId=AKLT6XM36m9LTh2SVvGIZDDS&Expires=1723515051&Signature=HaqQhSl3%2F9NXicl7Ctjf2wknFKA%3D';
            // const response = await axios.post('http://localhost:3000/download/', { u }, { responseType: 'blob' });
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
