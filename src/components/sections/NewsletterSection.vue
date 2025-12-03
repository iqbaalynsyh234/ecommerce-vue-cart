<template>
  <section class="newsletter-section">
    <div class="newsletter-background">
      <div class="bg-gradient"></div>
      <div class="bg-patterns">
        <div class="pattern pattern-1"></div>
        <div class="pattern pattern-2"></div>
        <div class="pattern pattern-3"></div>
      </div>
    </div>
    
    <div class="container">
      <div class="newsletter-content">
        <div class="newsletter-text">
          <h2 class="newsletter-title">Jangan Sampai Ketinggalan!</h2>
          <p class="newsletter-subtitle">
            Dapatkan update produk terbaru, promo eksklusif, dan tips belanja langsung di inbox Anda
          </p>
          
          <div class="newsletter-benefits">
            <div class="benefit-item">
              <i class="fas fa-gift"></i>
              <span>Promo Eksklusif</span>
            </div>
            <div class="benefit-item">
              <i class="fas fa-bolt"></i>
              <span>Flash Sale Alert</span>
            </div>
            <div class="benefit-item">
              <i class="fas fa-star"></i>
              <span>Produk Terbaru</span>
            </div>
          </div>
        </div>
        
        <div class="newsletter-form-wrapper">
          <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
            <div class="form-group">
              <div class="input-wrapper">
                <input 
                  type="email" 
                  v-model="email" 
                  placeholder="Masukkan alamat email Anda"
                  class="newsletter-input"
                  :class="{ 'error': showError }"
                  required 
                />
                <div class="input-icon">
                  <i class="fas fa-envelope"></i>
                </div>
              </div>
              <button 
                type="submit" 
                class="newsletter-btn"
                :disabled="isLoading"
                :class="{ 'loading': isLoading }"
              >
                <span v-if="!isLoading">Berlangganan</span>
                <span v-else>
                  <i class="fas fa-spinner fa-spin"></i>
                  Memproses...
                </span>
                <i class="fas fa-paper-plane" v-if="!isLoading"></i>
              </button>
            </div>
            
            <div class="form-privacy">
              <i class="fas fa-lock"></i>
              <span>Kami menghargai privasi Anda. Data tidak akan dibagikan kepada pihak ketiga.</span>
            </div>
          </form>
          
          <!-- Success Message -->
          <div class="success-message" v-if="showSuccess">
            <div class="success-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <h3>Berhasil Berlangganan!</h3>
            <p>Terima kasih telah bergabung. Periksa email Anda untuk konfirmasi.</p>
          </div>
        </div>
      </div>
      
      <!-- Social Media Links -->
      <div class="social-section">
        <p class="social-text">Atau ikuti kami di media sosial</p>
        <div class="social-links">
          <a href="#" class="social-link facebook" aria-label="Facebook">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" class="social-link twitter" aria-label="Twitter">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" class="social-link instagram" aria-label="Instagram">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#" class="social-link youtube" aria-label="YouTube">
            <i class="fab fa-youtube"></i>
          </a>
          <a href="#" class="social-link tiktok" aria-label="TikTok">
            <i class="fab fa-tiktok"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const isLoading = ref(false);
const showSuccess = ref(false);
const showError = ref(false);

const subscribeNewsletter = async () => {
  if (!email.value || !email.value.includes('@')) {
    showError.value = true;
    setTimeout(() => showError.value = false, 3000);
    return;
  }
  
  isLoading.value = true;
  showError.value = false;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    showSuccess.value = true;
    email.value = '';
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false;
    }, 5000);
    
  } catch (error) {
    console.error('Newsletter subscription failed:', error);
    showError.value = true;
    setTimeout(() => showError.value = false, 3000);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.newsletter-section {
  padding: 100px 0;
  position: relative;
  overflow: hidden;
  min-height: 600px;
}

.newsletter-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
}

.bg-patterns {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.pattern {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: patternFloat 8s ease-in-out infinite;
}

.pattern-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  right: 10%;
  animation-delay: 0s;
}

.pattern-2 {
  width: 150px;
  height: 150px;
  bottom: 20%;
  left: 15%;
  animation-delay: 2s;
}

.pattern-3 {
  width: 100px;
  height: 100px;
  top: 60%;
  right: 40%;
  animation-delay: 4s;
}

@keyframes patternFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
}

.newsletter-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  margin-bottom: 60px;
}

.newsletter-text {
  color: white;
}

.newsletter-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
  background: linear-gradient(45deg, #fff, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: slideInLeft 1s ease-out;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.newsletter-subtitle {
  font-size: 1.3rem;
  line-height: 1.6;
  margin-bottom: 40px;
  opacity: 0.9;
  animation: slideInLeft 1s ease-out 0.2s forwards;
  opacity: 0;
  transform: translateX(-30px);
}

@keyframes slideInLeft {
  to {
    opacity: 0.9;
    transform: translateX(0);
  }
}

.newsletter-benefits {
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: slideInLeft 1s ease-out 0.4s forwards;
  opacity: 0;
  transform: translateX(-30px);
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.1rem;
  font-weight: 500;
}

.benefit-item i {
  color: #f093fb;
  font-size: 1.2rem;
  width: 20px;
}

.newsletter-form-wrapper {
  position: relative;
  animation: slideInRight 1s ease-out 0.6s forwards;
  opacity: 0;
  transform: translateX(50px);
}

@keyframes slideInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.newsletter-form {
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 25px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 20px;
}

.input-wrapper {
  position: relative;
  margin-bottom: 16px;
}

.newsletter-input {
  width: 100%;
  padding: 18px 24px;
  padding-right: 60px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
}

.newsletter-input::placeholder {
  color: #888;
}

.newsletter-input:focus {
  border-color: rgba(240, 147, 251, 0.8);
  background: white;
  box-shadow: 0 0 0 4px rgba(240, 147, 251, 0.2);
  transform: translateY(-2px);
}

.newsletter-input.error {
  border-color: #f44336;
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.input-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;
}

.newsletter-btn {
  width: 100%;
  padding: 18px 24px;
  background: linear-gradient(45deg, #f093fb, #f5576c);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(240, 147, 251, 0.4);
}

.newsletter-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(240, 147, 251, 0.6);
}

.newsletter-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.newsletter-btn.loading {
  background: linear-gradient(45deg, #ccc, #999);
}

.form-privacy {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
}

.form-privacy i {
  color: #4CAF50;
}

.success-message {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
  animation: successSlideIn 0.5s ease-out;
}

@keyframes successSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.success-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #4CAF50, #45a049);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  animation: successBounce 0.6s ease-out 0.2s forwards;
  transform: scale(0);
}

@keyframes successBounce {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.success-icon i {
  font-size: 2rem;
  color: white;
}

.success-message h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
}

.success-message p {
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
}

.social-section {
  text-align: center;
  color: white;
}

.social-text {
  font-size: 1.1rem;
  margin-bottom: 30px;
  opacity: 0.8;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-link {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.social-link.facebook { background: rgba(59, 89, 152, 0.8); }
.social-link.twitter { background: rgba(29, 161, 242, 0.8); }
.social-link.instagram { background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); }
.social-link.youtube { background: rgba(255, 0, 0, 0.8); }
.social-link.tiktok { background: rgba(0, 0, 0, 0.8); }

.social-link:hover {
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .newsletter-content {
    gap: 60px;
  }
  
  .newsletter-title {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .newsletter-section {
    padding: 80px 0;
  }
  
  .newsletter-content {
    grid-template-columns: 1fr;
    gap: 50px;
    text-align: center;
  }
  
  .newsletter-title {
    font-size: 2.5rem;
  }
  
  .newsletter-subtitle {
    font-size: 1.1rem;
  }
  
  .newsletter-benefits {
    align-items: center;
  }
  
  .newsletter-form {
    padding: 30px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }
  
  .newsletter-title {
    font-size: 2rem;
  }
  
  .newsletter-form {
    padding: 24px;
    border-radius: 20px;
  }
  
  .newsletter-input,
  .newsletter-btn {
    padding: 16px 20px;
  }
  
  .social-links {
    gap: 15px;
  }
  
  .social-link {
    width: 45px;
    height: 45px;
  }
}
</style>