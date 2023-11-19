import './App.css'

import { createContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'

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
        // create an array for language list to handle
        setData({
          languageList: d.languageList.map(o => { return { text: o, isSelected: false } }),
          moviesData: d.moviesData
        });
        setLoading(false)
      })
  }, [])

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
                {/* movies, trailer and info */}
              </div>
            </div>
          </DataContext.Provider>
      }
    </>
  )
}

export default App
