// script.js

// Dados das peças
const pecasData = {
  'top-genipabu': {
    nome: 'Top Genipabu',
    imagem: 'img/coleções/made-in-brasil/Top-Genipabu.jpeg',
    precos: [
      { tamanho: 'PP', valor: 69.90 },
      { tamanho: 'P', valor: 75.90 },
      { tamanho: 'M', valor: 80.00 },
      { tamanho: 'G', valor: 84.90 },
      { tamanho: 'GG', valor: 90.00 }
    ]
  },
  'shortinho-hexa': {
    nome: 'Shortinho Hexa',
    imagem: 'img/coleções/made-in-brasil/Shortinho-Hexa.jpeg',
    precos: [
      { tamanho: 'P', valor: 80.00 },
      { tamanho: 'M', valor: 89.90 },
      { tamanho: 'G', valor: 95.90 },
      { tamanho: 'GG', valor: 102.00 }
    ]
  },
  'saia-dona-maria': {
    nome: 'Saia Dona Maria',
    imagem: 'img/coleções/made-in-brasil/Saia-Dona-Maria.jpeg',
    precos: [
      { tamanho: 'PP', valor: 80.00 },
      { tamanho: 'P', valor: 84.90 },
      { tamanho: 'M', valor: 92.90 },
      { tamanho: 'G', valor: 97.90 },
      { tamanho: 'GG', valor: 110.00 }
    ]
  },
  'bandana-xodo': {
    nome: 'Bandana Xodó',
    imagem: 'img/coleções/made-in-brasil/Bandana-Xodó.jpeg',
    precos: [
      { tamanho: 'P', valor: 65.90 },
      { tamanho: 'M', valor: 70.00 },
      { tamanho: 'G', valor: 76.90 },
      { tamanho: 'GG', valor: 87.90 }
    ]
  },
  'faixa-caju': {
    nome: 'Faixa Caju',
    imagem: 'img/coleções/made-in-brasil/Faixa-Caju.jpeg',
    precos: [
      { tamanho: 'Único', valor: 45.00 }
    ]
  }
};

// Função para abrir modal
window.abrirModal = function(pecaId) {
  const peca = pecasData[pecaId];
  if (!peca) return;
  
  const modal = document.getElementById('modal-peca');
  const modalImg = document.getElementById('modal-img');
  const modalTitulo = document.getElementById('modal-titulo');
  const modalTabelaPrecos = document.getElementById('modal-tabela-precos');
  
  modalImg.src = peca.imagem;
  modalImg.alt = peca.nome;
  modalTitulo.textContent = peca.nome;
  
  modalTabelaPrecos.innerHTML = peca.precos.map(item => `
    <div class="preco-item">
      <span class="preco-tamanho">${item.tamanho}</span>
      <span class="preco-valor">R$ ${item.valor.toFixed(2).replace('.', ',')}</span>
    </div>
  `).join('');
  
  modal.classList.add('ativo');
  document.body.style.overflow = 'hidden';
};

// Função para fechar modal
window.fecharModal = function(event) {
  if (!event || event.target.id === 'modal-peca' || event.target.closest('.modal-close')) {
    const modal = document.getElementById('modal-peca');
    modal.classList.remove('ativo');
    document.body.style.overflow = '';
  }
};

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