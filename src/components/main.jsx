import React from "react";

const Home = () => {
  return (
    <section className="hero border-1 pb-3" style={{
      background: 'linear-gradient(135deg, #f3f9ff 0%, #e1f5fe 100%)',
      minHeight: '60vh'
    }}>
      <div className="card border-0 mx-3" style={{
        background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.9) 0%, rgba(25, 118, 210, 0.9) 100%)',
        color: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(33, 150, 243, 0.3)',
        transition: 'all 0.3s ease'
      }}>
        <img
          className="card-img img-fluid"
          src="/assets/main.png.jpg" // ✅ for public folder
          // src={heroImage}         // ✅ for src/assets
          alt="Hero promoting new season arrivals"
          height={500}
          style={{
            filter: 'brightness(0.7)',
            transition: 'all 0.3s ease'
          }}
        />
        <div className="card-img-overlay d-flex align-items-center" style={{
          background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.8) 0%, rgba(25, 118, 210, 0.6) 100%)'
        }}>
          <div className="container">
            <h5 className="card-title fs-1 text fw-lighter" style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              animation: 'fadeInUp 1s ease-out'
            }}>New Season Arrivals</h5>
            <p className="card-text fs-5 d-none d-sm-block" style={{
              textShadow: '0 1px 5px rgba(0, 0, 0, 0.3)',
              animation: 'fadeInUp 1s ease-out 0.3s both'
            }}>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Home;
