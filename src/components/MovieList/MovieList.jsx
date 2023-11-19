import './styles.css'

const MovieList = ({ movies }) => {
  return (
    <>
      {movies && movies.map(m =>
        <div key={m.EventCode} className="movie-box">
          {m.EventName}
        </div>
      )}
    </>
  )
}

export default MovieList