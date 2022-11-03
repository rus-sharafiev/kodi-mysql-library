import './CSS/cpi.css';
import React, { useEffect, useState } from 'react';

export default CircularProgressIndicator = (props) => {
    let container, color, timeout;
    const [opacity, setOpacity] = useState({opacity: '0'});

    props.container ? container = props.container : container = '';
    props.color ? color = props.color : color = '';
    props.timeout ? timeout = props.timeout : null;
    
    useEffect(() => {
        if (timeout) {
            setTimeout(() => {
                setOpacity({opacity: '1'})
            }, timeout);
        } else {
            setOpacity({opacity: '1'})
        }
    }, []);


    return(
        <div className={container} style={opacity}> 
            <svg xmlns="http://www.w3.org/2000/svg" className='circular-progress-indicator' width='48px' height='48px'>
                <circle stroke={color} fill='none' strokeWidth='4px' cx='24' cy='24' r='18'/>
            </svg>
        </div>
    )
}