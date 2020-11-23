import React from 'react'
import './MediaCard.css'
import {ThemeContext} from '../../App'
import Grid from '@material-ui/core/Grid';
const MediaCard=(props)=>{

    let imageInitialLink='https://image.tmdb.org/t/p/w500'
    let trending
    console.log(props.data)
    if(props.data){

         trending=props.data.map((elem,i)=>{

                 return(
                    <Grid item sm={6} md={2} lg={2} key={i} className='centerMediaCard'>
                     <div className='card' style={{backgroundImage:`url(${imageInitialLink}${elem.poster_path})`}}>
                    <div className='description'>
                 <h4>{elem.title? elem.title:elem.name}</h4>
                 <p className='avg'>{elem.vote_average}</p>
                 <p className='text-control'>{elem.overview}</p>
                    </div>
                </div>
                    </Grid>
            )
        })
    }
    return(
        <div className='titleLineContainer'>
            <h1>{props.title}</h1>
        <div className='mediaCard'>
              <Grid container spacing={0} justify='center'>
            {trending? trending:null}
                   </Grid>
        </div>
        </div>
    )
}

export default MediaCard