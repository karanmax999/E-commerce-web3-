import React from "react";

const Home = () => {
  return (
    <section className="hero border-1 pb-3" style={{
      background: 'linear-gradient(135deg, #f3f9ff 0%, #fce4ec 30%, #f3e5f5 70%, #e1f5fe 100%)',
      minHeight: '60vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating particles background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(233, 30, 99, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(156, 39, 176, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(33, 150, 243, 0.1) 0%, transparent 50%)
        `,
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      
      <div className="card border-0 mx-3" style={{
        background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.9) 0%, rgba(156, 39, 176, 0.8) 50%, rgba(233, 30, 99, 0.9) 100%)',
        color: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(156, 39, 176, 0.3), 0 10px 30px rgba(33, 150, 243, 0.2)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        zIndex: 2
      }}>
        <img
          className="card-img img-fluid"
          src="/assets/main.png.jpg" // ✅ for public folder
          // src={heroImage}         // ✅ for src/assets
          alt="Hero promoting new season arrivals"
          height={500}
          style={{
            filter: 'brightness(0.6) saturate(1.2)',
            transition: 'all 0.4s ease'
          }}
        />
        <div className="card-img-overlay d-flex align-items-center" style={{
          background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.8) 0%, rgba(156, 39, 176, 0.7) 50%, rgba(233, 30, 99, 0.6) 100%)'
        }}>
          <div className="container">
            <h5 className="card-title fs-1 fw-lighter" style={{
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              animation: 'fadeInUp 1s ease-out, glow 3s ease-in-out infinite alternate',
              background: 'linear-gradient(45deg, #ffffff, #f8bbd9, #e1bee7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>New Season Arrivals</h5>
            <p className="card-text fs-5 d-none d-sm-block" style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
              animation: 'fadeInUp 1s ease-out 0.3s both, slideIn 1.5s ease-out',
              opacity: 0.95
            }}>
              ✨ Discover our magical collection of premium products with exclusive deals and amazing features. Experience shopping like never before! 🛍️
            </p>
            
            {/* Call to action buttons */}
            <div className="mt-4" style={{
              animation: 'fadeInUp 1s ease-out 0.6s both'
            }}>
              <button className="btn me-3" style={{
                background: 'linear-gradient(45deg, #e91e63, #9c27b0)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 30px',
                fontWeight: '600',
                fontSize: '1.1rem',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 6px 20px rgba(233, 30, 99, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }} onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
                e.target.style.boxShadow = '0 10px 30px rgba(233, 30, 99, 0.6)';
              }} onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 6px 20px rgba(233, 30, 99, 0.4)';
              }}>
                🚀 Shop Now
              </button>
              
              <button className="btn" style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.8)',
                borderRadius: '25px',
                padding: '12px 30px',
                fontWeight: '600',
                fontSize: '1.1rem',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }} onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
                e.target.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.3)';
              }} onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = 'none';
              }}>
                💎 Explore
              </button>
            </div>
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
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes glow {
          from {
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          }
          to {
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(233, 30, 99, 0.5);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
      `}</style>
    </section>
  );
};

export default Home;
