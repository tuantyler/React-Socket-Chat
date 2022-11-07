import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactContext = React.createContext()
export function useContactContext(){
    return React.useContext(ContactContext)
}

export function ContactProvider({children}) {
    const [contacts, setContacts] = useLocalStorage("contacts" , [])
    function addContact(userID, userName) {
        setContacts(c => [...c , {userID, userName}])
    }
    return (
        <ContactContext.Provider value={{contacts, addContact}}>
            {children}
        </ContactContext.Provider>
    )
}
