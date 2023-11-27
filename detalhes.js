document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("senha") === "SENHA") {
    getJogador();
  } else {
    const erroLogin = document.createElement("h1");
    erroLogin.innerHTML = "É preciso estar logado para exibir detalhes";
    body.appendChild(erroLogin);
  }
});

const body = document.body;
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

function criaErroDetalhe() {
  const erroAtleta = document.createElement("h1");
  erroAtleta.innerHTML = "Atleta Não Encontrado(a)!!!";
  body.appendChild(erroAtleta);
}

function constroiAtleta(entrada) {
  const container_detalhe = document.createElement("article");
  const container_atleta = document.createElement("div");
  const container_descricao = document.createElement("div");

  const nome = document.createElement("h3");
  nome.innerHTML = entrada.nome;
  const imagem = document.createElement("img");
  imagem.src = entrada.imagem;
  imagem.alt = `foto de ${entrada.nome}`;
  const posicao = document.createElement("h3");
  posicao.innerHTML = entrada.posicao;

  const descricao = document.createElement("p");
  descricao.innerHTML = entrada.descricao;
  const nome_completo = document.createElement("p");
  nome_completo.innerHTML = `Nome Completo: ${entrada.nome_completo}`;
  const altura = document.createElement("p");
  altura.innerHTML = `Altura: ${entrada.altura}`;
  const nascimento = document.createElement("p");
  nascimento.innerHTML = `Nascimento: ${entrada.nascimento}`;

  container_atleta.appendChild(imagem);
  container_atleta.appendChild(nome);
  container_atleta.appendChild(posicao);

  container_detalhe.appendChild(container_atleta);

  container_descricao.appendChild(descricao);
  container_descricao.appendChild(nome_completo);
  container_descricao.appendChild(altura);
  container_descricao.appendChild(nascimento);

  container_detalhe.appendChild(container_descricao);

  body.appendChild(container_detalhe);
}

const pegaJson = async (caminho) => {
  const resposta = await fetch(caminho);
  const dados = await resposta.json();
  return dados;
};

const getJogador = async () => {
  const url = "https://botafogo-atletas.mange.li";
  const jogador = await pegaJson(`${url}/${id}`);
  if (jogador === `Não há atleta com o id ${id}.`) {
    criaErroDetalhe();
  } else {
    constroiAtleta(jogador);
  }
};
