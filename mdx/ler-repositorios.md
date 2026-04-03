





em 2 de abril de 2026 no Vercel com typescript 6.0.2 next.js 16.2.3 como ler repositórios corretamente


+8
Para ler repositórios do GitHub corretamente em 2 de abril de 2026, utilizando Next.js 16.2.3, TypeScript 6.0.2 e
Vercel, a abordagem recomendada é utilizar a Octokit (biblioteca oficial do GitHub) dentro de Server Components ou Server Actions do Next.js (App Router), garantindo segurança e desempenho. 
Aqui está o guia passo a passo para configurar e ler repositórios:
1. Configuração e Instalação
No diretório do seu projeto Next.js (já com TS 6.0 e Next 16.2), instale a Octokit:
bash
npm install octokit
Use o código com cuidado.
2. Autenticação Segura (Vercel)
Nunca exponha seu token.
Crie um Personal Access Token no GitHub.
No painel da Vercel, vá em Project Settings > Environment Variables.
Adicione GITHUB_TOKEN com o valor do seu token. 
3. Criando o Cliente Octokit (TypeScript)
Crie um arquivo para gerenciar a conexão, preferencialmente usando ESM, compatível com as versões 2026 de TypeScript. 
typescript
// lib/github.ts
import { Octokit } from "octokit";

// O next.js 16+ no Vercel popula process.env automaticamente
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getRepoContents(owner: string, repo: string, path: string = "") {
  try {
    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
      // Define a versão da API para 2026-03-10 ou superior
      headers: {
        "X-GitHub-Api-Version": "2026-03-10", 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao ler repositório:", error);
    return null;
  }
}
Use o código com cuidado.
4. Lendo o Repositório no Next.js (App Router)
Use Server Components para buscar os dados diretamente no servidor antes de renderizar. 
tsx
// app/repos/[owner]/[repo]/page.tsx
import { getRepoContents } from "@/lib/github";

export default async function RepoPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const contents = await getRepoContents(params.owner, params.repo);

  if (!contents || !Array.isArray(contents)) {
    return <div>Repositório não encontrado ou vazio.</div>;
  }

  return (
    <ul>
      {contents.map((item) => (
        <li key={item.path}>{item.name} ({item.type})</li>
      ))}
    </ul>
  );
}
Use o código com cuidado.
Melhores Práticas para 2026
API Vercel/Next.js: Use next build --experimental-build-mode compile para otimizar o build TS 6.0.
Segurança: Mantenha o token no Vercel, nunca no frontend (.env.local apenas para dev local, .env.production no Vercel).
Octokit: Utilize octokit.paginate para ler repositórios grandes ou listar muitos arquivos.
Cache: Next.js 16 utiliza fetch automático ou unstable_cache para otimizar chamadas de API. 

2m
Next.js Tutorial 2026 - Start Your Next.js Journey Here


YouTube·ByteGrad
Scripting with the REST API and JavaScript - GitHub Docs
Instead of fetching all of the results at once, you can use octokit. paginate. iterator() to iterate through a single page at a time. For example, the following...

GitHub Docs

How to push files programatically to a ...
26 de dez. de 2019 — How to push files programatically to a repository using Octokit with Typescript. #github #api #typescript #octokit. I've always liked this word programatically,

DEV Community

Deploy Next.js to Vercel | Production Ready 2025 - YouTube
7 de dez. de 2025 — js. In this complete tutorial, you'll learn: ✅ Two ways to deploy (CLI and GitHub integration) ✅ Push to deploy with automatic preview URLs ✅ Setting up environ...

YouTube

Configuration: TypeScript - Next.js
9 de dez. de 2025 — js Configuration Files. You can use TypeScript and import types in your Next. js configuration by using next. config. ts . next.config.ts. import type { NextCon...

Next.js

Next.js 16.2
18 de mar. de 2026 — Next. js 16.2 * Faster Time-to-URL: ~400% faster next dev startup. * Faster Rendering: ~50% faster rendering. * New Default Error Page: Redesigned built-in 500 ...

Next.js

Typescript no Next.js : r/nextjs - Reddit
31 de jan. de 2026 — Meu chefe e eu passamos um tempo explorando a funcionalidade do Typescript no Next.js e descobrimos algumas coisas curiosas. Gostaria de ouvir pensamentos. Obse...

Reddit
Scripting with the REST API and JavaScript - GitHub Docs
Authenticating with a personal access token If you want to use the GitHub REST API for personal use, you can create a personal access token. For more informatio...

GitHub Docs

Entendendo variáveis de ambiente no NextJS
31 de out. de 2021 — Caso você tenha deployado sua aplicação Next na Vercel você poderá adicionar com facilidade os atributos das variáveis, indo na guia “Project Settings / Environ...

GitHub

Usando com Next.js
Buscar Dados Antecipadamente em Server Components Similar ao padrão de pré-renderização com dados padrão, com React Server Components (RSC) você pode ir ainda m...














https://docs.github.com/pt/rest/guides/scripting-with-the-rest-api-and-javascript?apiVersion=2026-03-10


Skip to main content
Documentos do GitHub
API REST/
Guias/
Script com JavaScript
Script em API REST e JavaScript
Escreva um script usando o SDK do Octokit.js para interagir com a API REST.

Neste artigo
Sobre o Octokit.js
Se você quiser escrever um script usando JavaScript para interagir com a API REST da GitHub, a GitHub recomenda que você use o SDK do Octokit.js. O Octokit.js é mantido pela GitHub. O SDK implementa as melhores práticas e facilita a interação com a API REST por meio do JavaScript. O Octokit.js funciona com todos os navegadores modernos, Node.js e Deno. Para obter mais informações sobre o Octokit.js, confira o arquivo LEIAME do Octokit.js.

Pré-requisitos
Este guia pressupõe que você esteja familiarizado com o JavaScript e a API REST da GitHub. Para obter informações sobre a API REST, confira Introdução à API REST.

Você precisa instalar e importar octokit para usar a biblioteca do Octokit.js. Este guia usa instruções de importação de acordo com o ES6. Para obter mais informações sobre diferentes métodos de instalação e importação, confira a seção de uso no README do Octokit.js.

Instanciação e autenticação
Aviso

Trate suas credenciais de autenticação como uma senha.

Para manter suas credenciais seguras, você pode armazená-las como um segredo e executar seu script por meio de GitHub Actions. Para saber mais, confira Usar segredos em ações do GitHub.

Você também pode armazenar suas credenciais como um segredo do Codespaces e executar seu script no Codespaces. Para saber mais, confira Gerenciando seus segredos específicos da conta no GitHub Codespaces.

Se essas opções não forem possíveis, considere usar outro serviço CLI para armazenar suas credenciais com segurança.

Autenticar com um personal access token
Se quiser usar a API REST do GitHub para uso pessoal, crie um personal access token. Para obter mais informações sobre como criar um personal access token, confira Gerenciar seus tokens de acesso pessoal.

Primeiro, importe Octokit de octokit. Em seguida, passe seu personal access token ao criar uma instância de Octokit. No exemplo a seguir, substitua YOUR-TOKEN por uma referência ao seu personal access token.

JavaScript
import { Octokit } from "octokit";

const octokit = new Octokit({ 
  auth: 'YOUR-TOKEN',
});
Autenticação com um GitHub App
Se você quiser usar a API em nome de uma organização ou de outro usuário, a GitHub recomenda que você use um GitHub App. Se um ponto de extremidade estiver disponível para GitHub Apps, a documentação de referência da API REST para esse ponto de extremidade indicará que tipo de token do GitHub App é necessário. Para saber mais, confira Registrando um aplicativo GitHub e Sobre a autenticação com um aplicativo GitHub.

Em vez de importar Octokit de octokit, importe App. No exemplo a seguir, substitua APP_ID por uma referência à ID do seu aplicativo. Substitua PRIVATE_KEY por uma referência à chave privada do seu aplicativo. Substitua INSTALLATION_ID pela ID de instalação do seu aplicativo em nome do qual deseja se autenticar. Você pode encontrar a ID do seu aplicativo e gerar uma chave privada na página de configurações do aplicativo. Para saber mais, confira Gerenciando chaves privadas para aplicativos GitHub. Você pode obter uma ID de instalação com os pontos de extremidade GET /users/{username}/installation, GET /repos/{owner}/{repo}/installation ou GET /orgs/{org}/installation. Para obter mais informações, confira Pontos de extremidade da API REST para o GitHub Apps.

JavaScript
import { App } from "octokit";

const app = new App({
  appId: APP_ID,
  privateKey: PRIVATE_KEY,
});

const octokit = await app.getInstallationOctokit(INSTALLATION_ID);
Autenticação em GitHub Actions
Se você quiser usar a API em um fluxo de trabalho de GitHub Actions, GitHub recomenda que você faça a autenticação com o GITHUB_TOKEN interno, em vez de criar um token. Você pode conceder permissões à GITHUB_TOKEN com a chave permissions. Para obter mais informações sobre GITHUB_TOKEN, confira GITHUB_TOKEN.

Se o fluxo de trabalho precisar acessar recursos fora do repositório dele, então você não poderá usar GITHUB_TOKEN. Nesse caso, armazene suas credenciais como um segredo e substitua GITHUB_TOKEN nos exemplos abaixo pelo nome do segredo. Para saber mais sobre segredos, confira Usar segredos em ações do GitHub.

Se usar a palavra-chave run para executar o script do JavaScript em seus fluxos de trabalho de GitHub Actions, você poderá armazenar o valor de GITHUB_TOKEN como uma variável de ambiente. Seu script pode acessar a variável de ambiente como process.env.VARIABLE_NAME.

Por exemplo, essa etapa do fluxo de trabalho armazena GITHUB_TOKEN em uma variável de ambiente chamada TOKEN:

- name: Run script
  env:
    TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: |
    node .github/actions-scripts/use-the-api.mjs
O script que o fluxo de trabalho executa usa process.env.TOKEN para se autenticar:

JavaScript
import { Octokit } from "octokit";

const octokit = new Octokit({ 
  auth: process.env.TOKEN,
});
Instanciação sem autenticação
Você pode usar a API REST sem autenticação, embora isso resulte em uma limitação de taxa mais baixa e não permita o uso de alguns endpoints. Para criar uma instância de Octokit sem autenticação, não passe o argumento auth.

JavaScript
import { Octokit } from "octokit";

const octokit = new Octokit({ );
Como fazer solicitações
O Octokit dá suporte a várias maneiras de fazer solicitações. Você pode usar o método request para fazer solicitações se souber o verbo HTTP e o caminho para o ponto de extremidade. Você pode usar o método rest se quiser aproveitar o preenchimento automático em seu IDE e digitar. Para pontos de extremidade paginados, você pode usar o método paginate para solicitar várias páginas de dados.

Como usar o método request para fazer solicitações
Para usar o método request a fim de fazer solicitações, passe o método HTTP e o caminho como o primeiro argumento. Passe quaisquer parâmetros de corpo, consulta ou caminho em um objeto como o segundo argumento. Por exemplo, para fazer uma solicitação GET para /repos/{owner}/{repo}/issues e passar os parâmetros owner, repo e per_page:

JavaScript
await octokit.request("GET /repos/{owner}/{repo}/issues", {
  owner: "github",
  repo: "docs",
  per_page: 2
});
O método request passa automaticamente o cabeçalho Accept: application/vnd.github+json. Para passar cabeçalhos adicionais ou um cabeçalho Accept diferente, adicione uma propriedade headers ao objeto que é passado como o segundo argumento. O valor da propriedade headers é um objeto onde os nomes dos cabeçalhos são as chaves e os valores correspondentes são os valores. Por exemplo, para enviar um cabeçalho content-type com o valor de text/plain e um cabeçalho x-github-api-version com o valor de 2026-03-10:

JavaScript
await octokit.request("POST /markdown/raw", {
  text: "Hello **world**",
  headers: {
    "content-type": "text/plain",
    "x-github-api-version": "2026-03-10",
  },
});
Como usar métodos endpoint rest para fazer solicitações
Cada ponto de extremidade da API REST tem um método de ponto de extremidade rest associado no Octokit. Esses métodos geralmente são preenchidos automaticamente em seu IDE para conveniência. Você pode passar qualquer parâmetro como um objeto para o método.

JavaScript
await octokit.rest.issues.listForRepo({
  owner: "github",
  repo: "docs",
  per_page: 2
});
Além disso, se estiver usando uma linguagem tipada, como TypeScript, você poderá importar tipos para usar com esses métodos. Para obter mais informações, confira a seção de TypeScript no README do plugin-rest-endpoint-methods.js.

Como fazer solicitações paginadas
Se o endpoint for paginado e você quiser recuperar mais de uma página de resultados, poderá usar o método paginate. paginate buscará a próxima página de resultados até chegar à última página e retornará todos os resultados como uma única matriz. Alguns pontos de extremidade retornam resultados paginados como matriz em um objeto, em vez de retornar os resultados paginados como uma matriz. paginate sempre retorna uma matriz de itens, mesmo que o resultado bruto tenha sido um objeto .

Por exemplo, o exemplo a seguir obtém todos os problemas do repositório github/docs. Embora solicite 100 solicitações por vez, a função não retornará até que a última página de dados seja atingida.

JavaScript
const issueData = await octokit.paginate("GET /repos/{owner}/{repo}/issues", {
  owner: "github",
  repo: "docs",
  per_page: 100,
  headers: {
    "x-github-api-version": "2026-03-10",
  },
});
O método paginate aceita uma função de mapa opcional, que pode ser usada para coletar apenas os dados desejados da resposta. Isso reduz o uso de memória pelo seu script. A função de mapa pode usar um segundo argumento, done, que pode ser chamado para encerrar a paginação antes que a última página seja alcançada. Isso permite que você busque um subconjunto de páginas. Por exemplo, o exemplo a seguir continua buscando resultados até que seja retornada uma questão que inclua "teste" no título. Para as páginas de dados que foram retornadas, apenas o título e o autor da questão são armazenados.

JavaScript
const issueData = await octokit.paginate("GET /repos/{owner}/{repo}/issues", {
  owner: "github",
  repo: "docs",
  per_page: 100,
  headers: {
    "x-github-api-version": "2026-03-10",
  },
},
    (response, done) => response.data.map((issue) => {
    if (issue.title.includes("test")) {
      done()
    }
    return ({title: issue.title, author: issue.user.login})
  })
);
Em vez de buscar todos os resultados de uma só vez, você pode usar octokit.paginate.iterator() para percorrer uma só página de cada vez. Por exemplo, o caso a seguir busca uma página de resultados por vez e processa cada objeto da página atual antes de buscar a próxima. Uma vez encontrado um problema com "teste" no título, o script interrompe a iteração e retorna o título e o autor do problema de cada objeto que foi processado. O iterador é o método mais eficiente em termos de memória para buscar dados paginados.

JavaScript
const iterator = octokit.paginate.iterator("GET /repos/{owner}/{repo}/issues", {
  owner: "github",
  repo: "docs",
  per_page: 100,
  headers: {
    "x-github-api-version": "2026-03-10",
  },
});

let issueData = []
let breakLoop = false
for await (const {data} of iterator) {
  if (breakLoop) break
  for (const issue of data) {
    if (issue.title.includes("test")) {
      breakLoop = true
      break
    } else {
      issueData = [...issueData, {title: issue.title, author: issue.user.login}];
    }
  }
}
Você também pode usar o método paginate com os métodos de endpoint rest. Passe o método de ponto de extremidade rest como o primeiro argumento. Passe todos os demais parâmetros como o segundo argumento.

JavaScript
const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
  owner: "github",
  repo: "docs",
  per_page: 100,
  headers: {
    "x-github-api-version": "2026-03-10",
  },
});
Para saber mais sobre a paginação, confira Como usar paginação na API REST.

Captura de erros
Capturando todos os erros
Às vezes, a API REST da GitHub retorna um erro. Por exemplo, um erro será exibido se o token de acesso tiver expirado ou se um parâmetro obrigatório for omitido. O Octokit.js faz automaticamente novas tentativas de executar a solicitação quando obtém um erro diferente de 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found ou 422 Unprocessable Entity. Se ocorrer um erro de API mesmo após novas tentativas, o Octokit.js gera um erro que inclui o código de status HTTP da resposta (response.status) e os cabeçalhos da resposta (response.headers). Você deve tratar esses erros em seu código. Por exemplo, você pode usar um bloco try/catch para capturar erros:

JavaScript
let filesChanged = []

try {
  const iterator = octokit.paginate.iterator("GET /repos/{owner}/{repo}/pulls/{pull_number}/files", {
    owner: "github",
    repo: "docs",
    pull_number: 22809,
    per_page: 100,
    headers: {
      "x-github-api-version": "2026-03-10",
    },
  });

  for await (const {data} of iterator) {
    filesChanged = [...filesChanged, ...data.map(fileData => fileData.filename)];
  }
} catch (error) {
  if (error.response) {
    console.error(`Error! Status: ${error.response.status}. Message: ${error.response.data.message}`)
  }
  console.error(error)
}
Tratamento de códigos de erro previstos
Às vezes, a GitHub usa um código de status 4xx para indicar uma resposta sem erro. Se o endpoint que você está usando fizer isso, você poderá adicionar tratamento adicional para erros específicos. Por exemplo, o endpoint GET /user/starred/{owner}/{repo} retornará 404 se o repositório não estiver marcado com estrela. O exemplo a seguir usa a resposta 404 para indicar que o repositório não foi estrelado; todos os demais códigos de erros são tratados como erros.

JavaScript
try {
  await octokit.request("GET /user/starred/{owner}/{repo}", {
    owner: "github",
    repo: "docs",
    headers: {
      "x-github-api-version": "2026-03-10",
    },
  });

  console.log(`The repository is starred by me`);

} catch (error) {
  if (error.status === 404) {
    console.log(`The repository is not starred by me`);
  } else {
    console.error(`An error occurred while checking if the repository is starred: ${error?.response?.data?.message}`);
  }
}
Tratamento de erros de limite de taxa
Se você receber um erro de limite de taxa, talvez seja necessário repetir a solicitação após aguardar um tempo. Quando você tem taxa limitada, a GitHub responde com um erro 403 Forbidden e o valor do cabeçalho de resposta x-ratelimit-remaining será "0". Os cabeçalhos de resposta incluirão um cabeçalho x-ratelimit-reset, que informa a hora em que a janela de limite de taxa atual é redefinida, em segundos UTC. Você pode repetir a solicitação após aguardar o tempo especificado por x-ratelimit-reset.

JavaScript
async function requestRetry(route, parameters) {
  try {
    const response = await octokit.request(route, parameters);
    return response
  } catch (error) {
    if (error.response && error.status === 403 && error.response.headers['x-ratelimit-remaining'] === '0') {
      const resetTimeEpochSeconds = error.response.headers['x-ratelimit-reset'];
      const currentTimeEpochSeconds = Math.floor(Date.now() / 1000);
      const secondsToWait = resetTimeEpochSeconds - currentTimeEpochSeconds;
      console.log(`You have exceeded your rate limit. Retrying in ${secondsToWait} seconds.`);
      setTimeout(requestRetry, secondsToWait * 1000, route, parameters);
    } else {
      console.error(error);
    }
  }
}

const response = await requestRetry("GET /repos/{owner}/{repo}/issues", {
    owner: "github",
    repo: "docs",
    per_page: 2
  })
Como usar a resposta
O método request retorna uma promessa que será resolvida para um objeto se a solicitação for bem-sucedida. As propriedades do objeto são data (o corpo da resposta retornado pelo ponto de extremidade), status (o código da resposta HTTP), url (a URL da solicitação) e headers (um objeto que contém os cabeçalhos da resposta). A menos que especificado de outra forma, o corpo da resposta está no formato JSON. Alguns endpoints não retornam um corpo de resposta; nesses casos, a propriedade data é omitida.

JavaScript
const response = await octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}", {
  owner: "github",
  repo: "docs",
  issue_number: 11901,
  headers: {
    "x-github-api-version": "2026-03-10",
  },
});

console.log(`The status of the response is: ${response.status}`)
console.log(`The request URL was: ${response.url}`)
console.log(`The x-ratelimit-remaining response header is: ${response.headers["x-ratelimit-remaining"]}`)
console.log(`The issue title is: ${response.data.title}`)
Da mesma forma, o método paginate retorna uma promessa. Se a solicitação tiver sido bem-sucedida, a promessa será resolvida para uma matriz de dados retornada pelo ponto de extremidade. Ao contrário do método request, o método paginate não retorna o código de status, a URL ou os cabeçalhos.

JavaScript
const data = await octokit.paginate("GET /repos/{owner}/{repo}/issues", {
  owner: "github",
  repo: "docs",
  per_page: 100,
  headers: {
    "x-github-api-version": "2026-03-10",
  },
});

console.log(`${data.length} issues were returned`)
console.log(`The title of the first issue is: ${data[0].title}`)
Script de exemplo
Aqui está um script de exemplo completo que usa o Octokit.js. O script importa Octokit e cria uma instância de Octokit. Se você quisesse se autenticar com um GitHub App em vez de um personal access token, você importaria e instanciaria App em vez de Octokit. Para obter mais informações, confira Como se autenticar com um GitHub App.

A função getChangedFiles obtém todos os arquivos alterados para uma solicitação de pull. A função commentIfDataFilesChanged chama a função getChangedFiles. Se qualquer um dos arquivos que a solicitação de pull alterou incluir /data/ no caminho, a função comentará sobre a solicitação de pull.

JavaScript
import { Octokit } from "octokit";

const octokit = new Octokit({ 
  auth: 'YOUR-TOKEN',
});

async function getChangedFiles({owner, repo, pullNumber}) {
  let filesChanged = []

  try {
    const iterator = octokit.paginate.iterator("GET /repos/{owner}/{repo}/pulls/{pull_number}/files", {
      owner: owner,
      repo: repo,
      pull_number: pullNumber,
      per_page: 100,
      headers: {
        "x-github-api-version": "2026-03-10",
      },
    });

    for await (const {data} of iterator) {
      filesChanged = [...filesChanged, ...data.map(fileData => fileData.filename)];
    }
  } catch (error) {
    if (error.response) {
      console.error(`Error! Status: ${error.response.status}. Message: ${error.response.data.message}`)
    }
    console.error(error)
  }

  return filesChanged
}

async function commentIfDataFilesChanged({owner, repo, pullNumber}) {
  const changedFiles = await getChangedFiles({owner, repo, pullNumber});

  const filePathRegex = new RegExp(/\/data\//, "i");
  if (!changedFiles.some(fileName => filePathRegex.test(fileName))) {
    return;
  }

  try {
    const {data: comment} = await octokit.request("POST /repos/{owner}/{repo}/issues/{issue_number}/comments", {
      owner: owner,
      repo: repo,
      issue_number: pullNumber,
      body: `It looks like you changed a data file. These files are auto-generated. \n\nYou must revert any changes to data files before your pull request will be reviewed.`,
      headers: {
        "x-github-api-version": "2026-03-10",
      },
    });

    return comment.html_url;
  } catch (error) {
    if (error.response) {
      console.error(`Error! Status: ${error.response.status}. Message: ${error.response.data.message}`)
    }
    console.error(error)
  }
}

await commentIfDataFilesChanged({owner: "github", repo: "docs", pullNumber: 191});
Próximas etapas
Para saber mais sobre o Octokit.js, confira a documentação do Octokit.js.
Para obter alguns exemplos da vida real, veja como o GitHub Docs usa o Octokit.js pesquisando o repositório do GitHub Docs.
Ajuda e suporte
Você encontrou o que precisava?

Política de privacidade
Ainda precisa de ajuda?
Pergunte à comunidade do GitHub
Contate o suporte
Legal
Parte desse conteúdo pode ser traduzida por computador ou IA.

© 2026 GitHub, Inc.
Termos
Privacidade
Status
Preços
Serviços especializados
Blog
Script em API REST e JavaScript - Documentos do GitHub







https://docs.github.com/pt/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2026-03-10



Skip to main content
Documentos do GitHub
API REST/
Usando a API REST/
Paginação
Como usar paginação na API REST
Saiba como navegar pelas respostas paginadas da API REST.

Neste artigo
Sobre paginação
Quando uma resposta da API REST incluir muitos resultados, GitHub paginará os resultados e retornará um subconjunto dos resultados. Por exemplo, GET /repos/octocat/Spoon-Knife/issues retornará apenas 30 problemas do repositório octocat/Spoon-Knife, embora o repositório inclua mais de 1600 problemas abertos. Isso facilita o manuseio da resposta tanto para os servidores quanto para as pessoas.

Você pode usar o cabeçalho de link da resposta para solicitar páginas adicionais de dados. Se um ponto de extremidade oferecer suporte ao parâmetro de consulta per_page, você poderá controlar quantos resultados são retornados em uma página.

Este artigo demonstra como solicitar páginas adicionais de resultados para respostas paginadas, como alterar o número de resultados retornados em cada página e como escrever um script para buscar várias páginas de resultados.

Como usar cabeçalhos de link
Quando uma resposta for paginada, os cabeçalhos de resposta incluirão um cabeçalho de link. O cabeçalho link será omitido se o ponto de extremidade não der suporte à paginação ou se todos os resultados couberem em uma única página.

O cabeçalho de link contém URLs que você pode usar para buscar páginas adicionais de resultados. Por exemplo, a página de resultados anterior, a seguinte, a primeira, e a última.

Para ver os cabeçalhos de resposta de um ponto de extremidade específico, você pode usar curl, GitHub CLI ou uma biblioteca que você está usando para fazer solicitações. Para ver os cabeçalhos de resposta se você estiver usando uma biblioteca para fazer solicitações, siga a documentação dessa biblioteca. Para ver os cabeçalhos de resposta se você estiver usando curl ou GitHub CLI, passe o sinalizador --include com sua solicitação. Por exemplo:

curl --include --request GET \
--url "https://api.github.com/repos/octocat/Spoon-Knife/issues" \
--header "Accept: application/vnd.github+json"
Se a resposta for paginada, o cabeçalho de link terá esta aparência:

link: <https://api.github.com/repositories/1300192/issues?page=2>; rel="prev", <https://api.github.com/repositories/1300192/issues?page=4>; rel="next", <https://api.github.com/repositories/1300192/issues?page=515>; rel="last", <https://api.github.com/repositories/1300192/issues?page=1>; rel="first"
O cabeçalho de link fornece a URL para a página anterior, a seguinte, a primeira e a última página de resultados:

A URL da página anterior é seguida por rel="prev".
A URL da próxima página é seguida por rel="next".
A URL da última página é seguida por rel="last".
A URL da primeira página é seguida por rel="first".
Em alguns casos, apenas um subconjunto desses links está disponível. Por exemplo, o link para a página anterior não será incluído se você estiver na primeira página de resultados e o link para a última página não será incluído se não puder ser calculado.

Você pode usar as URLs do cabeçalho de link para solicitar outra página de resultados. Por exemplo, para solicitar a última página de resultados com base no exemplo anterior:

curl --include --request GET \
--url "https://api.github.com/repositories/1300192/issues?page=515" \
--header "Accept: application/vnd.github+json"
As URLs no cabeçalho de link usam parâmetros de consulta para indicar qual página de resultados retornar. Os parâmetros de consulta nas URLs de link podem ser diferentes entre pontos de extremidade. No entanto, cada ponto de extremidade paginado usará os parâmetros de consulta page, before/after ou since. (Alguns endpoints usam o parâmetro since para algo diferente de paginação). Em todos os casos, você pode usar as URLs no cabeçalho link para buscar páginas adicionais de resultados. Para obter mais informações sobre parâmetros de consulta, confira Introdução à API REST.

Como alterar o número de itens por página
Se um ponto de extremidade der suporte ao parâmetro de consulta per_page, você poderá controlar quantos resultados são retornados em uma página. Para obter mais informações sobre parâmetros de consulta, confira Introdução à API REST.

Por exemplo, esta solicitação usa o parâmetro de consulta per_page para retornar dois itens por página:

curl --include --request GET \
--url "https://api.github.com/repos/octocat/Spoon-Knife/issues?per_page=2" \
--header "Accept: application/vnd.github+json"
O parâmetro per_page será incluído automaticamente no cabeçalho de link. Por exemplo:

link: <https://api.github.com/repositories/1300192/issues?per_page=2&page=2>; rel="next", <https://api.github.com/repositories/1300192/issues?per_page=2&page=7715>; rel="last"
Script com paginação
Em vez de copiar manualmente URLs do cabeçalho de link, você pode escrever um script para buscar várias páginas de resultados.

Os exemplos a seguir usam o JavaScript e a biblioteca Octokit.js do GitHub. Para obter mais informações sobre o Octokit.js, confira Introdução à API REST e o arquivo LEIAME do Octokit.js.

Exemplo de uso do método de paginação Octokit.js
Para buscar resultados paginados com Octokit.js, você pode usar octokit.paginate(). octokit.paginate() buscará a próxima página de resultados até chegar à última página e retornará todos os resultados como uma única matriz. Alguns pontos de extremidade retornam resultados paginados como matriz em um objeto, em vez de retornar os resultados paginados como uma matriz. octokit.paginate() sempre retorna uma matriz de itens, mesmo que o resultado bruto tenha sido um objeto .

Por exemplo, esse script obtém todos os problemas do repositório octocat/Spoon-Knife. Embora solicite 100 solicitações por vez, a função não retornará até que a última página de dados seja atingida.

JavaScript
import { Octokit } from "octokit";

const octokit = new Octokit({ );

const data = await octokit.paginate("GET /repos/{owner}/{repo}/issues", {
  owner: "octocat",
  repo: "Spoon-Knife",
  per_page: 100,
  headers: {
    "X-GitHub-Api-Version": "2026-03-10",
  },
});

console.log(data)
Você pode passar uma função de mapa opcional para octokit.paginate() para encerrar a paginação antes que a última página seja atingida ou para reduzir o uso de memória mantendo apenas um subconjunto da resposta. Você também pode usar octokit.paginate.iterator() para iterar uma única página por vez, em vez de solicitar todas as páginas. Para obter mais informações, confira a documentação do Octokit.js.

Exemplo de criação de um método de paginação
Se você estiver usando outro idioma ou biblioteca que não tenha um método de paginação, poderá criar seu próprio método de paginação. Este exemplo ainda usa a biblioteca de Octokit.js para fazer solicitações, mas não depende de octokit.paginate().

A função getPaginatedData faz uma solicitação para um endpoint com octokit.request(). Os dados da resposta são processados por parseData, que manipula casos em que nenhum dado é retornado ou casos em que os dados retornados são um objeto em vez de uma matriz. Os dados processados são acrescentados a uma lista que contém todos os dados paginados coletados até o momento. Se a resposta incluir um cabeçalho de link e se o cabeçalho de link incluir um link para a próxima página, a função usará um padrão RegEx (nextPattern) para obter a URL da próxima página. Em seguida, a função repete as etapas anteriores, agora usando essa nova URL. Quando o cabeçalho de link deixar de incluir um link para a próxima página, todos os resultados serão retornados.

JavaScript
import { Octokit } from "octokit";

const octokit = new Octokit({ );

async function getPaginatedData(url) {
  const nextPattern = /(?<=<)([\S]*)(?=>; rel="next")/i;
  let pagesRemaining = true;
  let data = [];

  while (pagesRemaining) {
    const response = await octokit.request(`GET ${url}`, {
      per_page: 100,
      headers: {
        "X-GitHub-Api-Version":
          "2026-03-10",
      },
    });

    const parsedData = parseData(response.data)
    data = [...data, ...parsedData];

    const linkHeader = response.headers.link;

    pagesRemaining = linkHeader && linkHeader.includes(`rel=\"next\"`);

    if (pagesRemaining) {
      url = linkHeader.match(nextPattern)[0];
    }
  }

  return data;
}

function parseData(data) {
  // If the data is an array, return that
    if (Array.isArray(data)) {
      return data
    }

  // Some endpoints respond with 204 No Content instead of empty array
  //   when there is no data. In that case, return an empty array.
  if (!data) {
    return []
  }

  // Otherwise, the array of items that we want is in an object
  // Delete keys that don't include the array of items
  delete data.incomplete_results;
  delete data.repository_selection;
  delete data.total_count;
  // Pull out the array of items
  const namespaceKey = Object.keys(data)[0];
  data = data[namespaceKey];

  return data;
}

const data = await getPaginatedData("/repos/octocat/Spoon-Knife/issues");

console.log(data);
Ajuda e suporte
Você encontrou o que precisava?

Política de privacidade
Ainda precisa de ajuda?
Pergunte à comunidade do GitHub
Contate o suporte
Legal
Parte desse conteúdo pode ser traduzida por computador ou IA.

© 2026 GitHub, Inc.
Termos
Privacidade
Status
Preços
Serviços especializados
Blog
Como usar paginação na API REST - Documentos do GitHub






octokit.js
The all-batteries-included GitHub SDK for Browsers, Node.js, and Deno.

The octokit package integrates the three main Octokit libraries

API client (REST API requests, GraphQL API queries, Authentication)
App client (GitHub App & installations, Webhooks, OAuth)
Action client (Pre-authenticated API client for single repository)
Table of contents
octokit.js
Features
Usage
Octokit API Client
Constructor options
Authentication
Proxy Servers (Node.js only)
Fetch missing
REST API
octokit.rest endpoint methods
octokit.request()
Pagination
Media Type formats
Request error handling
GraphQL API queries
Pagination
Schema previews
App client
GitHub App
Webhooks
OAuth
App Server
OAuth for browser apps
Action client
LICENSE
Features
Complete. All features of GitHub's platform APIs are covered.
Prescriptive. All recommended best practices are implemented.
Universal. Works in all modern browsers, Node.js, and Deno.
Tested. All libraries have a 100% test coverage.
Typed. All libraries have extensive TypeScript declarations.
Decomposable. Use only the code you need. You can build your own Octokit in only a few lines of code or use the underlying static methods. Make your own tradeoff between functionality and bundle size.
Extendable. A feature missing? Add functionalities with plugins, hook into the request or webhook lifecycle or implement your own authentication strategy.
Usage
Browsers	Load octokit directly from esm.sh
<script type="module">
import { Octokit, App } from "https://esm.sh/octokit";
</script>
Deno	Load octokit directly from esm.sh
import { Octokit, App } from "https://esm.sh/octokit?dts";
Node	
Install with npm/pnpm install octokit, or yarn add octokit

import { Octokit, App } from "octokit";
Important

As we use conditional exports, you will need to adapt your tsconfig.json by setting "moduleResolution": "node16", "module": "node16".

See the TypeScript docs on package.json "exports".
See this helpful guide on transitioning to ESM from @sindresorhus

Octokit API Client
standalone minimal Octokit: @octokit/core.

The Octokit client can be used to send requests to GitHub's REST API and queries to GitHub's GraphQL API.

Example: Get the username for the authenticated user.

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({ auth: `personal-access-token123` });

// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
const {
  data: { login },
} = await octokit.rest.users.getAuthenticated();
console.log("Hello, %s", login);
Constructor options
The most commonly used options are

name	type	description
userAgent	String	
Setting a user agent is required for all requests sent to GitHub's Platform APIs. The user agent defaults to something like this: octokit.js/v1.2.3 Node.js/v8.9.4 (macOS High Sierra; x64). It is recommend to set your own user agent, which will prepend the default one.

const octokit = new Octokit({
  userAgent: "my-app/v1.2.3",
});
authStrategy	Function	
Defaults to @octokit/auth-token.

See Authentication below.

auth	String or Object	
Set to a personal access token unless you changed the authStrategy option.

See Authentication below.

baseUrl	String	
When using with GitHub Enterprise Server, set options.baseUrl to the root URL of the API. For example, if your GitHub Enterprise Server's hostname is github.acme-inc.com, then set options.baseUrl to https://github.acme-inc.com/api/v3. Example

const octokit = new Octokit({
  baseUrl: "https://github.acme-inc.com/api/v3",
});
Advanced options

name	type	description
request	Object	
request.signal: Use an AbortController instance to cancel a request. abort-controller is an implementation for Node.
request.fetch: Replacement for built-in fetch method.
Node only

request.timeout sets a request timeout, defaults to 0
The request option can also be set on a per-request basis.

timeZone	String	
Sets the Time-Zone header which defines a timezone according to the list of names from the Olson database.

const octokit = new Octokit({
  timeZone: "America/Los_Angeles",
});
The time zone header will determine the timezone used for generating the timestamp when creating commits. See GitHub's Timezones documentation.

throttle	Object	
Octokit implements request throttling using @octokit/plugin-throttling

By default, requests are retried once and warnings are logged in case of hitting a rate or secondary rate limit.

{
  onRateLimit: (retryAfter, options, octokit) => {
    octokit.log.warn(
      `Request quota exhausted for request ${options.method} ${options.url}`
    );

    if (options.request.retryCount === 0) {
      // only retries once
      octokit.log.info(`Retrying after ${retryAfter} seconds!`);
      return true;
    }
  },
  onSecondaryRateLimit: (retryAfter, options, octokit) => {
    octokit.log.warn(
      `SecondaryRateLimit detected for request ${options.method} ${options.url}`
    );

    if (options.request.retryCount === 0) {
      // only retries once
      octokit.log.info(`Retrying after ${retryAfter} seconds!`);
      return true;
    }
  },
};
To opt-out of this feature:

new Octokit({ throttle: { enabled: false } });
Throttling in a cluster is supported using a Redis backend. See @octokit/plugin-throttling Clustering

retry	Object	
Octokit implements request retries using @octokit/plugin-retry

To opt-out of this feature:

new Octokit({ retry: { enabled: false } });
Authentication
By default, the Octokit API client supports authentication using a static token.

There are different means of authentication that are supported by GitHub, that are described in detail at octokit/authentication-strategies.js. You can set each of them as the authStrategy constructor option, and pass the strategy options as the auth constructor option.

For example, in order to authenticate as a GitHub App Installation:

import { createAppAuth } from "@octokit/auth-app";
const octokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: 1,
    privateKey: "-----BEGIN PRIVATE KEY-----\n...",
    installationId: 123,
  },
});

// authenticates as app based on request URLs
const {
  data: { slug },
} = await octokit.rest.apps.getAuthenticated();

// creates an installation access token as needed
// assumes that installationId 123 belongs to @octocat, otherwise the request will fail
await octokit.rest.issues.create({
  owner: "octocat",
  repo: "hello-world",
  title: "Hello world from " + slug,
});
You can use the App or OAuthApp SDKs which provide APIs and internal wiring to cover most use cases.

For example, to implement the above using App

const app = new App({ appId, privateKey });
const { data: slug } = await app.octokit.rest.apps.getAuthenticated();
const octokit = await app.getInstallationOctokit(123);
await octokit.rest.issues.create({
  owner: "octocat",
  repo: "hello-world",
  title: "Hello world from " + slug,
});
Learn more about how authentication strategies work or how to create your own.

Proxy Servers (Node.js only)
By default, the Octokit API client does not make use of the standard proxy server environment variables. To add support for proxy servers you will need to provide an https client that supports them such as undici.ProxyAgent().

For example, this would use a ProxyAgent to make requests through a proxy server:

import { fetch as undiciFetch, ProxyAgent } from 'undici';

const myFetch = (url, options) => {
  return undiciFetch(url, {
    ...options,
    dispatcher: new ProxyAgent(<your_proxy_url>)
  })
}

const octokit = new Octokit({
  request: {
     fetch: myFetch
  },
});
If you are writing a module that uses Octokit and is designed to be used by other people, you should ensure that consumers can provide an alternative agent for your Octokit or as a parameter to specific calls such as:

import { fetch as undiciFetch, ProxyAgent } from 'undici';

const myFetch = (url, options) => {
  return undiciFetch(url, {
    ...options,
    dispatcher: new ProxyAgent(<your_proxy_url>)
  })
}

octokit.rest.repos.get({
  owner,
  repo,
  request: {
    fetch: myFetch
  },
});
Fetch missing
If you get the following error:

fetch is not set. Please pass a fetch implementation as new Octokit({ request: { fetch }}).

It probably means you are trying to run Octokit with an unsupported version of NodeJS. Octokit requires Node 18 or higher, which includes a native fetch API.

To bypass this problem you can provide your own fetch implementation (or a built-in version like node-fetch) like this:

import fetch from "node-fetch";

const octokit = new Octokit({
  request: {
    fetch: fetch,
  },
});
REST API
There are two ways of using the GitHub REST API, the octokit.rest.* endpoint methods and octokit.request. Both act the same way, the octokit.rest.* methods are just added for convenience, they use octokit.request internally.

For example

await octokit.rest.issues.create({
  owner: "octocat",
  repo: "hello-world",
  title: "Hello, world!",
  body: "I created this issue using Octokit!",
});
Is the same as

await octokit.request("POST /repos/{owner}/{repo}/issues", {
  owner: "octocat",
  repo: "hello-world",
  title: "Hello, world!",
  body: "I created this issue using Octokit!",
});
In both cases a given request is authenticated, retried, and throttled transparently by the octokit instance which also manages the accept and user-agent headers as needed.

octokit.request can be used to send requests to other domains by passing a full URL and to send requests to endpoints that are not (yet) documented in GitHub's REST API documentation.

octokit.rest endpoint methods
Every GitHub REST API endpoint has an associated octokit.rest endpoint method for better code readability and developer convenience. See @octokit/plugin-rest-endpoint-methods for full details.

Example: Create an issue

await octokit.rest.issues.create({
  owner: "octocat",
  repo: "hello-world",
  title: "Hello, world!",
  body: "I created this issue using Octokit!",
});
The octokit.rest endpoint methods are generated automatically from GitHub's OpenAPI specification. We track operation ID and parameter name changes in order to implement deprecation warnings and reduce the frequency of breaking changes.

Under the covers, every endpoint method is just octokit.request with defaults set, so it supports the same parameters as well as the .endpoint() API.

octokit.request()
You can call the GitHub REST API directly using octokit.request. The request API matches GitHub's REST API documentation 1:1 so anything you see there, you can call using request. See @octokit/request for all the details.

Example: Create an issue

Screenshot of REST API reference documentation for Create an issue

The octokit.request API call corresponding to that issue creation documentation looks like this:

// https://docs.github.com/en/rest/reference/issues#create-an-issue
await octokit.request("POST /repos/{owner}/{repo}/issues", {
  owner: "octocat",
  repo: "hello-world",
  title: "Hello, world!",
  body: "I created this issue using Octokit!",
});
The 1st argument is the REST API route as listed in GitHub's API documentation. The 2nd argument is an object with all parameters, independent of whether they are used in the path, query, or body.

Pagination
All REST API endpoints that paginate return the first 30 items by default. If you want to retrieve all items, you can use the pagination API. The pagination API expects the REST API route as first argument, but you can also pass any of the octokit.rest.*.list* methods for convenience and better code readability.

Example: iterate through all issues in a repository

const iterator = octokit.paginate.iterator(octokit.rest.issues.listForRepo, {
  owner: "octocat",
  repo: "hello-world",
  per_page: 100,
});

// iterate through each response
for await (const { data: issues } of iterator) {
  for (const issue of issues) {
    console.log("Issue #%d: %s", issue.number, issue.title);
  }
}
Using the async iterator is the most memory efficient way to iterate through all items. But you can also retrieve all items in a single call

const issues = await octokit.paginate(octokit.rest.issues.listForRepo, {
  owner: "octocat",
  repo: "hello-world",
  per_page: 100,
});
Media Type formats
Media type formats can be set using mediaType: { format } on every request.

Example: retrieve the raw content of a package.json file

const { data } = await octokit.rest.repos.getContent({
  mediaType: {
    format: "raw",
  },
  owner: "octocat",
  repo: "hello-world",
  path: "package.json",
});
console.log("package name: %s", JSON.parse(data).name);
Learn more about Media type formats.

Request error handling
Standalone module: @octokit/request-error

For request error handling, import RequestError and use try...catch statement.

import { RequestError } from "octokit";
try {
  // your code here that sends at least one Octokit request
  await octokit.request("GET /");
} catch (error) {
  // Octokit errors are instances of RequestError, so they always have an `error.status` property containing the HTTP response code.
  if (error instanceof RequestError) {
    // handle Octokit error
    // error.message; // Oops
    // error.status; // 500
    // error.request; // { method, url, headers, body }
    // error.response; // { url, status, headers, data }
  } else {
    // handle all other errors
    throw error;
  }
}
GraphQL API queries
Octokit also supports GitHub's GraphQL API directly -- you can use the same queries shown in the documentation and available in the GraphQL explorer in your calls with octokit.graphql.

Example: get the login of the authenticated user

const {
  viewer: { login },
} = await octokit.graphql(`{
  viewer {
    login
  }
}`);
Variables can be passed as 2nd argument

const { lastIssues } = await octokit.graphql(
  `
    query lastIssues($owner: String!, $repo: String!, $num: Int = 3) {
      repository(owner: $owner, name: $repo) {
        issues(last: $num) {
          edges {
            node {
              title
            }
          }
        }
      }
    }
  `,
  {
    owner: "octokit",
    repo: "graphql.js",
  },
);
Pagination
GitHub's GraphQL API returns a maximum of 100 items. If you want to retrieve all items, you can use the pagination API.

Example: get all issues

const { allIssues } = await octokit.graphql.paginate(
  `
    query allIssues($owner: String!, $repo: String!, $num: Int = 10, $cursor: String) {
      repository(owner: $owner, name: $repo) {
        issues(first: $num, after: $cursor) {
          edges {
            node {
              title
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  `,
  {
    owner: "octokit",
    repo: "graphql.js",
  },
);
Learn more about GitHub's GraphQL Pagination usage.

Schema previews
Previews can be enabled using the {mediaType: previews: [] } option.

Example: create a label

await octokit.graphql(
  `mutation createLabel($repositoryId:ID!,name:String!,color:String!) {
  createLabel(input:{repositoryId:$repositoryId,name:$name}) {
    label: {
      id
    }
  }
}`,
  {
    repositoryId: 1,
    name: "important",
    color: "cc0000",
    mediaType: {
      previews: ["bane"],
    },
  },
);
Learn more about GitHub's GraphQL schema previews

App client
The App client combines features for GitHub Apps, Webhooks, and OAuth

GitHub App
Standalone module: @octokit/app

For integrators, GitHub Apps are a means of authentication and authorization. A GitHub app can be registered on a GitHub user or organization account. A GitHub App registration defines a set of permissions and webhooks events it wants to receive and provides a set of credentials in return. Users can grant access to repositories by installing them.

Some API endpoints require the GitHub app to authenticate as itself using a JSON Web Token (JWT). For requests affecting an installation, an installation access token has to be created using the app's credentials and the installation ID.

The App client takes care of all that for you.

Example: Dispatch a repository event in every repository the app is installed on

import { App } from "octokit";

const app = new App({ appId, privateKey });

for await (const { octokit, repository } of app.eachRepository.iterator()) {
  // https://docs.github.com/en/rest/reference/repos#create-a-repository-dispatch-event
  await octokit.rest.repos.createDispatchEvent({
    owner: repository.owner.login,
    repo: repository.name,
    event_type: "my_event",
    client_payload: {
      foo: "bar",
    },
  });
  console.log("Event dispatched for %s", repository.full_name);
}
Example: Get an octokit instance authenticated as an installation

const octokit = await app.getInstallationOctokit(123);
Learn more about apps.

Webhooks
Standalone module: @octokit/webhooks

When installing an app, events that the app registration requests will be sent as requests to the webhook URL set in the app's registration.

Webhook event requests are signed using the webhook secret, which is also part of the app's registration. You must verify that secret before handling the request payload.

The app.webhooks.* APIs provide methods to receiving, verifying, and handling webhook events.

Example: create a comment on new issues

import { createServer } from "node:http";
import { App, createNodeMiddleware } from "octokit";

const app = new App({
  appId,
  privateKey,
  webhooks: { secret },
});

app.webhooks.on("issues.opened", ({ octokit, payload }) => {
  return octokit.rest.issues.createComment({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    issue_number: payload.issue.number,
    body: "Hello, World!",
  });
});

// Your app can now receive webhook events at `/api/github/webhooks`
createServer(createNodeMiddleware(app)).listen(3000);
For serverless environments, you can explicitly verify and receive an event

await app.webhooks.verifyAndReceive({
  id: request.headers["x-github-delivery"],
  name: request.headers["x-github-event"],
  signature: request.headers["x-hub-signature-256"],
  payload: request.body,
});
Learn more about GitHub webhooks.

OAuth
Standalone module: @octokit/oauth-app

Both OAuth Apps and GitHub Apps support authenticating GitHub users using OAuth, see Authorizing OAuth Apps and Identifying and authorizing users for GitHub Apps.

There are some differences:

Only OAuth Apps support scopes. GitHub apps have permissions, and access is granted via installations of the app on repositories.
Only GitHub Apps support expiring user tokens
Only GitHub Apps support creating a scoped token to reduce the permissions and repository access
App is for GitHub Apps. If you need OAuth App-specific functionality, use OAuthApp instead.

Example: Watch a repository when a user logs in using the OAuth web flow

import { createServer } from "node:http";
import { App, createNodeMiddleware } from "octokit";

const app = new App({
  oauth: { clientId, clientSecret },
});

app.oauth.on("token.created", async ({ token, octokit }) => {
  await octokit.rest.activity.setRepoSubscription({
    owner: "octocat",
    repo: "hello-world",
    subscribed: true,
  });
});

// Your app can receive the OAuth redirect at /api/github/oauth/callback
// Users can initiate the OAuth web flow by opening /api/github/oauth/login
createServer(createNodeMiddleware(app)).listen(3000);
For serverless environments, you can explicitly exchange the code from the OAuth web flow redirect for an access token. app.oauth.createToken() returns an authentication object and emits the "token.created" event.

const { token } = await app.oauth.createToken({
  code: request.query.code,
});
Example: create a token using the device flow.

const { token } = await app.oauth.createToken({
  async onVerification(verification) {
    await sendMessageToUser(
      request.body.phoneNumber,
      `Your code is ${verification.user_code}. Enter it at ${verification.verification_uri}`,
    );
  },
});
Example: Create an OAuth App Server with default scopes

import { createServer } from "node:http";
import { OAuthApp, createNodeMiddleware } from "octokit";

const app = new OAuthApp({
  clientId,
  clientSecret,
  defaultScopes: ["repo", "gist"],
});

app.oauth.on("token", async ({ token, octokit }) => {
  await octokit.rest.gists.create({
    description: "I created this gist using Octokit!",
    public: true,
    files: {
      "example.js": `/* some code here */`,
    },
  });
});

// Your app can receive the OAuth redirect at /api/github/oauth/callback
// Users can initiate the OAuth web flow by opening /api/oauth/login
createServer(createNodeMiddleware(app)).listen(3000);
App Server
After registering your GitHub app, you need to create and deploy a server which can retrieve the webhook event requests from GitHub as well as accept redirects from the OAuth user web flow.

The simplest way to create such a server is to use createNodeMiddleware(), it works with both, Node's http.createServer() method as well as an Express middleware.

The default routes that the middleware exposes are

Route	Route Description
POST /api/github/webhooks	Endpoint to receive GitHub Webhook Event requests
GET /api/github/oauth/login	Redirects to GitHub's authorization endpoint. Accepts optional ?state and ?scopes query parameters. ?scopes is a comma-separated list of supported OAuth scope names
GET /api/github/oauth/callback	The client's redirect endpoint. This is where the token event gets triggered
POST /api/github/oauth/token	Exchange an authorization code for an OAuth Access token. If successful, the token event gets triggered.
GET /api/github/oauth/token	Check if token is valid. Must authenticate using token in Authorization header. Uses GitHub's POST /applications/{client_id}/token endpoint
PATCH /api/github/oauth/token	Resets a token (invalidates current one, returns new token). Must authenticate using token in Authorization header. Uses GitHub's PATCH /applications/{client_id}/token endpoint.
PATCH /api/github/oauth/refresh-token	Refreshes an expiring token (invalidates current one, returns new access token and refresh token). Must authenticate using token in Authorization header. Uses GitHub's POST https://github.com/login/oauth/access_token OAuth endpoint.
POST /api/github/oauth/token/scoped	Creates a scoped token (does not invalidate the current one). Must authenticate using token in Authorization header. Uses GitHub's POST /applications/{client_id}/token/scoped endpoint.
DELETE /api/github/oauth/token	Invalidates current token, basically the equivalent of a logout. Must authenticate using token in Authorization header.
DELETE /api/github/oauth/grant	Revokes the user's grant, basically the equivalent of an uninstall. must authenticate using token in Authorization header.
Example: create a GitHub server with express

import express from "express";
import { App, createNodeMiddleware } from "octokit";

const expressApp = express();
const octokitApp = new App({
  appId,
  privateKey,
  webhooks: { secret },
  oauth: { clientId, clientSecret },
});

expressApp.use(createNodeMiddleware(app));

expressApp.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});
OAuth for browser apps
You must not expose your app's client secret to the user, so you cannot use the App constructor. Instead, you have to create a server using the App constructor which exposes the /api/github/oauth/* routes, through which you can safely implement an OAuth login for apps running in a web browser.

If you set (User) Authorization callback URL to your own app, than you need to read out the ?code=...&state=... query parameters, compare the state parameter to the value returned by app.oauthLoginUrl() earlier to protect against forgery attacks, then exchange the code for an OAuth Authorization token.

If you run an app server as described above, the default route to do that is POST /api/github/oauth/token.

Once you successfully retrieved the token, it is also recommended to remove the ?code=...&state=... query parameters from the browser's URL

const code = new URL(location.href).searchParams.get("code");
if (code) {
  // remove ?code=... from URL
  const path =
    location.pathname +
    location.search.replace(/\b(code|state)=\w+/g, "").replace(/[?&]+$/, "");
  history.replaceState({}, "", path);

  // exchange the code for a token with your backend.
  // If you use https://github.com/octokit/oauth-app.js
  // the exchange would look something like this
  const response = await fetch("/api/github/oauth/token", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ code }),
  });
  const { token } = await response.json();
  // `token` is the OAuth Access Token that can be use

  const { Octokit } = await import("https://esm.sh/@octokit/core");
  const octokit = new Octokit({ auth: token });

  const {
    data: { login },
  } = await octokit.request("GET /user");
  alert("Hi there, " + login);
}
🚧 We are working on @octokit/auth-oauth-user-client to provide a simple API for all methods related to OAuth user tokens.

The plan is to add an new GET /api/github/oauth/octokit.js route to the node middleware which will return a JavaScript file that can be imported into an HTML file. It will make a pre-authenticated octokit Instance available.

Action client
standalone module: @octokit/action

🚧 A fully fledged Action client is pending. You can use @actions/github for the time being

LICENSE
MIT











action.js
GitHub API client for GitHub Actions

@latest Build Status

Usage
Browsers	
@octokit/action is not meant for browser usage.

Node	
Install with npm install @octokit/action

import { Octokit } from "@octokit/action";
Important

As we use conditional exports, you will need to adapt your tsconfig.json by setting "moduleResolution": "node16", "module": "node16".

See the TypeScript docs on package.json "exports".
See this helpful guide on transitioning to ESM from @sindresorhus

You can pass secret.GITHUB_TOKEN or any of your own secrets to a Node.js script. For example

name: My Node Action
on:
  - pull_request
jobs:
  my-action:
    runs-on: ubuntu-latest
    steps:
      # Check out code using git
      - uses: actions/checkout@v4
      # Install Node 20
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install @octokit/action
      # Node.js script can be anywhere. A good convention is to put local GitHub Actions
      # into the `.github/actions` folder
      - run: node .github/actions/my-script.js
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
Setting GITHUB_TOKEN on either with: or env: will work.

// .github/actions/my-script.js
import { Octokit } from "@octokit/action";

const octokit = new Octokit();

// `octokit` is now authenticated using GITHUB_TOKEN
Create an issue using REST API
import { Octokit } from "@octokit/action";

const octokit = new Octokit();
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

// See https://developer.github.com/v3/issues/#create-an-issue
const { data } = await octokit.request("POST /repos/{owner}/{repo}/issues", {
  owner,
  repo,
  title: "My test issue",
});
console.log("Issue created: %s", data.html_url);
You can also use octokit.issues.create({ owner, repo, title }). See the REST endpoint methods plugin for a list of all available methods.

Create an issue using GraphQL
import { Octokit } from "@octokit/action";

const octokit = new Octokit();
const eventPayload = require(process.env.GITHUB_EVENT_PATH);
const repositoryId = eventPayload.repository.node_id;

const response = await octokit.graphql(
  `
  mutation($repositoryId:ID!, $title:String!) {
    createIssue(input:{repositoryId: $repositoryId, title: $title}) {
      issue {
        number
      }
    }
  }
  `,
  {
    repositoryId,
    title: "My test issue",
  },
);
Hooks, plugins, and more
@octokit/action is build upon @octokit/core. Refer to its README for the full API documentation.

TypeScript: Endpoint method parameters and responses
Types for endpoint method parameters and responses are exported as RestEndpointMethodTypes. They keys are the same as the endpoint methods. Here is an example to retrieve the parameter and response types for octokit.checks.create()

import { RestEndpointMethodTypes } from `@octokit/action`;

type ChecksCreateParams =
  RestEndpointMethodTypes["checks"]["create"]["parameters"];
type ChecksCreateResponse =
  RestEndpointMethodTypes["checks"]["create"]["response"];
Proxy Servers
If you use self-hosted runners and require a proxy server to access internet resources then you will need to ensure that you have correctly configured the runner for proxy servers. @octokit/action will pick up the configured proxy server environment variables and configure @octokit/core with the correct request.dispatcher using ProxyAgent. If you need to supply a different request.dispatcher then you should ensure that it handles proxy servers if needed.

How it works
@octokit/action is simply a @octokit/core constructor, pre-authenticate using @octokit/auth-action.

The source code is … simple: src/index.ts.

License
MIT










https://undici.nodejs.org/#/docs/api/ProxyAgent






Node.js Undici
Home
new ProxyAgent([options])
Parameter: ProxyAgentOptions
ProxyAgent.close()
ProxyAgent.dispatch(options, handlers)
ProxyAgent.request(options[, callback])
API
Dispatcher
Client
H2CClient
Pool
BalancedPool
RoundRobinPool
Agent
ProxyAgent
Socks5Agent
RetryAgent
Connector
Errors
EventSource
Fetch
Global Installation
Cookies
MockClient
MockPool
MockAgent
SnapshotAgent
MockCallHistory
MockCallHistoryLog
MockErrors
API Lifecycle
Diagnostics Channel Support
Debug
WebSocket
MIME Type Parsing
CacheStorage
Util
RedirectHandler
RetryHandler
DiagnosticsChannel
EnvHttpProxyAgent
PoolStats
Examples
Undici Examples
Best Practices
Undici vs. Built-in Fetch
Proxy
Client Certificate
Writing Tests
Mocking Request
Crawling
Class: ProxyAgent
Extends: undici.Dispatcher

A Proxy Agent class that implements the Agent API. It allows the connection through proxy in a simple way.

new ProxyAgent([options])
Arguments:

options ProxyAgentOptions (required) - It extends the Agent options.
Returns: ProxyAgent

Parameter: ProxyAgentOptions
Extends: AgentOptions

It ommits AgentOptions#connect.

Note: When AgentOptions#connections is set, and different from 0, the non-standard proxy-connection header will be set to keep-alive in the request.

uri string | URL (required) - The URI of the proxy server. This can be provided as a string, as an instance of the URL class, or as an object with a uri property of type string. If the uri is provided as a string or uri is an object with an uri property of type string, then it will be parsed into a URL object according to the WHATWG URL Specification. For detailed information on the parsing process and potential validation errors, please refer to the "Writing" section of the WHATWG URL Specification.
token string (optional) - It can be passed by a string of token for authentication.
auth string (deprecated) - Use token.
clientFactory (origin: URL, opts: Object) => Dispatcher (optional) - Default: (origin, opts) => new Pool(origin, opts)
requestTls BuildOptions (optional) - Options object passed when creating the underlying socket via the connector builder for the request. It extends from Client#ConnectOptions.
proxyTls BuildOptions (optional) - Options object passed when creating the underlying socket via the connector builder for the proxy server. It extends from Client#ConnectOptions.
proxyTunnel boolean (optional) - For connections involving secure protocols, Undici will always establish a tunnel via the HTTP2 CONNECT extension. If proxyTunnel is set to true, this will occur for unsecured proxy/endpoint connections as well. Currently, there is no way to facilitate HTTP1 IP tunneling as described in https://www.rfc-editor.org/rfc/rfc9484.html#name-http-11-request. If proxyTunnel is set to false (the default), ProxyAgent connections where both the Proxy and Endpoint are unsecured will issue all requests to the Proxy, and prefix the endpoint request path with the endpoint origin address.
Examples:

import { ProxyAgent } from 'undici'

const proxyAgent = new ProxyAgent('my.proxy.server')
// or
const proxyAgent = new ProxyAgent(new URL('my.proxy.server'))
// or
const proxyAgent = new ProxyAgent({ uri: 'my.proxy.server' })
// or
const proxyAgent = new ProxyAgent({
  uri: new URL('my.proxy.server'),
  proxyTls: {
    signal: AbortSignal.timeout(1000)
  }
})
Copy CodeErrorCopied
Example - Basic ProxyAgent instantiation
This will instantiate the ProxyAgent. It will not do anything until registered as the agent to use with requests.

import { ProxyAgent } from 'undici'

const proxyAgent = new ProxyAgent('my.proxy.server')
Copy CodeErrorCopied
Example - Basic Proxy Request with global agent dispatcher
import { setGlobalDispatcher, request, ProxyAgent } from 'undici'

const proxyAgent = new ProxyAgent('my.proxy.server')
setGlobalDispatcher(proxyAgent)

const { statusCode, body } = await request('http://localhost:3000/foo')

console.log('response received', statusCode) // response received 200

for await (const data of body) {
  console.log('data', data.toString('utf8')) // data foo
}
Copy CodeErrorCopied
Example - Basic Proxy Request with local agent dispatcher
import { ProxyAgent, request } from 'undici'

const proxyAgent = new ProxyAgent('my.proxy.server')

const {
  statusCode,
  body
} = await request('http://localhost:3000/foo', { dispatcher: proxyAgent })

console.log('response received', statusCode) // response received 200

for await (const data of body) {
  console.log('data', data.toString('utf8')) // data foo
}
Copy CodeErrorCopied
Example - Basic Proxy Request with authentication
import { setGlobalDispatcher, request, ProxyAgent } from 'undici';

const proxyAgent = new ProxyAgent({
  uri: 'my.proxy.server',
  // token: 'Bearer xxxx'
  token: `Basic ${Buffer.from('username:password').toString('base64')}`
});
setGlobalDispatcher(proxyAgent);

const { statusCode, body } = await request('http://localhost:3000/foo');

console.log('response received', statusCode); // response received 200

for await (const data of body) {
  console.log('data', data.toString('utf8')); // data foo
}
Copy CodeErrorCopied
ProxyAgent.close()
Closes the proxy agent and waits for registered pools and clients to also close before resolving.

Returns: Promise<void>

Example - clean up after tests are complete
import { ProxyAgent, setGlobalDispatcher } from 'undici'

const proxyAgent = new ProxyAgent('my.proxy.server')
setGlobalDispatcher(proxyAgent)

await proxyAgent.close()
Copy CodeErrorCopied
ProxyAgent.dispatch(options, handlers)
Implements Agent.dispatch(options, handlers).

ProxyAgent.request(options[, callback])
See Dispatcher.request(options [, callback]).

Example - ProxyAgent with Fetch
This example demonstrates how to use fetch with a proxy via ProxyAgent. It is particularly useful for scenarios requiring proxy tunneling.

import { ProxyAgent, fetch } from 'undici';

// Define the ProxyAgent
const proxyAgent = new ProxyAgent('http://localhost:8000');

// Make a GET request through the proxy
const response = await fetch('http://localhost:3000/foo', {
  dispatcher: proxyAgent,
  method: 'GET',
});

console.log('Response status:', response.status);
console.log('Response data:', await response.text());
Copy CodeErrorCopied
Example - ProxyAgent with a Custom Proxy Server
This example shows how to create a custom proxy server and use it with ProxyAgent.

import * as http from 'node:http';
import { createProxy } from 'proxy';
import { ProxyAgent, fetch } from 'undici';

// Create a proxy server
const proxyServer = createProxy(http.createServer());
proxyServer.listen(8000, () => {
  console.log('Proxy server running on port 8000');
});

// Define and use the ProxyAgent
const proxyAgent = new ProxyAgent('http://localhost:8000');

const response = await fetch('http://example.com', {
  dispatcher: proxyAgent,
  method: 'GET',
});

console.log('Response status:', response.status);
console.log('Response data:', await response.text());
Copy CodeErrorCopied
Example - ProxyAgent with HTTPS Tunneling
This example demonstrates how to perform HTTPS tunneling using a proxy.

import { ProxyAgent, fetch } from 'undici';

// Define a ProxyAgent for HTTPS proxy
const proxyAgent = new ProxyAgent('https://secure.proxy.server');

// Make a request to an HTTPS endpoint via the proxy
const response = await fetch('https://secure.endpoint.com/api/data', {
  dispatcher: proxyAgent,
  method: 'GET',
});

console.log('Response status:', response.status);
console.log('Response data:', await response.json());
Copy CodeErrorCopied
Example - ProxyAgent as a Global Dispatcher
ProxyAgent can be configured as a global dispatcher, making it available for all requests without explicitly passing it. This simplifies code and is useful when a single proxy configuration applies to all requests.

import { ProxyAgent, setGlobalDispatcher, fetch } from 'undici';

// Define and configure the ProxyAgent
const proxyAgent = new ProxyAgent('http://localhost:8000');
setGlobalDispatcher(proxyAgent);

// Make requests without specifying the dispatcher
const response = await fetch('http://example.com');
console.log('Response status:', response.status);
console.log('Response data:', await response.text());
Copy CodeErrorCopied
Search
Node.js Undici
Home
new ProxyAgent([options])
Parameter: ProxyAgentOptions
ProxyAgent.close()
ProxyAgent.dispatch(options, handlers)
ProxyAgent.request(options[, callback])
API
Dispatcher
Client
H2CClient
Pool
BalancedPool
RoundRobinPool
Agent
ProxyAgent
Socks5Agent
RetryAgent
Connector
Errors
EventSource
Fetch
Global Installation
Cookies
MockClient
MockPool
MockAgent
SnapshotAgent
MockCallHistory
MockCallHistoryLog
MockErrors
API Lifecycle
Diagnostics Channel Support
Debug
WebSocket
MIME Type Parsing
CacheStorage
Util
RedirectHandler
RetryHandler
DiagnosticsChannel
EnvHttpProxyAgent
PoolStats
Examples
Undici Examples
Best Practices
Undici vs. Built-in Fetch
Proxy
Client Certificate
Writing Tests
Mocking Request
Crawling

Class: ProxyAgent
Extends: undici.Dispatcher

A Proxy Agent class that implements the Agent API. It allows the connection through proxy in a simple way.

new ProxyAgent([options])
Arguments:

options ProxyAgentOptions (required) - It extends the Agent options.
Returns: ProxyAgent

Parameter: ProxyAgentOptions
Extends: AgentOptions

It ommits AgentOptions#connect.

Note: When AgentOptions#connections is set, and different from 0, the non-standard proxy-connection header will be set to keep-alive in the request.

uri string | URL (required) - The URI of the proxy server. This can be provided as a string, as an instance of the URL class, or as an object with a uri property of type string. If the uri is provided as a string or uri is an object with an uri property of type string, then it will be parsed into a URL object according to the WHATWG URL Specification. For detailed information on the parsing process and potential validation errors, please refer to the "Writing" section of the WHATWG URL Specification.
token string (optional) - It can be passed by a string of token for authentication.
auth string (deprecated) - Use token.
clientFactory (origin: URL, opts: Object) => Dispatcher (optional) - Default: (origin, opts) => new Pool(origin, opts)
requestTls BuildOptions (optional) - Options object passed when creating the underlying socket via the connector builder for the request. It extends from Client#ConnectOptions.
proxyTls BuildOptions (optional) - Options object passed when creating the underlying socket via the connector builder for the proxy server. It extends from Client#ConnectOptions.
proxyTunnel boolean (optional) - For connections involving secure protocols, Undici will always establish a tunnel via the HTTP2 CONNECT extension. If proxyTunnel is set to true, this will occur for unsecured proxy/endpoint connections as well. Currently, there is no way to facilitate HTTP1 IP tunneling as described in https://www.rfc-editor.org/rfc/rfc9484.html#name-http-11-request. If proxyTunnel is set to false (the default), ProxyAgent connections where both the Proxy and Endpoint are unsecured will issue all requests to the Proxy, and prefix the endpoint request path with the endpoint origin address.
Examples:

import { ProxyAgent } from 'undici'

const proxyAgent = new ProxyAgent('my.proxy.server')
// or
const proxyAgent = new ProxyAgent(new URL('my.proxy.server'))
// or
const proxyAgent = new ProxyAgent({ uri: 'my.proxy.server' })
// or
const proxyAgent = new ProxyAgent({
  uri: new URL('my.proxy.server'),
  proxyTls: {
    signal: AbortSignal.timeout(1000)
  }
})
Copy CodeErrorCopied
Example - Basic ProxyAgent instantiation
This will instantiate the ProxyAgent. It will not do anything until registered as the agent to use with requests.

import { ProxyAgent } from 'undici'

const proxyAgent = new ProxyAgent('my.proxy.server')
Copy CodeErrorCopied
Example - Basic Proxy Request with global agent dispatcher
import { setGlobalDispatcher, request, ProxyAgent } from 'undici'

const proxyAgent = new ProxyAgent('my.proxy.server')
setGlobalDispatcher(proxyAgent)

const { statusCode, body } = await request('http://localhost:3000/foo')

console.log('response received', statusCode) // response received 200

for await (const data of body) {
  console.log('data', data.toString('utf8')) // data foo
}
Copy CodeErrorCopied
Example - Basic Proxy Request with local agent dispatcher
import { ProxyAgent, request } from 'undici'

const proxyAgent = new ProxyAgent('my.proxy.server')

const {
  statusCode,
  body
} = await request('http://localhost:3000/foo', { dispatcher: proxyAgent })

console.log('response received', statusCode) // response received 200

for await (const data of body) {
  console.log('data', data.toString('utf8')) // data foo
}
Copy CodeErrorCopied
Example - Basic Proxy Request with authentication
import { setGlobalDispatcher, request, ProxyAgent } from 'undici';

const proxyAgent = new ProxyAgent({
  uri: 'my.proxy.server',
  // token: 'Bearer xxxx'
  token: `Basic ${Buffer.from('username:password').toString('base64')}`
});
setGlobalDispatcher(proxyAgent);

const { statusCode, body } = await request('http://localhost:3000/foo');

console.log('response received', statusCode); // response received 200

for await (const data of body) {
  console.log('data', data.toString('utf8')); // data foo
}
Copy CodeErrorCopied
ProxyAgent.close()
Closes the proxy agent and waits for registered pools and clients to also close before resolving.

Returns: Promise<void>

Example - clean up after tests are complete
import { ProxyAgent, setGlobalDispatcher } from 'undici'

const proxyAgent = new ProxyAgent('my.proxy.server')
setGlobalDispatcher(proxyAgent)

await proxyAgent.close()
Copy CodeErrorCopied
ProxyAgent.dispatch(options, handlers)
Implements Agent.dispatch(options, handlers).

ProxyAgent.request(options[, callback])
See Dispatcher.request(options [, callback]).

Example - ProxyAgent with Fetch
This example demonstrates how to use fetch with a proxy via ProxyAgent. It is particularly useful for scenarios requiring proxy tunneling.

import { ProxyAgent, fetch } from 'undici';

// Define the ProxyAgent
const proxyAgent = new ProxyAgent('http://localhost:8000');

// Make a GET request through the proxy
const response = await fetch('http://localhost:3000/foo', {
  dispatcher: proxyAgent,
  method: 'GET',
});

console.log('Response status:', response.status);
console.log('Response data:', await response.text());
Copy CodeErrorCopied
Example - ProxyAgent with a Custom Proxy Server
This example shows how to create a custom proxy server and use it with ProxyAgent.

import * as http from 'node:http';
import { createProxy } from 'proxy';
import { ProxyAgent, fetch } from 'undici';

// Create a proxy server
const proxyServer = createProxy(http.createServer());
proxyServer.listen(8000, () => {
  console.log('Proxy server running on port 8000');
});

// Define and use the ProxyAgent
const proxyAgent = new ProxyAgent('http://localhost:8000');

const response = await fetch('http://example.com', {
  dispatcher: proxyAgent,
  method: 'GET',
});

console.log('Response status:', response.status);
console.log('Response data:', await response.text());
Copy CodeErrorCopied
Example - ProxyAgent with HTTPS Tunneling
This example demonstrates how to perform HTTPS tunneling using a proxy.

import { ProxyAgent, fetch } from 'undici';

// Define a ProxyAgent for HTTPS proxy
const proxyAgent = new ProxyAgent('https://secure.proxy.server');

// Make a request to an HTTPS endpoint via the proxy
const response = await fetch('https://secure.endpoint.com/api/data', {
  dispatcher: proxyAgent,
  method: 'GET',
});

console.log('Response status:', response.status);
console.log('Response data:', await response.json());
Copy CodeErrorCopied
Example - ProxyAgent as a Global Dispatcher
ProxyAgent can be configured as a global dispatcher, making it available for all requests without explicitly passing it. This simplifies code and is useful when a single proxy configuration applies to all requests.

import { ProxyAgent, setGlobalDispatcher, fetch } from 'undici';

// Define and configure the ProxyAgent
const proxyAgent = new ProxyAgent('http://localhost:8000');
setGlobalDispatcher(proxyAgent);

// Make requests without specifying the dispatcher
const response = await fetch('http://example.com');
console.log('Response status:', response.status);
console.log('Response data:', await response.text());
Copy CodeErrorCopied














































