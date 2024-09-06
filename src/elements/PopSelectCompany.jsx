import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import { EmotionPopupanimationKeyframesE } from '../styles';
import { companyStore, localStorageStore } from '../mobx/store';
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
  console.log(companyList);
  const navigate = useNavigate();

  const companyIdTocalStorage = (id, user_id) => {
    companyStore.setCompanies(companyList.companys)
    companyStore.setActiveCompanyId(id)
    companyStore.setUid(user_id)
    if (Object.keys(localStorageStore.idFacNam2).length === 0) {
      localStorageStore.setIdFacNam2(0, "First", 'chat')

    }
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

          {companyList.companys.length > 0 &&

            companyList.companys[0].company_id ?

            (companyList.companys.map((a) => (
              <div key={a.company_id}>

                <button onClick={() => companyIdTocalStorage(a.company_id, companyList.user_id)}>{a.company_name}</button>
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
