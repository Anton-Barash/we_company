import { MDBIcon } from 'mdb-react-ui-kit';
import $api from '../http';
import { useEffect, useState } from 'react';

const FileUpload = ({ dialog_id, setProgress }) => {
  const [files, setFiles] = useState([]); // Состояние для хранения выбранных файлов

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files); // Получаем выбранные файлы
    if (selectedFiles.length === 0) return; // Проверяем, что файлы выбраны

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // Добавляем файлы в массив файлов
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file); // Добавляем файл в FormData
    formData.append('dialog_id', dialog_id);
    formData.append('company_id', localStorage.getItem('cId'));

    $api.post('/api/fileUpload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log('Upload progress:', percentCompleted + '%');
        setProgress(percentCompleted + '%');
      },
    })
      .then((response) => {
        console.log('File uploaded successfully:', response.data);

        if (files.length > 1) {
          setFiles((prevFiles) => prevFiles.slice(1)); // Удаляем первый элемент массива
        }
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  // Обработчик для начала загрузки файлов в очереди
  useEffect(() => {
    if (files.length > 0) {
      uploadFile(files[0]); // Загружаем первый файл
    }
  }, [files]);

  return (
    <div>
      <label htmlFor={dialog_id} style={{ cursor: 'pointer' }}>
        <MDBIcon size='2x' fas icon="paperclip" />
      </label>
      <input
        type="file"
        id={dialog_id}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple={true}
      />
    </div>
  );
};

export default FileUpload;
