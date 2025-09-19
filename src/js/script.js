
/*Menu ativo ao rolar a página*/

(function() {
  const menuLinks = document.querySelectorAll('#navmenu a'); 
  const sections = document.querySelectorAll('section[id]'); 

  function setActiveMenu() {
    let scrollPos = window.scrollY + 120; 
    let currentId = '';

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        currentId = section.getAttribute('id');
      }
    });

    menuLinks.forEach(link => {
      link.classList.remove('ativo');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('ativo');
      }
    });
  }

  window.addEventListener('scroll', setActiveMenu);
  window.addEventListener('load', setActiveMenu);
})();

/*Texto digitado (Typed.js)*/
document.addEventListener("DOMContentLoaded", function () {
  const typedElement = document.querySelector(".typed");

  if (typedElement) {
    let itens = typedElement.getAttribute("data-typed-items");
    itens = itens.split(",").map(item => item.trim());

    new Typed(".typed", {
      strings: itens,
      typeSpeed: 70,     
      backSpeed: 40,  
      backDelay: 2000,   
      loop: true
    });
  }
});

  /*Menu hamburguer*/
  const btn = document.querySelector('.hamburguer');
  const menu = document.querySelector('.menu');

  btn && btn.addEventListener('click', () => {
    menu.classList.toggle('menu-open');
    document.body.classList.toggle('menu-open');
  });

  document.querySelectorAll('.menu a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
    });
  });


// Formulário de contato
  document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("form-contato");
  const retorno = document.getElementById("retorno-form");
  const botao = form.querySelector(".btn-enviar");

  function mostrarMensagem(msg, tipo="sucesso") {
    retorno.textContent = msg;
    retorno.style.color = tipo === "erro" ? "red" : "green";
    retorno.style.opacity = 1;
    setTimeout(() => {
      retorno.style.transition = "opacity 0.5s";
      retorno.style.opacity = 0;
    }, 4000);
  }

  form.addEventListener("submit", async function(e) {
    e.preventDefault();
    botao.classList.add("loading");
    botao.textContent = "Enviando...";

    const data = {
      nome: form.nome.value,
      email: form.email.value,
      assunto: form.assunto.value,
      mensagem: form.mensagem.value,
    };

    try {
      const res = await fetch("/api/enviar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      mostrarMensagem(result.message, "sucesso");
      form.reset();
    } catch (err) {
      mostrarMensagem("❌ Erro ao enviar, tente novamente.", "erro");
      console.error(err);
    } finally {
      botao.classList.remove("loading");
      botao.textContent = "Enviar Mensagem";
    }
  });
});

 
// Animações com ScrollReveal
ScrollReveal({
  reset: false,         // anima apenas 1 vez, fica mais elegante
  distance: '30px',     // movimento menor e discreto
  duration: 1200,       // velocidade mais rápida (1.2s)
  delay: 100,           // leve atraso para dar ritmo
  easing: 'ease-in-out' // transição suave
});

// Animações por seção
ScrollReveal().reveal('.inicio', { origin: 'top' });
ScrollReveal().reveal('.secao-sobre', { origin: 'left' });
ScrollReveal().reveal('.curriculo', { origin: 'right' });
ScrollReveal().reveal('.portfolio', { origin: 'bottom' });
ScrollReveal().reveal('.contato', { origin: 'bottom' });

// Animação em cascata mais discreta
ScrollReveal().reveal('.card', { interval: 120, origin: 'bottom' });
ScrollReveal().reveal('.habilidade-card', { interval: 120, origin: 'bottom' });