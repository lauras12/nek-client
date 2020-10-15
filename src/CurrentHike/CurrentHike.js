import React from 'react';
import HikeContext from '../Context';

export default function CurrentHike() {
   
    return (
        <HikeContext.Consumer>
            {(value) => {
                if(`${value.currentHike.name}` === null) {
                    return (
                        <div>PLEASE PICK A HIKE FIRST</div>
                    )
                    
                } else {
                    return(
                        <div>
                            <h2>Current Hike: {`${value.currentHike.name}`}</h2>
                        </div>
                    )
                }
                
            }}    
               
                
        
    
               </HikeContext.Consumer>
    )
}