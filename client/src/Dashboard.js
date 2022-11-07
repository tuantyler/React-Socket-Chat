
import {useState} from 'react'
import ContactsSidebar from './chatsidebar/ContactsSidebar'
import ConversationsSidebar from './chatsidebar/ConversationsSidebar'
import CustomizeSidebar from './chatsidebar/CustomizeSidebar'
import PublicChatsSidebar from './chatsidebar/PublicChatsSidebar'
import { useConversationsContext } from './contexts/ConversationsProvider'
import IGaveUp from './chatsidebar/IGaveUp'
import OpenConversation from './OpenConversation'

const PUBLIC_CHATS_KEY = "Public Chats"
const CONVERSATIONS_KEY = "Conversations"
const CONTACTS_KEY = "Contacts"
const CUSTOMIZE_KEY = "Customize Sidebar"
const ABOUT_KEY = "About"

export default function Dashboard({ loginID }) {
    const [selectedTabKey , setSelectedTabKey] = useState(PUBLIC_CHATS_KEY)
    const [modalOpenState , setModalOpenState] = useState(false)
    const { setSelectedConversationIndex,setCurrChatName } = useConversationsContext()
    return (     
        <>
            <div className="menusidebar position-fixed h-100 d-flex flex-column align-items-center">
                <div className={selectedTabKey === PUBLIC_CHATS_KEY ? "menusidebar_item active" : "menusidebar_item"} onClick={() => (setSelectedTabKey(PUBLIC_CHATS_KEY) , setSelectedConversationIndex(-1) , setCurrChatName("Public Chats"))}><i className="fa fa-list-alt"></i></div>
                <div className={selectedTabKey === CONTACTS_KEY ? "menusidebar_item active" : "menusidebar_item"} onClick={() => setSelectedTabKey(CONTACTS_KEY)}><i className="fa fa-address-book"></i></div>
                <div className={selectedTabKey === CONVERSATIONS_KEY ? "menusidebar_item active" : "menusidebar_item"} onClick={() => setSelectedTabKey(CONVERSATIONS_KEY)}><i className="fa fa-comments"></i></div>
                <div className={selectedTabKey === CUSTOMIZE_KEY ? "menusidebar_item active" : "menusidebar_item"} onClick={() => setSelectedTabKey(CUSTOMIZE_KEY)}><i className="fa fa-paint-brush"></i></div>
                <div className={selectedTabKey === ABOUT_KEY ? "menusidebar_item active" : "menusidebar_item"} onClick={() => setSelectedTabKey(ABOUT_KEY)}><i className="fa fa-question-circle"></i></div>
                <div className="menusidebar_item" onClick={() => (localStorage.clear() , window.location.reload())}><i className="fa fa-sign-out"></i></div>
            </div>
            <div className="chatsidebar position-fixed h-100 d-flex flex-column overflow-auto">
                {selectedTabKey === PUBLIC_CHATS_KEY && <PublicChatsSidebar/>}
                {selectedTabKey === CONVERSATIONS_KEY && <ConversationsSidebar modalOpenState={modalOpenState} setModalOpenState={setModalOpenState} loginID={loginID}/>}
                {selectedTabKey === CONTACTS_KEY && <ContactsSidebar modalOpenState={modalOpenState} setModalOpenState={setModalOpenState}/>}
                {selectedTabKey === CUSTOMIZE_KEY && <CustomizeSidebar/>}
                {selectedTabKey === ABOUT_KEY && <IGaveUp/>}
                <div className="userCred d-flex align-items-center">
                    {loginID}
                </div>
            </div>
            <div className="chat_section">
                <div className="container-fluid d-flex flex-column vh-100">
                    <OpenConversation loginID={loginID} selectedTabKey={selectedTabKey}/>     
                </div>
            </div>
        </>
    )
}
