// Sua chave de API pessoal do TMDb (substitua pela sua)
const apiKey = "adf1edea50a0a141b962b6ae2904c70e";

function formatarData(dataISO) {
  if (!dataISO) return "Data desconhecida";
  
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}


// Função principal chamada quando o botão "Buscar" é clicado
async function buscarFilme() {
  // Captura o valor digitado no input e remove espaços em branco extras
  const input = document.getElementById("inputFilme").value.trim();
  
  // Seleciona a div onde os resultados (cards dos filmes) serão exibidos
  const resultado = document.getElementById("resultado");

  // Limpa os resultados anteriores
  resultado.innerHTML = "";

  // Se o campo estiver vazio, exibe uma mensagem e para a função
  if (!input) {
    resultado.innerHTML = "<p>Digite o nome de um filme.</p>";
    return;
  }

  // Monta a URL da requisição para a API TMDb
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(input)}&language=pt-BR`;

  try {
    // Faz a requisição para a API usando fetch e espera o resultado
    const resposta = await fetch(url);

    // Converte a resposta para JSON
    const dados = await resposta.json();

    // Verifica se a API retornou algum resultado
    if (dados.results.length === 0) {
      resultado.innerHTML = "<p>Nenhum filme encontrado.</p>";
      return;
    }

    // Percorre cada filme retornado pela API
    dados.results.forEach(filme => {
      // Cria um elemento <div> para o card do filme
      const card = document.createElement("div");
      card.classList.add("card"); // Adiciona a classe "card" para estilização

      // Monta o caminho da imagem do pôster ou usa imagem genérica se não houver
      const imagem = filme.poster_path
        ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
        : "https://via.placeholder.com/200x300?text=Sem+Imagem";

      // Define o conteúdo HTML do card, com imagem, título e data de lançamento
      card.innerHTML = `
        <img src="${imagem}" alt="Poster do filme">
        <h3>${filme.title}</h3>
        <p>Lançamento: 📅 ${formatarData(filme.release_date)}</p>
      `;

      // Adiciona o card ao container de resultados
      resultado.appendChild(card);
    });

  } catch (erro) {
    // Em caso de erro na requisição, mostra mensagem de erro
    resultado.innerHTML = "<p>Erro ao buscar o filme.</p>";
    console.error(erro); // Mostra o erro no console para depuração
  }
}
