import $api from '../http';

const FileUpload = () => {
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Получаем выбранный файл
    if (!file) return; // Проверяем, что файл выбран

    const formData = new FormData();
    formData.append('file', file); // Добавляем файл в FormData

    $api.post('/fileUpload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        // Обработка успешного ответа от сервера
        console.log('File uploaded successfully:', response.data);
      })
      .catch(error => {
        // Обработка ошибки
        console.error('Error uploading file:', error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;