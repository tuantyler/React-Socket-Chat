import React, {useState, useEffect,useRef} from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { SketchPicker  } from 'react-color';
import useLocalStorage from '../hooks/useLocalStorage';

const SETPRIMARYKEY = "--primarycolor"
const SETSECONDARYKEY = "--secondarycolor"
const SETSUCCESSKEY = "--successcolor"
const SETBGKEY = "--bgcolor"

export default function CustomizeSidebar()  {
    const firstUpdate = useRef(true);
    var r = document.querySelector(':root')
    var rs = getComputedStyle(r)
    const [customize, setCustomize] = useLocalStorage("customize" , {})
    const [color, setColor] = useState();
    const [colorKey , setColorKey] = useState(SETPRIMARYKEY)
    useEffect(() => {
        setColor(rs.getPropertyValue(colorKey))
    }, [colorKey,rs])
    
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false
        }
        else {
            r.style.setProperty(colorKey, customize[colorKey])
        }
    }, [customize,colorKey,r.style]);

    return (
        <>
           <ListGroup>
                <ListGroup.Item className="header">
                    Customize For Yeet
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button variant='primary' className="w-100" onClick={() => setColorKey(SETPRIMARYKEY)}>Set Primary Color</Button>   
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button variant='success' className="w-100" onClick={() => setColorKey(SETSUCCESSKEY)}>Set Success Color</Button>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button variant='secondary' className="w-100" onClick={() => setColorKey(SETSECONDARYKEY)}>Set Secondary Color</Button>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button variant='light' className="w-100" onClick={() => setColorKey(SETBGKEY)}>Set BG Color</Button>
                </ListGroup.Item>
                <ListGroup.Item>
                    Curr Set: {colorKey}
                </ListGroup.Item>
                <div
                    style={{
                        backgroundColor: color,
                        height: "50px",
                        transition: "ease all 500ms"
                    }}
                />
                <SketchPicker 
                    color={color}
                    onChangeComplete={color => {
                        setColor(color.hex);
                        let colorObj = {}
                        colorObj[colorKey] = color.hex
                        setCustomize({...customize, ...colorObj})
                    }}
                    width="93%"
                />
                <ListGroup.Item>
                    <Button variant='warning' onClick={() => {
                        setCustomize({})
                        window.location.reload()
                    }}>Reset All</Button>
                </ListGroup.Item>
            </ListGroup>
        </>
    )
}
