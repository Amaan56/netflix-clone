import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Banner.css';

const BASE_IMAGE_URI = 'https://image.tmdb.org/t/p/original';

function Banner({ fetchUrl }) {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchMovie() {
      const request = await axios.get(fetchUrl);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }

    fetchMovie();
  }, [fetchUrl]);

  function truncate(str, n) {
    if (str === undefined) return '';
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: '100% 100%',
        backgroundImage: `url(${BASE_IMAGE_URI}${movie?.backdrop_path})`,
        backgroundPosition: 'center center',
        objectFit: 'contain',
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.original_name || movie?.name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom"></div>
    </header>
  );
}

export default Banner;
