import './App.css'

import { createContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import MovieList from './components/MovieList/MovieList'

export const DataContext = createContext()

const App = () => {
  // TO-DO: remove this
  console.clear()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    languageList: [],
    moviesData: [],
  })

  // TO-DO: remove this
  console.log(data)

  useEffect(() => {
    // GET languageList and moviesData
    fetch('https://in.bmscdn.com/m6/static/interview-mock/data.json', { method: 'GET' })
      .then(response => response.json())
      .then(d => {
        // process movies data
        const movieList = []
        for (let key in d.moviesData) {
          if (d.moviesData.hasOwnProperty(key)) {
            movieList.push({ ...d.moviesData[key], Type: 'MOVIE' })
          }
        }
        setData({
          languageList: d.languageList.map(o => { return { text: o, isSelected: false } }),
          moviesData: movieList,
        });
        setLoading(false)
      })
  }, [])

  const getViewWidth = () => {
    return window.innerWidth;
  }

  const getCardWidth = () => {
    const e = document.getElementById("0");
    const style = window.getComputedStyle(e);
    const cw =
      e.offsetWidth +
      parseFloat(style.marginLeft) +
      parseFloat(style.marginRight);

    return cw;
  }

  const renderMovieInfo = (movie, number) => {
    const itemsInARow = Math.floor(getViewWidth() / getCardWidth())
    const rowNumber = Math.ceil(number / itemsInARow)

    data.moviesData.splice((itemsInARow * rowNumber), 0, {
      EventCode: `${movie.EventCode}_info`,
      EventName: movie.EventName,
      Type: 'INFO'
    })

    setData({ ...data })
  }

  return (
    <>
      {
        loading ?
          <p>Loading . . .</p>
          :
          <DataContext.Provider value={data}>
            <div className="container-main">
              <Navbar />

              <div className="wrapper-content">
                <MovieList movies={data.moviesData} onMovieSelect={renderMovieInfo} />
              </div>
            </div>
          </DataContext.Provider>
      }
    </>
  )
}

export default App
