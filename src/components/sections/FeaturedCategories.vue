<template>
  <section class="featured-categories">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Kategori Populer</h2>
        <p class="section-subtitle">Jelajahi koleksi terbaik kami berdasarkan kategori</p>
      </div>
      
      <div class="categories-grid">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="category-card"
          @click="selectCategory(category)"
          :style="{ '--delay': `${category.id * 0.1}s` }"
        >
          <div class="category-background">
            <div class="category-pattern"></div>
          </div>
          <div class="category-content">
            <div class="category-icon">
              <i :class="category.icon"></i>
            </div>
            <h3 class="category-name">{{ category.name }}</h3>
            <p class="category-description">{{ category.description }}</p>
            <div class="category-stats">
              <span class="product-count">{{ category.productCount }} produk</span>
              <span class="category-badge" v-if="category.isPopular">Popular</span>
            </div>
          </div>
          <div class="category-hover-effect">
            <div class="hover-circle"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  productCount: number;
  isPopular: boolean;
  gradient: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Electronics',
    description: 'Gadget terbaru dan teknologi canggih',
    icon: 'fas fa-laptop',
    productCount: 245,
    isPopular: true,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 2,
    name: 'Fashion',
    description: 'Pakaian dan aksesoris trendy',
    icon: 'fas fa-tshirt',
    productCount: 189,
    isPopular: true,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 3,
    name: 'Home & Garden',
    description: 'Perlengkapan rumah dan taman',
    icon: 'fas fa-home',
    productCount: 156,
    isPopular: false,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    id: 4,
    name: 'Sports',
    description: 'Peralatan olahraga berkualitas',
    icon: 'fas fa-dumbbell',
    productCount: 98,
    isPopular: false,
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  },
  {
    id: 5,
    name: 'Books',
    description: 'Buku dan media pembelajaran',
    icon: 'fas fa-book',
    productCount: 87,
    isPopular: false,
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    id: 6,
    name: 'Beauty',
    description: 'Produk kecantikan dan perawatan',
    icon: 'fas fa-heart',
    productCount: 134,
    isPopular: true,
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  }
];

const selectCategory = (category: Category) => {
  // Implement category filtering
  alert(`Memuat produk kategori: ${category.name}`);
};
</script>

<style scoped>
.featured-categories {
  padding: 100px 0;
  background: #f8f9fa;
  position: relative;
  overflow: hidden;
}

.featured-categories::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(240, 147, 251, 0.1) 0%, transparent 50%);
  pointer-events: none;
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

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.category-card {
  position: relative;
  background: white;
  border-radius: 20px;
  padding: 30px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: slideInUp 0.6s ease-out forwards;
  animation-delay: var(--delay);
  opacity: 0;
  transform: translateY(30px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.category-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.4s ease;
  background: var(--gradient, linear-gradient(135deg, #667eea 0%, #764ba2 100%));
}

.category-card:hover .category-background {
  opacity: 0.1;
}

.category-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 50%);
}

.category-content {
  position: relative;
  z-index: 2;
}

.category-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.category-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.category-card:hover .category-icon::before {
  opacity: 0.2;
}

.category-icon i {
  font-size: 2rem;
  color: white;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.category-card:hover .category-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 10px 30px rgba(240, 147, 251, 0.4);
}

.category-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
  transition: color 0.3s ease;
}

.category-card:hover .category-name {
  background: linear-gradient(45deg, #f093fb, #f5576c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.category-description {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  transition: color 0.3s ease;
}

.category-card:hover .category-description {
  color: #555;
}

.category-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-count {
  font-size: 0.9rem;
  color: #888;
  font-weight: 500;
}

.category-badge {
  background: linear-gradient(45deg, #f093fb, #f5576c);
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.category-hover-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(240, 147, 251, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.category-card:hover .category-hover-effect {
  width: 300px;
  height: 300px;
}

.hover-circle {
  width: 100%;
  height: 100%;
  border: 2px solid rgba(240, 147, 251, 0.3);
  border-radius: 50%;
  animation: ripple 2s ease-out infinite;
}

@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .featured-categories {
    padding: 80px 0;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
    gap: 20px;
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
  
  .category-card {
    padding: 24px;
  }
  
  .category-icon {
    width: 60px;
    height: 60px;
    margin-bottom: 20px;
  }
  
  .category-icon i {
    font-size: 1.5rem;
  }
  
  .category-name {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }
  
  .categories-grid {
    gap: 16px;
  }
  
  .category-card {
    padding: 20px;
  }
}
</style>