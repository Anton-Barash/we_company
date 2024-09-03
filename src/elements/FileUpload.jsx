import { MDBIcon } from 'mdb-react-ui-kit';
import $api from '../http';
import { useEffect, useState, useRef } from 'react'; // Добавляем useRef
import PropTypes from 'prop-types';





const FileUpload = ({ disabled, dialog_id, setProgress }) => {
  const [files, setFiles] = useState([]); // Состояние для хранения выбранных файлов
  const [percentCompleted, setPercentCompleted] = useState(0)
  const uploading = useRef(false); // Используем useRef для отслеживания статуса загрузки
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files); // Получаем выбранные файлы
    if (selectedFiles.length === 0)
      return; // Проверяем, что файлы выбраны

    setFiles((prevFiles) => [
      ...prevFiles,
      ...selectedFiles
    ]); // Добавляем файлы в массив файлов
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file); // Добавляем файл в FormData
    formData.append('dialog_id', dialog_id);
    formData.append('company_id', localStorage.getItem('cId'));

    $api.post('/api/fileUpload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log('Upload progress:', percentCompleted + '%');
        setPercentCompleted(percentCompleted)
      }
    }).then((response) => {
      console.log('File uploaded successfully:', response.data);
      setPercentCompleted(0)
      uploading.current = false; // Сбрасываем статус загрузки в false
      if (files.length > 0) {
        setFiles(prevFiles => prevFiles.slice(1));

      } else {
        uploading.current = false; // Устанавливаем статус загрузки в false
      }
    }).catch((error) => {
      console.error('Error uploading file:', error);
    });
  };

  useEffect(() => {
    setProgress({ files, percentCompleted })

  }, [files, percentCompleted])

  // Обработчик для начала загрузки файлов в очереди
  useEffect(() => {
    console.log(files, !uploading.current)

    if (files.length > 0 && !uploading.current) { // Проверяем, что файлы есть и нет активной загрузки
      uploading.current = true; // Устанавливаем статус загрузки в true
      uploadFile(files[0]); // Загружаем первый файл
    }
  }, [files]);

  return (

    disabled ? <div>
      <label htmlFor={dialog_id} style={{
        cursor: 'pointer'
      }}>
        <MDBIcon size='2x' fas icon="paperclip" />
      </label>
      <input
        type="file"
        id={dialog_id}
        style={{
          display: 'none'
        }}
        onChange={handleFileChange}
        multiple={true} />
    </div> : <></>

  );
};


FileUpload.propTypes = {
  disabled: PropTypes.bool,
  dialog_id: PropTypes.number,
  setProgress: PropTypes.func

}

export default FileUpload
