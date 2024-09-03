import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import { EmotionPopupanimationKeyframesE } from '../styles';
import { companyStore } from '../mobx/store';
import PropTypes from 'prop-types';



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
    animation: `${EmotionPopupanimationKeyframesE} .2s forwards`
  },
};




Modal.setAppElement('#root');

const PopSelectCompany = ({ modalIsOpen, setModalIsOpen, companyList }) => {
  const navigate = useNavigate();

  const companyIdTocalStorage = (id, user_id) => {
    // localStorage.setItem('cId', id)
    // localStorage.setItem('uId', user_id)
    companyStore.setCompanies(companyList)
    companyStore.setActiveCompanyId(id)
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

        <div>

          {companyList.length > 0 &&

            companyList[0].company_id ?

            (companyList.map((a) => (
              <div key={a.company_id}>

                <button onClick={() => companyIdTocalStorage(a.company_id, a.user_id)}>{a.company_name}</button>
              </div>))) :
            <p>-- Мне нужно создать свою первую компанию или присоединиться к существующей.</p>

          }



          <p> <button onClick={() => navigate('/CreatNewCompany')}>создать</button> </p>
        </div>
        {/* <button onClick={() => setModalIsOpen(false)}>Закрыть</button> */}
      </Modal>
    </div>
  );
};

PopSelectCompany.propTypes = {
  companyList: PropTypes.array,
  modalIsOpen: PropTypes.bool,
  setModalIsOpen: PropTypes.func,
}

export default PopSelectCompany;
