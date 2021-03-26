import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./MainList.css";

function Movie({ userImg, userName, mainCategory }) {
  return (
    <div className="list">
      <Link
        to={{
          /*pathname: `/movie/${id}`,
          state: {
            year,
            title,
            summary,
            poster,
            genres
          }*/
        }}
      >
        <img src={userImg} alt={userName} title={userName} />
        <h3 className="list_user">{userName}</h3>
        <div className="list__data">
          <h2>주요 리스트</h2>
          <h5 className="list_category">{mainCategory}</h5>
        </div>
      </Link>
    </div>
  );
}

// Movie.propTypes = {
//   id: PropTypes.number.isRequired,
//   year: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
//   summary: PropTypes.string.isRequired,
//   poster: PropTypes.string.isRequired,
//   genres: PropTypes.arrayOf(PropTypes.string).isRequired
// };

export default Movie;
