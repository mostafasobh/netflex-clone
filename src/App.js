import React from 'react'
import axios from 'axios'
import './App.css';
import Navbar from './Components/Navbar/Navbar'
import Button from '@material-ui/core/Button';
import MediaCard from './Components/mediaCard/MediaCard'
// import {connect} from 'react-redux'

//helper functions section
import { randomSelect } from './utils/utils'


export const ThemeContext = React.createContext('context is working')
// <ThemeContext.Provider value='hi iam context provider'>
// </ThemeContext.Provider>
function App(props) {
  let [reqData, setData] = React.useState(null)
  let [trendingList, setTrendingList] = React.useState(null)
  let [topTvPicks, setTopTvPicks] = React.useState(null)
  let [topMovies, setTopMovies] = React.useState(null)
  let key = '686f3b54e377c347e4011e136a5b959f'
  let imageInitialLink = 'https://image.tmdb.org/t/p/original'
  let mediaInfoElements;

  React.useEffect(() => {
    //get background img url
    axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}`).then(response => {

      // filter the results to the first 5 only
      let results = []
      for (let i = 0; i < 5; i++) {
        results[i] = response.data.results[i]
      }
      setTrendingList({ trending: results })
      let detailsRequest = response.data.results[randomSelect(response.data.results)]
      if (detailsRequest) {
        setData({
          imgURL: `${imageInitialLink}${detailsRequest.backdrop_path}`,
          title: detailsRequest.original_title,
          overview: detailsRequest.overview,
          name: detailsRequest.name
        })
      }
    })
    axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=1`).then(res => {
      let results = []
      for (let i = 0; i < 5; i++) {
        results[i] = res.data.results[i]
      }
      setTopTvPicks({ tv: results })
    })
    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`).then(res => {
      let results = []
      for (let i = 0; i < 5; i++) {
        results[i] = res.data.results[i]
      }
      setTopMovies({ movies: results })
    })
  }, [])

  if (reqData) {
    mediaInfoElements = (
      <>
        <h1>{reqData.title ? reqData.title : reqData.name}</h1>
        <p className='mobile-text-control'>{reqData.overview}</p>
      </>
    )
  }
  return (
    <div>
      <div className="App" style={reqData ? { backgroundImage: `url(${reqData.imgURL})` } : {}}>
        <Navbar />
        <div className='headlineShow'>
          <div className='headlineShowContent'>
            {mediaInfoElements}
            <Button variant='contained'>Watch Now</Button>
            <Button variant='outlined' color='secondary'>my list</Button>
          </div>
        </div>
      </div>
      <ThemeContext.Provider value={trendingList}>
        {trendingList ? <MediaCard data={trendingList.trending} title='Trending now' /> : null}
        {topTvPicks ? <MediaCard data={topTvPicks.tv} title='Top TV picks for Jack' /> : null}
        {topMovies ? <MediaCard data={topMovies.movies} title='Top Rated Movies' /> : null}
      </ThemeContext.Provider>
    </div>
  );
}


// const mapStateToProps=state=>{
//   return{
//     ctr:state.count
//   }
// }

// const mapDispatchToPrps= dispatch=>{
//   return{
//     onIncrement:()=>dispatch({type:'increment'})
//   }
// }
export default App;
