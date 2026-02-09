// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Sistema de navegação suave
  const abas = document.querySelectorAll('.aba');
  const navItems = document.querySelectorAll('.nav-item');
  
  // Função para mostrar aba
  window.mostrarAba = function(abaId) {
    // Esconder todas as abas
    abas.forEach(aba => {
      aba.classList.remove('ativa');
    });
    
    // Remover classe active de todos os botões
    navItems.forEach(item => {
      item.classList.remove('active');
    });
    
    // Mostrar aba selecionada
    const abaSelecionada = document.getElementById(abaId);
    if (abaSelecionada) {
      abaSelecionada.classList.add('ativa');
      
      // Rolar suavemente para o topo da aba (mas não para o topo absoluto da página)
      window.scrollTo({
        top: abaSelecionada.offsetTop - 100,
        behavior: 'smooth'
      });
    }
    
    // Ativar botão correspondente
    const botaoSelecionado = Array.from(navItems).find(item => 
      item.getAttribute('onclick')?.includes(abaId)
    );
    if (botaoSelecionado) {
      botaoSelecionado.classList.add('active');
    }
  };
  
  // Atualizar ano atual no footer
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  
  // Efeito de rolagem sutil
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
      const speed = 0.05 + (index * 0.02);
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Efeito sutil no visual frame
    const visualFrame = document.querySelector('.visual-frame');
    if (visualFrame) {
      const frameOffset = visualFrame.offsetTop;
      const windowHeight = window.innerHeight;
      
      if (scrolled > frameOffset - windowHeight * 0.5) {
        const progress = (scrolled - (frameOffset - windowHeight * 0.5)) / (windowHeight * 0.5);
        const scale = 1 + (progress * 0.05);
        visualFrame.style.transform = `scale(${Math.min(scale, 1.05)})`;
      }
    }
  });
  
  // Efeitos de hover nas opções de contato
  const contactOptions = document.querySelectorAll('.contact-option');
  contactOptions.forEach(option => {
    option.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.icon-circle');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
      }
    });
    
    option.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.icon-circle');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });
  
  // Animação dos pontos de costura
  const stitches = document.querySelectorAll('.stitch');
  stitches.forEach(stitch => {
    stitch.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.3)';
      this.style.opacity = '1';
    });
    
    stitch.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1.2)';
      this.style.opacity = '0.8';
    });
  });
  
  // Efeito de digitação no hero (opcional)
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && !sessionStorage.getItem('animationShown')) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
      if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    
    // Iniciar animação após um breve delay
    setTimeout(typeWriter, 500);
    sessionStorage.setItem('animationShown', 'true');
  }
  
  // Preload de imagens
  const logoImg = document.querySelector('.logo-img');
  if (logoImg && logoImg.src) {
    const img = new Image();
    img.src = logoImg.src;
  }
});