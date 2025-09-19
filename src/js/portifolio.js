/**
 * Filtro de Portfólio
 */
(function () {
  const botoesFiltro = document.querySelectorAll(".filtro");
  const projetos = document.querySelectorAll(".projeto");

  botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
      // Remove a classe ativo de todos os botões
      botoesFiltro.forEach((b) => b.classList.remove("ativo"));
      // Adiciona ativo no botão clicado
      botao.classList.add("ativo");

      const categoria = botao.textContent.trim().toLowerCase();

      projetos.forEach((projeto) => {
        const tags = Array.from(
          projeto.querySelectorAll(".tags span")
        ).map((tag) => tag.textContent.toLowerCase());

        // Exibir todos
        if (categoria === "todos") {
          projeto.style.display = "block";
        } else {
          // Se a tag do projeto inclui a categoria escolhida
          if (tags.includes(categoria)) {
            projeto.style.display = "block";
          } else {
            projeto.style.display = "none";
          }
        }
      });
    });
  });
})();