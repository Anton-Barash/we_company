import { myStore } from '../mobx/store';
import { observer } from "mobx-react"
import { action } from "mobx";
import {
    MDBTabsContent,
    MDBCol,
    MDBTabsPane
} from 'mdb-react-ui-kit';
import ChatListBox from './ChatListBox';
import { tabsLink } from '../styles';
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
        return (
            myStore.idFacNam.map((obj) => (
                <div key={Object.keys(obj)[0]}
                    className={tabsLink(myStore.verticalActive.get() === Object.keys(obj)[0])}
                    onClick={() => handleVerticalClick(Object.keys(obj)[0])} >
                    <h3 style={{ marginBottom: '0px', marginRight: '5px' }}>
                        {Object.values(obj)[0].factory}
                    </h3>
                    <h5 style={{ color: "darkgray", textAlign: 'end' }}>
                        {Object.values(obj)[0].name}
                    </h5>
                </div>
            ))
        );
    });

    const Chats = observer(() => {
        return myStore.idFacNam.map((obj) => {
            return (
                <MDBTabsPane style={{ height: "100%" }} key={Object.keys(obj)[0] + "MDBTabsPane"}
                    open={Object.keys(obj)[0] === verticalActive.get()}
                >
                    <ChatListBox key={Object.keys(obj)[0] + "ChatListBox"}
                        dialog_id={Object.keys(obj)[0]} show={Object.keys(obj)[0] === verticalActive.get()}></ChatListBox>
                </MDBTabsPane>

            )
        })
    })

    return (
        <>
            <div style={{ height: '100%', display: 'flex' }}>
                <MDBCol style={{ overflow: 'auto', height: '100%', overflowX: 'hidden', padding: "1rem 0.5rem 5rem 1rem" }} size='3'>
                    <ChatList></ChatList>

                </MDBCol>
                <MDBCol style={{ height: "100%" }} size='9'>
                    <MDBTabsContent id='444' style={{ height: "100%" }}>
                        <Chats></Chats>
                    </MDBTabsContent>
                </MDBCol>
            </div>
        </>
    );
})

export default Chat
