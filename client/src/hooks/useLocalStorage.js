import { useState, useEffect } from 'react'

function accessLocalStorage(key , initialValue){
    const data = localStorage.getItem(key)
    if (data !== undefined && data !== null) {
        return JSON.parse(data)
    }
    if (typeof initialValue === Function) {
        return initialValue()
    }
    return initialValue
}

export default function useLocalStorage(key , initialValue) {
    const [value, setValue] = useState(() => {
        return accessLocalStorage(key , initialValue)
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    return [value, setValue]
}
