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
import ChatListBox from './ChatListBox';
import { tabsLink } from '../styles';

const Chat = () => {





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


                <div key={Object.keys(obj)[0]}
                    className={tabsLink(verticalActive === Object.keys(obj)[0])}
                    onClick={() => handleVerticalClick(Object.keys(obj)[0])} >

                    <h3 style={{ marginBottom: '0px', marginRight: '5px' }}>
                        {Object.values(obj)[0].factory}
                    </h3>
                    <h5 style={{ color: "darkgray", textAlign: 'end' }}>
                        {Object.values(obj)[0].name}
                    </h5>
                </div>


            );
        });
    };

    return (
        <>
            <MDBRow style={{ height: '100%', overflow: 'hidden' }}>
                <MDBCol style={{ overflow: 'auto', height: '100%', overflowX: 'hidden', padding: "1rem 0.5rem 5rem 1rem" }} size='3'>
                    <ChatList></ChatList>

                </MDBCol>
                <MDBCol style={{ height: "100%" }} size='9'>
                    <MDBTabsContent style={{ height: "100%" }}>
                        <ChatListBox dialog_id={verticalActive} ></ChatListBox>
                    </MDBTabsContent>
                </MDBCol>
            </MDBRow>
        </>
    );
}

export default observer(Chat)