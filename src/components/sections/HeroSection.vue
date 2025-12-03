<template>
  <section class="hero-section">
    <div class="hero-background">
      <div class="hero-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
      <div class="hero-particles">
        <div class="particle" v-for="n in 15" :key="n" :style="getParticleStyle(n)"></div>
      </div>
    </div>
    
    <div class="hero-content">
      <div class="container">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="hero-title-line">Belanja Online</span>
            <span class="hero-title-line highlight">Masa Depan</span>
          </h1>
          <p class="hero-subtitle">
            Rasakan pengalaman berbelanja yang tak terlupakan dengan teknologi Vue.js & TypeScript terdepan
          </p>
          <div class="hero-features">
            <div class="feature-item">
              <i class="fas fa-shipping-fast"></i>
              <span>Gratis Ongkir</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-shield-alt"></i>
              <span>Pembayaran Aman</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-headset"></i>
              <span>Support 24/7</span>
            </div>
          </div>
          <div class="hero-cta">
            <button class="cta-primary" @click="scrollToProducts">
              <span>Mulai Belanja</span>
              <i class="fas fa-arrow-right"></i>
            </button>
            <button class="cta-secondary" @click="openPromoModal">
              <i class="fas fa-gift"></i>
              <span>Lihat Promo</span>
            </button>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-image">
            <div class="floating-card" v-for="product in featuredProducts" :key="product.id" 
                 :style="getCardStyle(product.id)">
              <img :src="product.image" :alt="product.name" />
              <div class="card-info">
                <h4>{{ product.name }}</h4>
                <p>{{ formatPrice(product.price) }}</p>
              </div>
            </div>
            <div class="hero-main-image">
              <div class="image-glow"></div>
              <i class="fas fa-shopping-bag"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="scroll-indicator">
      <div class="scroll-arrow" @click="scrollToProducts">
        <i class="fas fa-chevron-down"></i>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { sampleProducts } from '@/stores/cartStore';

const featuredProducts = sampleProducts.slice(0, 4);

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

const scrollToProducts = () => {
  const element = document.querySelector('.products-section');
  element?.scrollIntoView({ behavior: 'smooth' });
};

const openPromoModal = () => {
  // Implementasi modal promo
  alert('🎉 Dapatkan diskon hingga 50% untuk pembelian pertama!');
};

const getParticleStyle = (index: number) => {
  return {
    '--delay': `${index * 0.2}s`,
    '--duration': `${3 + (index % 3)}s`,
    left: `${(index * 7) % 100}%`,
    top: `${(index * 11) % 100}%`,
  };
};

const getCardStyle = (id: number) => {
  const positions = [
    { top: '10%', right: '20%', delay: '0s' },
    { top: '30%', right: '5%', delay: '0.5s' },
    { bottom: '30%', right: '15%', delay: '1s' },
    { bottom: '10%', right: '30%', delay: '1.5s' },
  ];
  
  const position = positions[(id - 1) % positions.length];
  return {
    ...position,
    '--delay': position.delay
  };
};
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.hero-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  right: -150px;
  animation-delay: 0s;
}

.shape-2 {
  width: 200px;
  height: 200px;
  bottom: -100px;
  left: -100px;
  animation-delay: 2s;
}

.shape-3 {
  width: 150px;
  height: 150px;
  top: 20%;
  left: 10%;
  animation-delay: 4s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  right: 40%;
  animation-delay: 1s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(180deg); }
}

.hero-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: particleFloat var(--duration) ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes particleFloat {
  0%, 100% { 
    transform: translateY(0px) scale(1); 
    opacity: 0.6;
  }
  50% { 
    transform: translateY(-20px) scale(1.5); 
    opacity: 1;
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 100px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-text {
  color: white;
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
}

.hero-title-line {
  display: block;
  animation: slideInUp 1s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.hero-title-line:first-child {
  animation-delay: 0.2s;
}

.hero-title-line.highlight {
  background: linear-gradient(45deg, #f093fb, #f5576c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation-delay: 0.4s;
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-subtitle {
  font-size: 1.4rem;
  line-height: 1.6;
  margin-bottom: 40px;
  opacity: 0.9;
  animation: fadeInUp 1s ease-out 0.6s forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 0.9;
    transform: translateY(0);
  }
}

.hero-features {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
  animation: fadeInUp 1s ease-out 0.8s forwards;
  opacity: 0;
  transform: translateY(20px);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  font-weight: 500;
}

.feature-item i {
  color: #f093fb;
  font-size: 1.1rem;
}

.hero-cta {
  display: flex;
  gap: 20px;
  animation: fadeInUp 1s ease-out 1s forwards;
  opacity: 0;
  transform: translateY(20px);
}

.cta-primary, .cta-secondary {
  padding: 16px 32px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 12px;
  border: none;
  text-decoration: none;
}

.cta-primary {
  background: linear-gradient(45deg, #f093fb, #f5576c);
  color: white;
  box-shadow: 0 10px 30px rgba(240, 147, 251, 0.4);
}

.cta-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(240, 147, 251, 0.6);
}

.cta-secondary {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.cta-secondary:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.hero-visual {
  position: relative;
  height: 500px;
  animation: fadeIn 1s ease-out 1.2s forwards;
  opacity: 0;
}

.hero-image {
  position: relative;
  width: 100%;
  height: 100%;
}

.hero-main-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: pulse 2s ease-in-out infinite;
}

.hero-main-image i {
  font-size: 4rem;
  color: white;
}

.image-glow {
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: linear-gradient(45deg, #f093fb, #f5576c);
  border-radius: 50%;
  opacity: 0.3;
  filter: blur(20px);
  animation: glow 3s ease-in-out infinite alternate;
}

@keyframes pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.05); }
}

@keyframes glow {
  0% { opacity: 0.3; filter: blur(20px); }
  100% { opacity: 0.6; filter: blur(30px); }
}

.floating-card {
  position: absolute;
  width: 120px;
  background: white;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: cardFloat 4s ease-in-out infinite;
  animation-delay: var(--delay);
  opacity: 0;
  animation-fill-mode: forwards;
}

.floating-card img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
}

.card-info h4 {
  font-size: 0.8rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #333;
  line-height: 1.2;
}

.card-info p {
  font-size: 0.75rem;
  color: #2196F3;
  font-weight: 600;
  margin: 0;
}

@keyframes cardFloat {
  0% { 
    opacity: 0;
    transform: translateY(20px) rotate(-5deg); 
  }
  20% {
    opacity: 1;
  }
  50% { 
    transform: translateY(-10px) rotate(2deg); 
  }
  100% { 
    opacity: 1;
    transform: translateY(0px) rotate(-1deg); 
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}

.scroll-arrow {
  width: 40px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  animation: bounce 2s infinite;
  transition: all 0.3s ease;
}

.scroll-arrow:hover {
  border-color: white;
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .container {
    gap: 40px;
  }
  
  .hero-title {
    font-size: 3.2rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.8rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-features {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
  
  .hero-cta {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-visual {
    height: 300px;
  }
  
  .floating-card {
    width: 100px;
    padding: 8px;
  }
  
  .floating-card img {
    height: 60px;
  }
  
  .hero-main-image {
    width: 150px;
    height: 150px;
  }
  
  .hero-main-image i {
    font-size: 3rem;
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding: 80px 0;
  }
  
  .hero-title {
    font-size: 2.2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .cta-primary, .cta-secondary {
    padding: 14px 28px;
    font-size: 1rem;
  }
}
</style>