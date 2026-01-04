import React, { useState } from 'react';
import '../styles/Home.scss';

export const HomePage = () => {
  const [houses] = useState([
    {
      _id: "1",
      title: "The Glass Villa",
      location: "Malibu, California",
      price: 450,
      rating: 4.92,
      category: "Beachfront",
      representativeImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
      features: ["3 Beds", "2 Baths", "Wifi"]
    },
    {
      _id: "2",
      title: "Forest Retreat",
      location: "Lake Tahoe, NV",
      price: 250,
      rating: 4.85,
      category: "Cabins",
      representativeImage: "https://images.unsplash.com/photo-1449156730764-d6a6d1f9d6b1?q=80&w=2070&auto=format&fit=crop",
      features: ["2 Beds", "1 Bath", "Fireplace"]
    },
    {
      _id: "3",
      title: "Skyline Penthouse",
      location: "Miami, Florida",
      price: 680,
      rating: 5.0,
      category: "All Stays",
      representativeImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop",
      features: ["4 Beds", "Pool", "Gym"]
    },
    {
      _id: "4",
      title: "Forest Retreat",
      location: "Lake Tahoe, NV",
      price: 295,
      rating: 4.85,
      category: "Cabins",
      representativeImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop",
      features: ["2 Beds", "1 Bath", "Fireplace"]
    },
    {
      _id: "5",
      title: "Forest Retreat",
      location: "Lake Tahoe, NV",
      price: 295,
      rating: 4.85,
      category: "Cabins",
      representativeImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop",
      features: ["2 Beds", "1 Bath", "Fireplace"]
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('All Stays');

  return (
    <main className="home-container">
      <header className="home-header">
        <h1>
          Descubre tu <br />
          <span>próximo destino</span>
        </h1>
      </header>

      {/* BARRA DE FILTROS */}
      <section className="filters-container">
        {['All Stays', 'Beachfront', 'Cabins'].map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </section>

      <section className="properties-grid">
        {houses
          .filter(h => activeFilter === 'All Stays' || h.category === activeFilter)
          .map((house) => (
            <article key={house._id} className="property-card">
              <div className="image-wrapper">
                {/* Simulamos URL que Multer guardará en el futuro */}
                <img src={house.representativeImage} alt={house.title} />
                <div className="heart-badge">❤</div>
                <div className="rating-tag">★ {house.rating}</div>
              </div>

              <div className="property-details">
                <div className="card-main-info">
                  <h3 className="title">{house.title}</h3>
                  <p className="price">${house.price} <span>/night</span></p>
                </div>
                <p className="location">{house.location}</p>

                <div className="features-list">
                  {house.features.map(f => <span key={f}>{f}</span>)}
                </div>
              </div>
            </article>
          ))}
      </section>
    </main>
  );
};