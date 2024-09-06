import { companyStore, localStorageStore, myStore } from '../mobx/store';
import { observer } from "mobx-react"
import { action } from "mobx";
import {
    MDBTabsContent,
    MDBCol,
    MDBTabsPane
} from 'mdb-react-ui-kit';
import ChatListBox from './ChatListBox';
import { EmotionChatListBox, EmotionTabsLink } from '../styles';
const Chat = observer(() => {

    const verticalActive = myStore.verticalActive

    const handleVerticalClick = (value) => {
        console.log('click');
        if (value === verticalActive.get()) {
            console.log("object");
            return;
        }
        console.log(value);
        action(() => verticalActive.set(value))()
    };

    const ChatList = observer(() => {
        const cId = companyStore.activeCompanyId

        return (
            localStorageStore.idFacNam2[cId].map((obj) => (
                <div key={Object.keys(obj)[0]}
                    className={EmotionTabsLink(myStore.verticalActive.get() === Object.keys(obj)[0])}
                    onClick={() => handleVerticalClick(Object.keys(obj)[0])} >
                    <h5 style={{ marginBottom: '0px', marginRight: '5px' }}>
                        {Object.values(obj)[0].factory}
                    </h5>
                    <div style={{ color: "darkgray", textAlign: 'end' }}>
                        {Object.values(obj)[0].name}
                    </div>
                </div>
            ))
        );
    });

    const Chats = observer(() => {
        const cId = companyStore.activeCompanyId
        return localStorageStore.idFacNam2[cId].map((obj) => {
            return (
                <MDBTabsPane style={{ height: "100%" }} key={Object.keys(obj)[0] + "MDBTabsPane"}
                    open={Object.keys(obj)[0] === verticalActive.get()}                >
                    <ChatListBox key={Object.keys(obj)[0] + "ChatListBox"}
                        dialog_id={Object.keys(obj)[0]} show={Object.keys(obj)[0] === verticalActive.get()}></ChatListBox>
                </MDBTabsPane>

            )
        })
    })

    return (
        <>
            <div style={{ height: '100%', display: 'flex' }}>
                <MDBCol className={EmotionChatListBox} size='3'>
                    <ChatList></ChatList>

                </MDBCol>
                <MDBCol size='9'>
                    <MDBTabsContent id='444' style={{ height: "100%", paddingLeft: '2px' }}>
                        <Chats></Chats>
                    </MDBTabsContent>
                </MDBCol>
            </div>
        </>
    );
})

export default Chat
