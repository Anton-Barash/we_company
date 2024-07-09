import { useState } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import Serch from './Serch';
import Chat from './Chat';

export default function EasyWork() {
  const [fillActive, setFillActive] = useState('tab1');

  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };

  return (
    <>
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
          <Serch setFillActive={setFillActive} ></Serch>
        </MDBTabsPane>
        <MDBTabsPane style={{ height: 'calc(100vh - 80px)' }} open={fillActive === 'tab2'}>
          <Chat ></Chat>
        </MDBTabsPane>
        <MDBTabsPane style={{ height: 'calc(100vh - 80px)' }} open={fillActive === 'tab3'}>Tab 3 content</MDBTabsPane>
      </MDBTabsContent>
    </>
  );
}