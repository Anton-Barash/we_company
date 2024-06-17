
import React from 'react';
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";



const customStyles = {
  overlay: {
    zIndex: 1 // Установите нужное значение z-index
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};




Modal.setAppElement('#root');

const PopSelectCompany = ({ modalIsOpen, setModalIsOpen, conpanyList }) => {
  const navigate = useNavigate();

  const companyIdTocalStorage = (id,user_id) => {
    localStorage.setItem('cId', id)
    localStorage.setItem('uId', user_id)
    setModalIsOpen(false)
    navigate("/EasyWork");
  }

  return (
    <div>
      {/* <button onClick={() => setModalIsOpen(true)}>Открыть модальное окно</button> */}
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Пример модального окна"
      >
        <h2>Мои компании</h2>
        <p>Выбрать компанию:</p>
        <div>

          {conpanyList.length && conpanyList.map(
            (a) => {
              return (
                <button onClick={() => companyIdTocalStorage(a.company_id, a.user_id)} > {a.company_name} </button>
              )
            })}

          <p> <button>создать</button> </p>
        </div>
        {/* <button onClick={() => setModalIsOpen(false)}>Закрыть</button> */}
      </Modal>
    </div>
  );
};

export default PopSelectCompany;
