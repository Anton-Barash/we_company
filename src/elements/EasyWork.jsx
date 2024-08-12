import React, { useState, useCallback } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import Serch from './Serch';
import Chat from './Chat';
import FileUpload from './FileUpload';
import DownloadFile from './DownloadFile';

export default function EasyWork() {
  console.log('easy work');
  const [fillActive, setFillActive] = useState('tab1');

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
          <DownloadFile></DownloadFile>
        </MDBTabsPane>
      </MDBTabsContent>
    </div>
  );
}
