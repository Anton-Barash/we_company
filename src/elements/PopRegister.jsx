
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import { EmotionLoginPageInput, EmotionLoginPageWrapper } from '../styles';
import $api from '../http';



const customStyles = {
  overlay: {
    zIndex: 1,
    backdropFilter: 'blur(10px)',
    backgroundColor: '',
  },
  content: {
    height: "fit-content",
    padding: '3rem',
    backgroundColor: '#3b71ca',
    borderRadius: '1.375rem',
    maxWidth: "50%",
    minWidth: "500px",
    margin: "auto",


  },
};




Modal.setAppElement('#root');





const PopRegister = ({ modalIsOpen, setModalIsOpen }) => {

  const [code, setCode] = useState('')
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const inputValue = form.querySelector('input').value;



    $api.put('/register', {
      code: inputValue
    })
      .then(resp => {
        console.log('object');

      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          // Обработка ошибки с кодом 400
          alert(error.response.data.error);
        } else {
          // Обработка других ошибок
          console.log('Произошла ошибка:', error.message);
        }
      });
  }



  return (
    < >
      {/* <button onClick={() => setModalIsOpen(true)}>Открыть модальное окно</button> */}
      <Modal

        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Ввожу проверочный код"
      >

        <form className={EmotionLoginPageWrapper} onSubmit={handleSubmit}>
          <input style={{ color: 'black' }} className={EmotionLoginPageInput} type="text" name="text" placeholder="code" />

          <p> <button type='submit' className={EmotionLoginPageInput}>создать</button> </p>
        </form>
        <button className={EmotionLoginPageInput} onClick={() => setModalIsOpen(false)}>Закрыть</button>
      </Modal>
    </>
  );
};

export default PopRegister;
