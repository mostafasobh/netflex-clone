import React from 'react'
import classes from  './Button.module.css'
const Button =(props)=>{


    return(
        <button className={classes.navBtn}>
            {props.btnName}
        </button>
    )
}


export default Button