import { useState, useCallback, useEffect } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import Serch from './Serch';
import Chat from './Chat';
import socket from "../http/socet"
import { companyStore, messageStore } from '../mobx/store';


//  тут нужно создать сокет для этой компании.


export default function EasyWork() {





  const [fillActive, setFillActive] = useState('tab1');

  useEffect(() => {
    console.log('easy work, создаем сокет для компании.');
    const handleSocketMessage = (data) => {
      console.log("сокет сработал");
      // Обработка нового сообщения
      console.log(data);
      messageStore.addMessage(data.dialog_id, data.newMessage);
    };

    // Проверка наличия компаний
    if (companyStore.companies.length) {
      // Устанавливаем обработчики для каждой компании
      companyStore.companies.forEach((company) => {
        const eventName = `${company.company_name}${company.company_id}`;
        socket.on(eventName, handleSocketMessage);
      });
    }

    // Функция очистки для удаления обработчиков
    return () => {
      console.log("закрыть сокет");
      if (companyStore.companies.length) {
        companyStore.companies.forEach((company) => {
          const eventName = `${company.company_name}${company.company_id}`;
          socket.off(eventName, handleSocketMessage);
        });
      }
    };
  }, []); // Убедитесь, что массив зависимостей правильный


  const handleFillClick = useCallback((value) => {
    if (value === fillActive) {
      return;
    }
    setFillActive(value);
  }, [fillActive]);

  return (
    <div style={{ maxWidth: '1200px' }}>
      <MDBTabs fill className='mb-3'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleFillClick('tab1')} active={fillActive === 'tab1'}>
            Поиск
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleFillClick('tab2')} active={fillActive === 'tab2'}>
            Чаты
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink style={{ textTransform: 'none' }} onClick={() => handleFillClick('tab3')} active={fillActive === 'tab3'}>
            User
            <div >Company</div>
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane style={{ height: 'calc(100vh - 80px)' }} open={fillActive === 'tab1'}>
          <Serch setFillActive={setFillActive} />
        </MDBTabsPane>
        <MDBTabsPane style={{ height: 'calc(100vh - 80px)' }} open={fillActive === 'tab2'}>
          <Chat />
        </MDBTabsPane>
        <MDBTabsPane style={{ height: 'calc(100vh - 80px)' }} open={fillActive === 'tab3'}>
          <div>
            ddsf
          </div>
        </MDBTabsPane>
      </MDBTabsContent>
    </div>
  );
}
