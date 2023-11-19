import MovieInfo from '../MovieInfo/MovieInfo'
import './styles.css'

const MovieList = ({ movies, onMovieSelect }) => {
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
                  <img className='img-movie-box' src={m.EventImageUrl} />
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