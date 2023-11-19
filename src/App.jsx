import './App.css'
import CloseIcon from './assets/close.png'

import { createContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import MovieList from './components/MovieList/MovieList'

export const DataContext = createContext()

const App = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    languageList: [],
    moviesData: [],
    filteredMoviesData: [],
  })
  const [filters, setFilters] = useState([
    { type: 'DATE', values: [] },
    { type: 'OTHER', values: [] },
    { type: 'LANG', values: [] },
    { type: 'GENRE', values: [] },
  ])

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
          filteredMoviesData: movieList,
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

    // for a given row, do not add if it is already added
    if (data.moviesData[(itemsInARow * rowNumber)]?.Type !== 'INFO') {
      data.moviesData.splice((itemsInARow * rowNumber), 0, {
        EventCode: `${movie.EventCode}_info`,
        EventName: movie.EventName,
        Type: 'INFO'
      })
    }

    setData({ ...data })
  }

  const handleDeleteFilter = (name) => {
    setData(prevData => {
      const updatedLanguageList = prevData.languageList.map(lang =>
        lang.text === name ? { ...lang, isSelected: false } : lang
      )
      return { ...prevData, languageList: updatedLanguageList }
    })

    setFilters(prevFilters => {
      // find the filter by type ('LANG' for language drop-down)
      const indexOfFilter = prevFilters.findIndex(f => f.type === 'LANG');
      const updatedFilters = [...prevFilters];

      // if it is checked, update the selected value for the type picked above
      // else, locate the selected value and remove it
      const indexOfValue = updatedFilters[indexOfFilter].values.findIndex(v => v === name);
      if (indexOfValue !== -1) {
        updatedFilters[indexOfFilter].values = [
          ...updatedFilters[indexOfFilter].values.slice(0, indexOfValue),
          ...updatedFilters[indexOfFilter].values.slice(indexOfValue + 1),
        ];
      }

      return updatedFilters;
    })
  }

  return (
    <>
      {
        loading ?
          <p>Loading . . .</p>
          :
          <DataContext.Provider value={{ data, setData, filters, setFilters }}>
            <div className="container-main">
              <Navbar />

              <div className="wrapper-content">
                <div className="show-filters">
                  <p>Applied Filters: </p>
                  {
                    filters.map(filter => {
                      return filter && filter.type === 'LANG' &&
                        filter.values?.map(
                          value =>
                            <div key={value} className='filter-item' onClick={() => handleDeleteFilter(value)}>
                              {value}
                              <img src={CloseIcon} className='img-close' />
                            </div>
                        )
                    })
                  }
                </div>
                <MovieList movies={data.filteredMoviesData} onMovieSelect={renderMovieInfo} />
              </div>
            </div>
          </DataContext.Provider>
      }
    </>
  )
}

export default App
