<template>
  <section class="features-section">
    <div class="features-background">
      <div class="background-shapes">
        <div class="bg-shape bg-shape-1"></div>
        <div class="bg-shape bg-shape-2"></div>
        <div class="bg-shape bg-shape-3"></div>
      </div>
    </div>
    
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Mengapa Memilih ShopVue?</h2>
        <p class="section-subtitle">Pengalaman berbelanja terbaik dengan layanan premium</p>
      </div>
      
      <div class="features-grid">
        <div 
          v-for="feature in features" 
          :key="feature.id"
          class="feature-card"
          :style="{ '--delay': `${feature.id * 0.15}s` }"
        >
          <div class="feature-icon-wrapper">
            <div class="feature-icon" :style="{ background: feature.gradient }">
              <i :class="feature.icon"></i>
              <div class="icon-glow"></div>
            </div>
          </div>
          
          <div class="feature-content">
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
            <ul class="feature-list">
              <li v-for="item in feature.benefits" :key="item">
                <i class="fas fa-check"></i>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
          
          <div class="feature-decoration">
            <div class="decoration-circle"></div>
            <div class="decoration-dots">
              <div class="dot" v-for="n in 5" :key="n"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Stats Section -->
      <div class="stats-section">
        <div class="stats-grid">
          <div 
            v-for="stat in stats" 
            :key="stat.id"
            class="stat-item"
            :style="{ '--delay': `${stat.id * 0.1}s` }"
          >
            <div class="stat-icon">
              <i :class="stat.icon"></i>
            </div>
            <div class="stat-number" ref="statNumbers">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  benefits: string[];
}

interface Stat {
  id: number;
  number: string;
  label: string;
  icon: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: 'Pengiriman Cepat',
    description: 'Dapatkan produk Anda dalam waktu singkat dengan jaringan pengiriman terluas',
    icon: 'fas fa-shipping-fast',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    benefits: ['Same day delivery', 'Gratis ongkir Rp 500k+', 'Tracking real-time']
  },
  {
    id: 2,
    title: 'Pembayaran Aman',
    description: 'Sistem pembayaran terenkripsi dengan berbagai pilihan metode yang mudah',
    icon: 'fas fa-shield-alt',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    benefits: ['SSL encryption', 'Multiple payment', 'Buyer protection']
  },
  {
    id: 3,
    title: 'Kualitas Terjamin',
    description: 'Produk berkualitas tinggi dari seller terpercaya dengan review asli',
    icon: 'fas fa-award',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    benefits: ['Quality control', 'Authentic products', 'Warranty included']
  },
  {
    id: 4,
    title: 'Customer Support 24/7',
    description: 'Tim support yang siap membantu Anda kapan saja dengan respon cepat',
    icon: 'fas fa-headset',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    benefits: ['24/7 live chat', 'Phone support', 'Email assistance']
  }
];

const stats: Stat[] = [
  { id: 1, number: '1M+', label: 'Pengguna Aktif', icon: 'fas fa-users' },
  { id: 2, number: '50K+', label: 'Produk Tersedia', icon: 'fas fa-boxes' },
  { id: 3, number: '98%', label: 'Kepuasan Pelanggan', icon: 'fas fa-smile' },
  { id: 4, number: '24/7', label: 'Customer Support', icon: 'fas fa-clock' }
];
</script>

<style scoped>
.features-section {
  padding: 120px 0;
  position: relative;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  overflow: hidden;
}

.features-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.background-shapes {
  position: relative;
  width: 100%;
  height: 100%;
}

.bg-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(102, 126, 234, 0.1);
  animation: floatShape 8s ease-in-out infinite;
}

.bg-shape-1 {
  width: 400px;
  height: 400px;
  top: -200px;
  right: -200px;
  animation-delay: 0s;
}

.bg-shape-2 {
  width: 300px;
  height: 300px;
  bottom: -150px;
  left: -150px;
  animation-delay: 2s;
}

.bg-shape-3 {
  width: 200px;
  height: 200px;
  top: 50%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes floatShape {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(180deg); }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(45deg, #f093fb, #f5576c);
  border-radius: 2px;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-bottom: 100px;
}

.feature-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  position: relative;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideInUp 0.8s ease-out forwards;
  animation-delay: var(--delay);
  opacity: 0;
  transform: translateY(50px);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
}

.feature-icon-wrapper {
  margin-bottom: 30px;
}

.feature-icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.feature-icon i {
  font-size: 2rem;
  color: white;
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
}

.feature-card:hover .feature-icon i {
  transform: scale(1.1);
}

.icon-glow {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: inherit;
  border-radius: inherit;
  opacity: 0;
  filter: blur(15px);
  transition: opacity 0.4s ease;
}

.feature-card:hover .icon-glow {
  opacity: 0.6;
}

.feature-content {
  position: relative;
  z-index: 2;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 16px;
  transition: color 0.3s ease;
}

.feature-card:hover .feature-title {
  background: linear-gradient(45deg, #f093fb, #f5576c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.feature-description {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 24px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 0.95rem;
  color: #555;
}

.feature-list i {
  color: #4CAF50;
  font-size: 0.9rem;
  width: 16px;
  flex-shrink: 0;
}

.feature-decoration {
  position: absolute;
  top: 20px;
  right: 20px;
  opacity: 0.1;
  transition: opacity 0.3s ease;
}

.feature-card:hover .feature-decoration {
  opacity: 0.2;
}

.decoration-circle {
  width: 60px;
  height: 60px;
  border: 2px solid currentColor;
  border-radius: 50%;
  margin-bottom: 10px;
}

.decoration-dots {
  display: flex;
  gap: 4px;
  justify-content: center;
}

.dot {
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
}

.stats-section {
  background: white;
  border-radius: 25px;
  padding: 60px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.stats-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(240, 147, 251, 0.05) 100%);
  pointer-events: none;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  position: relative;
  z-index: 1;
}

.stat-item {
  text-align: center;
  animation: fadeInUp 0.8s ease-out forwards;
  animation-delay: var(--delay);
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  transition: all 0.3s ease;
}

.stat-item:hover .stat-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 10px 30px rgba(240, 147, 251, 0.4);
}

.stat-icon i {
  font-size: 1.5rem;
  color: white;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 8px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 1rem;
  color: #666;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .features-section {
    padding: 80px 0;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 25px;
    margin-bottom: 60px;
  }
  
  .feature-card {
    padding: 30px;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
  }
  
  .section-header {
    margin-bottom: 50px;
  }
  
  .stats-section {
    padding: 40px 30px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }
  
  .feature-card {
    padding: 24px;
  }
  
  .stats-section {
    padding: 30px 20px;
    border-radius: 20px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }
}
</style>