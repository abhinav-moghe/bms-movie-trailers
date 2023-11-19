import MovieInfo from '../MovieInfo/MovieInfo'
import './styles.css'

const MovieList = ({ movies, onMovieSelect }) => {
  const getMonth = (movie) => {
    const date = new Date(movie.ShowDate)
    return date.toLocaleString('default', { month: 'short' })
  }

  const getYear = (movie) => {
    const date = new Date(movie.ShowDate)
    return date.getFullYear()
  }

  return (
    <>
      {
        movies && movies.map((m, idx) =>
          m.Type === 'MOVIE' ?
            <div
              id={`${idx}`}
              key={m.EventCode}
              className="movie-box"
              onClick={() => onMovieSelect(m, (idx + 1))}
            >
              {
                m.Type === 'MOVIE' ?
                  <>
                    <img className='img-movie-box' src={m.EventImageUrl} />
                    <div className='txt-top'>
                      <span className='month'>{getMonth(m)}</span>
                      <span className='year'>{getYear(m)}</span>
                    </div>
                  </>
                  :
                  <MovieInfo />
              }
            </div>
            :
            <MovieInfo key={`${m.EventCode}_info`} />
        )
      }
    </>
  )
}

export default MovieList