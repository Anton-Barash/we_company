import React, { useState } from 'react';
import { myStore } from '../mobx/store';
import { observer } from "mobx-react"

import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';

const Chat = () => {



    const a = [{ "000": { name: "изделие", factory: "выберите" } }]

    const [verticalActive, setVerticalActive] = useState(
        Object.keys(myStore.idFacNam[0])[0]
    );

    const handleVerticalClick = (value) => {
        if (value === verticalActive) {
            return;
        }

        setVerticalActive(value);
    };


    const ChatList = () => {
        return myStore.idFacNam.map((obj) => {
            return (

                <MDBTabsItem key={Object.keys(obj)[0]}>
                    <MDBTabsLink onClick={() => handleVerticalClick(Object.keys(obj)[0])} active={verticalActive === Object.keys(obj)[0]}>
                        <div                    >
                            {Object.values(obj)[0].factory}{Object.values(obj)[0].name}

                        </div>
                    </MDBTabsLink>

                </MDBTabsItem>
            );
        });
    };

    return (
        <>
            <MDBRow>
                <MDBCol size='3'>
                    <MDBTabs pills className='flex-column text-center'>
                        <ChatList></ChatList>
                    </MDBTabs>
                </MDBCol>
                <MDBCol size='9'>
                    <MDBTabsContent>
                        <MDBTabsPane open={verticalActive === 'tab1'}>Home content</MDBTabsPane>
                        <MDBTabsPane open={verticalActive === 'tab2'}>Profile content</MDBTabsPane>
                        <MDBTabsPane open={verticalActive === 'tab3'}>Messages content</MDBTabsPane>
                    </MDBTabsContent>
                </MDBCol>
            </MDBRow>
        </>
    );
}

export default observer(Chat)