import React, { useState, useEffect } from "react";
import "../styles/Blog.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons"; // Dodaj ikono "X"

function Blog() {
  const [blog, setBlog] = useState([]); // Podatki iz baze
  const [currentIndex, setCurrentIndex] = useState(0); // Trenutni indeks za navigacijo
  const [selectedBlog, setSelectedBlog] = useState(null); // Izbrani blog

  useEffect(() => {
    // Pridobi podatke iz API-ja
    fetch("https://lanparty.scv.si/api/blog")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Napaka pri pridobivanju podatkov.");
        }
        return response.json();
      })
      .then((data) => {
        setBlog(data);
      })
      .catch((error) => {
        console.error("Napaka pri pridobivanju podatkov:", error);
      });
  }, []);

  const visibleBlog = blog.slice(currentIndex, currentIndex + 3);

  const handleNext = () => {
    if (currentIndex + 3 < blog.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleBlogClick = (clickedBlog) => {
    setSelectedBlog(clickedBlog); // Nastavi izbrani blog
  };

  const handleBackToList = () => {
    setSelectedBlog(null); // Pojdi nazaj na seznam blogov
  };

  // Funkcija za omejitev prikaza opisa na prvih 50 besed
  const truncateDescription = (description) => {
    const words = description.split(" "); // Razdeli opis na besede
    if (words.length > 50) {
      return words.slice(0, 50).join(" ") + "..."; // Prikaz prvih 50 besed in dodajanje "..."
    }
    return description; // Če je manj kot 50 besed, vrni celoten opis
  };

  return (
    <div className="blog-container">
      {selectedBlog ? (
        <div className="blog-detail">
          <button className="close-button" onClick={handleBackToList}>
            <FontAwesomeIcon icon={faTimes} /> {/* Gumb za zapiranje */}
          </button>
          <div className="blog-detail-content">
            <img
              src={
                selectedBlog.slika
                  ? new URL(`../image/${selectedBlog.slika}.png`, import.meta.url).href
                  : new URL('../image/default-logo.png', import.meta.url).href
              }
              alt={selectedBlog.title}
              className="blog-detail-image"
            />
            <h2 className="blog-detail-title">{selectedBlog.title}</h2>
            <p className="blog-detail-description">{selectedBlog.description}</p>
            {/* Dodaj dodatne informacije po potrebi */}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="blog-title">Blog</h1>
          <div className="blog-cards">

            {visibleBlog.map((blogItem) => (
              <div
                className="blog-card"
                key={blogItem.id}
                onClick={() => handleBlogClick(blogItem)} // Klik na blog
              >
                <img
                  src={
                    blogItem.slika
                      ? new URL(`../image/${blogItem.slika}.png`, import.meta.url).href
                      : new URL('../image/default-logo.png', import.meta.url).href
                  }
                  alt={blogItem.title}
                  className="blog-image"
                />
                <h2 className="blog-card-title">{blogItem.title}</h2>
                <p className="blog-card-description">
                  {truncateDescription(blogItem.description)} {/* Trunciraj opis */}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;
