import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cats.css";
import catImg from "../assets/cat.jpeg"; // Your default image path

const Cats = () => {
  const [cats, setCats] = useState([]);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true); // Loading state for initial data
  const [loadingMore, setLoadingMore] = useState(false); // Loading state for Load More button

  useEffect(() => {
    axios
      .get("https://api.thecatapi.com/v1/breeds")
      .then((response) => {
        setCats(response.data);
        setLoading(false); // Stop loading when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching cat data:", error);
        setError("Failed to fetch cat data.");
        setLoading(false); // Stop loading on error
      });
  }, []);

  const defaultImage =
    "https://images.pexels.com/photos/26339925/pexels-photo-26339925/free-photo-of-cat-among-pink-flowers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"; // Default image URL

  const getCatImage = (id) => {
    return id ? `https://cdn2.thecatapi.com/images/${id}.jpg` : defaultImage;
  };

  const handleLoadMore = () => {
    setLoadingMore(true); // Start loading for Load More
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + 6);
      setLoadingMore(false); // Stop loading after 2 seconds
    }, 2000); // Simulate 2 seconds delay
  };

  return (
    <div className="cat-world">
      <h1 className="heading">Cats World</h1>

      {loading ? (
        <div className="loader-container">
          <img src={catImg} className="cat-loader" alt="Loading..." />
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <div className="card-container">
            {cats.slice(0, visibleCount).map((cat) => (
              <div className="card" key={cat.id}>
                <img
                  src={getCatImage(cat.reference_image_id)}
                  className="card-img-top"
                  alt={cat.name}
                  onError={(e) => (e.target.src = defaultImage)}
                />
                <div className="card-body">
                  <h5 className="card-title">{cat.name}</h5>
                  <p className="card-text">
                    {cat.description.length > 200
                      ? `${cat.description.substring(0, 200)}...`
                      : cat.description}
                  </p>
                  <p>Origin: {cat.origin}</p>
                  <a
                    href={cat.wikipedia_url}
                    className="btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>

          {loadingMore ? (
            <div className="loader-overlay">
              <div className="loader-container">
                <img
                  src={catImg}
                  className="cat-loader"
                  alt="Loading more..."
                />
                <p>Loading more...</p>
              </div>
            </div>
          ) : (
            visibleCount < cats.length && (
              <button onClick={handleLoadMore} className="btn-load-more">
                Load More
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Cats;
