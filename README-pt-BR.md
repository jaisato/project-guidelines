[中文版](./README-zh.md)
| [日本語版](./README-ja.md)
| [한국어](./README-ko.md)
| [РУССКИЙ](./README-ru.md)
| [ENGLISH](./README.md)

[<img src="./images/elsewhen-logo.png" width="180" height="180">](https://www.elsewhen.com/)

# Padrões de Projeto &middot; [![PRs são bem vindos](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://makeapullrequest.com)

> Enquanto desenvolver um novo projeto é apenas diversão para você, manter esse projeto pode ser um dos piores pesadelos para outra pessoa.
> Isso aqui é uma lista das padrões que encontramos, coletamos e escrevos que (para nós) funciona realmente bem com a maioria dos projetos JavaScript aqui na [elsewhen](https://www.elsewhen.com).
> Se você quer compartilhar alguma prática que considera importante ou acha que alguma das coisas descritas aqui deve ser removida, [Sinta se a vontade para nos dizer](https://makeapullrequest.com).

🔥 [Confira](https://github.com/elsewhencode/react-redux-saucepan) nosso [react redux projeto base](https://github.com/elsewhencode/react-redux-saucepan) em Flow com hot reloading e server-side rendering.

<hr>

- [Padrões de Projeto &middot; ![PRs são bem vindos](http://makeapullrequest.com)](#padr%C3%B5es-de-projeto-middot-prs-s%C3%A3o-bem-vindoshttpmakeapullrequestcom)
  - [1. Git](#1-git)
    - [1.1 Algumas regras do Git](#11-algumas-regras-do-git)
    - [1.2 Git workflow](#12-git-workflow)
    - [1.3 Escrevendo boas mensagens de commit](#13-escrevendo-boas-mensagens-de-commit)
  - [2. Documentação](#2-documenta%C3%A7%C3%A3o)
  - [3. Ambientes](#3-ambientes)
    - [3.1 Ambientes de dev consistentes:](#31-ambientes-de-dev-consistentes)
    - [3.2 Dependências consistentes:](#32-depend%C3%AAncias-consistentes)
  - [4. Dependências](#4-depend%C3%AAncias)
  - [5. Testes](#5-testes)
  - [6. Nomes e estrutura](#6-nomes-e-estrutura)
  - [7. Estilo de código](#7-estilo-de-c%C3%B3digo)
    - [7.1 Alguns padrões de estilo de código](#71-alguns-padr%C3%B5es-de-estilo-de-c%C3%B3digo)
    - [7.2 Force o code style](#72-force-o-code-style)
  - [8. Logging](#8-logging)
  - [9. API](#9-api)
    - [9.1 API design](#91-api-design)
    - [9.2 API security](#92-api-security)
    - [9.3 API documentation](#93-api-documentation)
  - [10. Licença](#10-licen%C3%A7a)

<a name="git"></a>

## 1. Git

![Git](/images/branching.png)
<a name="some-git-rules"></a>

### 1.1 Algumas regras do Git

Essas são algumas regras do Git para manter em mente:

- Trabalhe em uma feature branch.

  _Por que?:_

  > Porque desse jeito todo o código é criado isolado em uma branch específica ao invés de poluir a branch principal com trabalho em progresso. Isso vai permitir você abrir vários pull requets sem confusão. Você pode continuar com uma branch em progresso sem correr o risco de quebrar a branch principal com código instável. [Leia mais sobre...](https://www.atlassian.com/git/tutorials/comparing-workflows#feature-branch-workflow)

- Sempre comece uma nova branch a partir da `develop`

  _Por que?_

  > Desse jeito você pode garantir que o código na master vai estar sempre pronto para fazer build sem problemas e poderá ser usado a qualquer momento para fazer releases (isso pode ser exagero para alguns projetos).

- Nunca push direto na `develop` ou `master`. Sempre faça Pull Requests.

  _Por que?_

  > Isso permite outros membros do time saber que você terminou uma feature. Também possibilita code review e dicussões sobre o código que está prestes a ser introduzido no code base.

- Atualize sua `develop` local e faça rebase interativo antes de subir sua feature e abrir um Pull Request.

  _Por que?_

  > Rebase vai fazer um merge do branch destino do pull request e aplicar os commits que você tem localmente no topo da história sem criar um commit de merge (assumindo que não tem conflitos). Como resultado você tem uma história limpa no seu repositório. [Leia mais sobre ...](https://www.atlassian.com/git/tutorials/merging-vs-rebasing)

- Resolva os conflitos enquanto faz o rebase e antes de abrir o Pull Request.
- Delete feature branches, local e remoto, depois de realizar o merge.

  _Por que?_

  > Vai reduzir sua lista de branches removendo branches mortas. Vai granteir que você apenas faça o merge de uma branch uma única vez. Feature branches só devem existir enquanto o código ainda está em progresso.

- Antes de fazer um Pull Request, tenha certeza que sua feature branch está fazendo build corretamente e passando em todos os testes (incluindo os padrões de estilo de código).

  _Por que?_

  > Você está prestes a colocar seu código em uma branch estável. Se sua feature branch faz algum teste falahar, a chance é alta de que você vai quebrar o build na branch destino. Você também precisa conferir o code style antes de fazer um Pull Request. Isso contribui para legibilidade e reduz a chance de algum problema de formatação is para o code base com as outras alterações.

- Faça uso desse [this](./.gitignore) `.gitignore`.

  _Por que:_

  > É uma lista que já contém arquivos de sistemas que não devem ser enviados para o seu repositório remoto. E também exclui pastas de configuração e os arquivos comumente usado por editores e obviamente, também, pastas de dependência.

- Proteja (Bloqueie) a `develop` e `master`.

  _Por que?_

  > Protege suas branchs que devem, em teoria, estarem prontas para irem para produção de receberem códigos e mudanças irreversíveis. Leia mais sobre... [Github](https://help.github.com/articles/about-protected-branches/), [Bitbucket](https://confluence.atlassian.com/bitbucketserver/using-branch-permissions-776639807.html) e [GitLab](https://docs.gitlab.com/ee/user/project/protected_branches.html)

<a name="git-workflow"></a>

### 1.2 Git workflow

Devido a maioria dos motivos listados acima, nos usamos [Feature-branch-workflow](https://www.atlassian.com/git/tutorials/comparing-workflows#feature-branch-workflow) com [Interactive Rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing#the-golden-rule-of-rebasing) e alguns pontos do [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows#gitflow-workflow) (nomeação e ter uma develop branch). Os principais passos são:

- Em um projecto novo, inicialize o git na pasta do projeto. **Para qualquer features/changes ignore esse passo**.

  ```sh
  cd <pasta do projeto>
  git init
  ```

- Checkout para uma nova branch feature/bug-fix.
  ```sh
  git checkout -b <branchname>
  ```
- Faça as alterações.

  ```sh
  git add <arquivo1> <arquivo2> ...
  git commit
  ```

  _Por que?_

  > `git add <arquivo1> <arquivo2> ...` - Você deve add apenas arquivos com mudanças pequenas e concisas.

  > `git commit` Abrirá o editor, o que permite você separar o titulo da mensagem.

  > Leia mais sobre na _seção 1.3_.

  _Dica:_

  > Você poderia usar `git add -p`, o que te daria a chance de revisar todas as mudanças introduzidas, uma a uma, e decidir se inclui ou não naquele commit.

- Sincronize com as ultimas alterações no repositório remoto.
  ```sh
  git checkout develop
  git pull
  ```
  _Por que?_
  > Isso vai permitir que você lide com os conflitos na sua máquina local enquanto você faz o rebase (posteriormente) ao invés de criar um pull request com conflitos.

- Atualize sua feature branch com as ultimas alterações da develop usando rebase iterativo.
  ```sh
  git checkout <branchname>
  git rebase -i --autosquash develop
  ```

  _Por que?_
  > Você pode usar --autosquash para comprimir todos os seus commits em um único commit. Ninguém quer commits de desenvolvimento de uma feature na develop. [Leia mais sobre...](https://robots.thoughtbot.com/autosquashing-git-commits)

- Se você não tem conflitos, pule esse passo. Se você tem conflitos, [resolva-os](https://help.github.com/articles/resolving-a-merge-conflict-using-the-command-line/) e continue onrebase.
  ```sh
  git add <file1> <file2> ...
  git rebase --continue
  ```

- Push sua branch. Rebase vai alterar a história, então você precisa usar `-f` para forçar a mudança no branch remoto. Se tem mais alguém trabalhando na mesma branch, use o comando `--force-with-lease`.
  ```sh
  git push -f
  ```

  _Por que?_
  > Quando você faz rebase, você está mudando a história na sua feature branch. Então o git ira rejeitar seu `git push`. Para passar por isso você precisa usar -f ou --force flag. [Leia mais sobre...](https://developer.atlassian.com/blog/2015/04/force-with-lease/)

- Abra um Pull Request.
- Pull request deve ser aceito, mergiado e fechado por quem estiver revisando.
- Delete seu branch local se tiver terminado.

  ```sh
  git branch -d <nome do branch>
  ```

  Para remover todos os branchs que não existem no repositório remoto:

  ```sh
  git fetch -p && for branch in `git branch -vv --no-color | grep ': gone]' | awk '{print $1}'`; do git branch -D $branch; done
  ```

<a name="writing-good-commit-messages"></a>

### 1.3 Escrevendo boas mensagens de commit 

Ter um bom padrão para criar commits e se atentar a ele faz com que trabalhar com Git e colaborar com outros seja muito mais fácil. Aqui estão algumas boas práticas ([fonte](https://chris.beams.io/posts/git-commit/#seven-rules)):

- Separe o assunto e a mensagem com uma nova linha entre eles.

  _Por que?_

  > Git é inteligente o suficiente para identificar a primeira linha do seu commit como um resumo. Na verdade, se você tentar shortlog, ao invés de git log, você vai ver uma longa lista de mensagens de commits, com apenas o id e o resumo do commit.

- Máximo de 50 caracteres para o assunto e 72 para a mensagem.

  _Por que?_

  > Commits devem ser objetivos e claros, não é o momento para ser verboso. [Leia mais sobre...](https://medium.com/@preslavrachev/what-s-with-the-50-72-rule-8a906f61f09c)

- Capitalize a linha do assunto.
- Não use um ponto para finalizar a linha do assunto.
- Use [imperative mood](https://en.wikipedia.org/wiki/Imperative_mood) na linha do assunto.

  _Por que?_

  > É melhor que o commit diga o que vai acontecer no projeto depois daquele commit do que o que o que aconteceu dentro do commit em si. [Lei mais sobre...](https://news.ycombinator.com/item?id=2079612)

* Use a mensagem para explicar **o que** e **porque** ao invés de **como**.

<a name="documentation"></a>

## 2. Documentação

![Documentation](/images/documentation.png)

- Use esse [template](./README.sample.md) para `README.md`, sinta-se a vontade para adicionar seções que achar necessárias.
- Para projetos com mais de um repositório adicione todos os respctivos links nos `README.md` de todos os projetos.
- Mantenha o `README.md` enquanto o projeto evolui.
- Comente seu código. Tente sempre deixar claro o que uma grande parte do código tem a intenção de fazer.
- Se existe alguma referência em relação a forma como você resolveu o problema ou uma discussão em aberto, adicione os links.
- Não use comentários como desculpa para fazer um código ruim. Matenha seu código limpo.
- Não use código limpo como uma desculpa para não fazer nenhum comentário.
- Matenha apenas os comentários relevantes enquanto o código evolui.

<a name="environments"></a>

## 3. Ambientes

![Environments](/images/laptop.png)

- Defina ambientes de `desenvolvimento`, `testes` e `produção` separados.

  _Por que?_

  > Diferentes informações, dados, tokens, APIs, portas etc... podem ter que ser diferentes em cada ambiente. Você provavelmente vai querer isolar seu ambiente de `desenvolvimento` para fazer chamadas fake para a API que retornará dados previsíveis, tornando tanto os testes automatizados quanto os manuais muito mais fácil. Ou você pode querer ativar o Google Analytics apenas em `produção` e etc... [Leia mais sobre...](https://stackoverflow.com/questions/8332333/node-js-setting-up-environment-specific-configs-to-be-used-with-everyauth)

* Carregue suas configurações específicas de deploy de variáveis de ambiente e nunca as adicione no seu codebase como constantes, [veja aqui um exemplo](./config.sample.js).

  _Por que?_

  > Você terá tokens, senhas e outras informações sigilosas nessa configuração. Sua configuração deve ser corretamente separada da sua aplicação como se seu codebase pudesse se tornar público a qualquer momento.

  _Como?_

  > Arquivos `.env` para manter suas variáveis e então adicione-o ao `.gitignore` para ser excluído. Ao invés, commit um `.env.example` que servirá de modelo para outros desenvolvedores. Para produção, você deve setar suas variáveis no jeito padrão. [Leia mais sobre...](https://medium.com/@rafaelvidaurre/managing-environment-variables-in-node-js-2cb45a55195f)

* É recomendável validar suas variáveis de ambiente antes de inicializar sua aplicação. [De uma olhada nesse exemplo](./configWithTest.sample.js) usando `joi` para validar os valores.

  _Por que?_

  > Pode salvar todos de horas de "dor de cabeça".

<a name="consistent-dev-environments"></a>

### 3.1 Ambientes de dev consistentes:

- Defina sua versão do node em `engines` no `package.json`.

  _Por que?_

  > Permite que todos saibem em qual versão o projeto funciona. [Leia mais sobre...](https://docs.npmjs.com/files/package.json#engines)

- Adicionamente, use `nvm` e crie um arquivo `.nvmrc` na raíz do seu projeto. Não se esqueça de menciona-lo na sua documentação.

  _Por que?_

  > Qualque pessoa que usar `nvm` pode apenas rodar `nvm use` para trocar para a versão correta. [leia mais sobre...](https://github.com/creationix/nvm)

- É uma boa ideia criar um script `preinstall` para conferir as versões do node e do npm.

  _Por que?_

  > Algumas dependências podem falhar quando instaladas por versões mais recentes do NPM.

- Use Docker se puder.

  _Por que?_

  > Te dará um ambiente estável durante todo o workflow. Sem muita necessidade de lidar com dependências e configurações. [leia mais sobre...](https://hackernoon.com/how-to-dockerize-a-node-js-application-4fbab45a0c19)

- Use local modules ao invés de modules instalados globalmente.

  _Por que?_

  > Você estará compartilhando suas dependências com os outros ao invés de esperar que eles a tenham instalado globalmente.

<a name="consistent-dependencies"></a>

### 3.2 Dependências consistentes:

- Garanta que seus colegas de equipe obtenham exatamente a mesma versão de dependências que você.

  _Por que?_

  > Porque você quer que se código tenha o mesmo comportamento em qualquer máquina de desenvolvimento [leia mais sobre...](https://medium.com/@kentcdodds/why-semver-ranges-are-literally-the-worst-817cdcb09277)

  _Como?_

  > Use `package-lock.json` a partir do `npm@5`

  _E se eu não tenho npm@5?_

  > Uma alternativa pode ser o `Yarn` e não se esqueça de mencionar o seu uso no `README.md`. Seu lock file e o `package.json` devem manter as mesmas versões após cada atualização. [leia mais sobre...](https://yarnpkg.com/en/)

  _E se eu não gosto do nome `Yarn`?_

  > Que pena. Para versões antigas do `npm`, use `—save --save-exact` quando instalando novas dependências e criando um `npm-shrinkwrap.json` antes de publicar. [Leia mais sobre...](https://docs.npmjs.com/files/package-locks)

<a name="dependencies"></a>

## 4. Dependências

![Github](/images/modules.png)

- Acompanhe seus pacoes disponíveis atualmente: e.g., `npm ls --depth=0`. [Leia mais sobre...](https://docs.npmjs.com/cli/ls)
- Confira se algum dos seus pacotes não está em uso ou se tornou irrelevante: `depcheck`. [Leia mais sobre...](https://www.npmjs.com/package/depcheck)

  _Por que?_

  > Você pode estar fazendo o bundle final ficar maior com bibliotecas não usadas. Identifique essas bibliotecas não usadas e se livre delas.

- Antes de começar a usar uma dependência, confira o quanto ela é usada pela comunidade: `npm-stat`. [Leia mais sobre...](https://npm-stat.com/)

  _Por que?_

  > Maior uso geralmente significa mais contribuidores, o que leva a deduzir que possui melhor manutenção, o que tudo isso junto leva a concluir que bugs serão encontrados mais facilmente e resolvidos rapidamente.

- Antes de usar uma dependência, confira se possui uma versão madura o suficiente com um grande número de pessoas mantendo: e.g., `npm view async`. [Leia mais sobre...](https://docs.npmjs.com/cli/view)

  _Por que?_

  > Ter muitos contribuidores não var ser tão efetivo quando se os mantenedores não fizerem os merge fixes e patches rápido.

- Se você precisa de uma dependência menos conhecida, discuta com o time antes de usa-la.
- Sempre tenha certeza que sua aplicação funciona com a ultima versão das dependências: `npm outdated`. [Leia mais sobre...](https://docs.npmjs.com/cli/outdated)

  _Por que?_

  > Atualização de dependência as vezes possuem 'breaking changes'. Sempre confira a descrição da nova versão sempre que sair, isso faz com que lidar com os possíveis problemas seja mais fáceis. Use uma dessas ferramentas maneiras, como: [npm-check-updates](https://github.com/tjunnone/npm-check-updates).

- Confira problemas de segurança com a dependência que você quer adicionar, e.g., [Snyk](https://snyk.io/test?utm_source=risingstack_blog).

<a name="testing"></a>

## 5. Testes

![Testes](/images/testing.png)

- Tenha um ambiente the `test` se necessário

  _Por que?_

  > Embora algumas vezes testes end to end em `produção` possam parecer suficientes, existem algumas exceções: Um exemplo é que você não vai querer colocar dados analíticos em `produção` e assim poluir o dashboard de alguém com dados de teste. Outro exemplo é que sua API pode ter algumas limitações enquanto em `produção` e chamadas de teste depois de uma certa quantidade.

- Coloque os arquivos de teste junto com os arquivos a serem testados usando a convenção `*.test.js` ou `*.spec.js` para nomear os arquivos, como `moduleName.spec.js`.

  _Por que?_

  > Você não quer ter que navegar em várias pastas para achar um teste unitário. [Leia mais sobre...](https://hackernoon.com/structure-your-javascript-code-for-testability-9bc93d9c72dc)

* Coloque seus arquivos de testes adicionais em uma pasta separada para evitar confusão.

  _Por que?_

  > Alguns arquivos de testes não tem nenhuma relação com qualquer outro arquivo. Você deve coloca-los em uma pasta fácil de ser encontrada pelos outros desenvolvedores do time, como por exemplo: Uma pasta `__test__`. Essa nomeação é padrão e reconhecida pela maioria de frameworks de teste de JavaScript.

* Escreva código testável, evite efeitos colaterais (side effects), escreva funções puras

  _Por que?_

  > Você vai querer testar uma regra de negócio como uma unidade separada. Voce tem que "minimizar o impacto de aleatoriedade e processos não determinísticos no seu código". [Leia mais sobre...](https://medium.com/javascript-scene/tdd-the-rite-way-53c9b46f45e3)

  > Uma função pura é uma função que sempre retorna o mesmo valor para uma entrada específica. Por outro lado, uma função impura é uma função que pode ter efeitos colaterais e depender de condições externas para retornar algum valor. Isso reduz a capacidade de prever o que o código vai realizar. [Leia mais sobre...](https://hackernoon.com/structure-your-javascript-code-for-testability-9bc93d9c72dc)

* Use uma checagem de tipo estática

  _Por que?_

  > As vezes você vai precisar de checagem de tipo estática. O que também aumenta a regidibilidade e legibilidade do seu código. [Leia mais sobre...](https://medium.freecodecamp.org/why-use-static-types-in-javascript-part-1-8382da1e0adb)

- Rode os testes localmente antes de abrir um pull request para  `develop`.

  _Por que?_

  > Você não quer ser a pessoa a fazer a branch com código pronto para produção parar de funcionar. Rode seus teste depois que fizer `rebase` e antes de fazer push para sua feature branch.

- Documente seus testes incluindo instruções importantes em uma seção no arquivo `README.md`.

  _Por que?_

  > Vai ser de muita ajuda para outros desenvolvedores, DevOps, QA ou qualquer um que tiver a sorte de trabalhar com seu código.

<a name="structure-and-naming"></a>

## 6. Nomes e estrutura

![Structure and Naming](/images/folder-tree.png)

- Organize seus arquivos considerando feature / páginas / componentes. E também, coloque os arquivos de teste próximos à implementação..

    **Ruim**

    ```
    .
    ├── controllers
    |   ├── product.js
    |   └── user.js
    ├── models
    |   ├── product.js
    |   └── user.js
    ```

    **Bom**

    ```
    .
    ├── product
    |   ├── index.js
    |   ├── product.js
    |   └── product.test.js
    ├── user
    |   ├── index.js
    |   ├── user.js
    |   └── user.test.js
    ```

    _Por que?_
    > Ao invés de uma longa lista de arquivos você estará criando pequenos modulos encapsulando responsabilidades e seus respectivos testes. Fica muito mais fácil de se navegar e as coisas podem ser facilmente encontradas.

- Use uma pasta com o nome `./config` e **não** crie arquivos de configuração diferente para cada ambiente.

  _Por que?_

  > Quando você distribuí as configurações em arquivos com propósitos diferentes (database, API e etc); Coloca-los em uma pasta com o nome fácil de reconhecer como `config` faz sentido. Apenas se lembre de não criar arquivos de configuração diferentes para cada ambiente. Isso não escala, cada novo deploy diferente que se faz necessário, novos nomes de ambientes são criados.
  > Valores para serem usados por arquivos de configuração devem ser providos através de variáveis de ambiente. [Leia mais sobre...](https://medium.com/@fedorHK/no-config-b3f1171eecd5)

* Coloque seus scripts em uma pasta nomeada `./scripts`. Isso vale para `bash` e `node`.

  _Por que?_

  > É bem provável que você vai acabar com mais de um script, build de produção, build de dev, database feeders, database sync e etc...

- Direcione os arquivos de output do build em uma pasta nomeada `./build`. Adicione `build/` no `.gitignore`.

  _Por que?_

  > Dê o nome que você achar conveniente, `dist` também é uma boa opção. Mas tenha a certeza de manter isso consistente com os projetos do time. Os arquivos que vão para essa pasta são gerados automaticamente (bundled, compiled, transpiled) ou movidos automaticamente para lá. O que você pode gerar, qualquer um no time deve ser capaz de gerar também, então não faz nenhum sentido comitar isso para o repositório. A não ser que você realmente queira muito fazer isso.

<a name="code-style"></a>

## 7. Estilo de código

![Code style](/images/code-style.png)

<a name="code-style-check"></a>

### 7.1 Alguns padrões de estilo de código

- Use stage-2 e sintaxe moderna de JavaScript nos seus novos projetos. Para os projetos antigos, mantenha a consistência, a não ser que modernizar o projeto seja o objetivo.

  _Por que?_

  > É claro, isso só depende de você. Nós usamos transpilers para tirar vantagem de novas sintaxes. stage-2 é bem provável de se tornar parte da especificação em alguma revisão.

- Inclua alguma conferência automática de padrão de código no seu build.

  _Por que?_

  > Quebrar o build é uma forma de forçar os padrões de código. Evite que não seja levado a sério. Faça isso tanto para o backend quanto para o front. [Leia mais sobre...](https://www.robinwieruch.de/react-eslint-webpack-babel/)

- Use [ESLint - Pluggable JavaScript linter](https://eslint.org/) para garantir que os padrões serão seguidos.

  _Por que?_

  > Nós simplesmente preferimos `eslint`, você não precisa necessariamente. `eslint` da suporte a mais regras, a possibilidade de configura-las e criar regras customizadas.

- Nós usamos [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) para JavaScript, [Leia mais sobre](https://www.gitbook.com/book/duk/airbnb-javascript-guidelines/details). Escolha os padrões necessário para seu projeto.

- Usamos [Flow type style check rules for ESLint](https://github.com/gajus/eslint-plugin-flowtype) ao usar [FlowType](https://flow.org/).

  _Por que?_

  > Flow usa algumas sintaxes que também precisam de seguir um padrão.

- Use `.eslintignore` para excluir os arquivos que devem ser ignorados pelas regras.

  _Por que?_

  > Você não precisa poluir seu código com comentários como `eslint-disable` toda vez que quiser desabilitar alguma regra em um certo arquivo.

- Remova todos `eslint-disable` antes de fazer um pull request.

  _Por que?_

  > É normal desabilitar o `eslint` para focar na lógica de uma parte do código. Apenas se lembre de remover o `eslint-disable` quando terminar.rules.

- Dependendo do tamanho da task, use comentários com `//TODO:` para ajudar na criação de novas tasks para o backlog.

  _Por que?_

  > Você vai deixar um lembrete para os outros, e para você mesmo, de pequenas tarefas ou correções (como refatorar uma função ou atualizar um comentário). Para tarefas maiores escreva `//TODO(#3456)` fazendo referência ao ticket aberto no backlog para aquela task.

* Sempre faça comentários relevantes. Delete código morto ou comentado.

  _Por que?_

  > Você deve prezar pela legibilidade do seu código, então se livre de qualquer distração possível no código. Se você refatorou uma função, não deixe a antiga lá apenas comentada, delete-a.

* Evite comentários irrelevantes, engraçados ou ofensivos.

  _Por que?_

  > Mesmo que seu processo de build possa remove-los, as vezes seu código pode ser pego por alguém diferente, uma empresa terceirizada ou um chefe de outra área e isso pode não ser tão tranquilo.

* Use nomes com significados, fáceis de pesquisar e sem abreviações para suas variáveis ou funções. O nome de uma função deve ser um verbo ou uma frase e precisa de deixar claro a sua intenção.

  _Por que?_

  > Faz com que o seu código seja mais legível e natual.

<a name="enforcing-code-style-standards"></a>

### 7.2 Force o code style

- Use o arquivo [.editorconfig](https://editorconfig.org/) para ajudar a definir e manter a consistência de estilo de código entre diferentes editores e IDE.

  _Por que?_

  > O EditorConfig consiste em um arquivo para edição de estilo de código e declaração de plugins para habilitar o editor a ler os arquivos em um determinado formato e  formarta-los de acordo com o esperado. EditorConfig são fáceis de ler e funcionam muito bem com sistemas de controle de versão.

- Configure seu editor para alertar sobre erros de estilo de código. Use [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) e [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) com seu arquivo ESLint já existente. [Leia mais sobre...](https://github.com/prettier/eslint-config-prettier#installation)

- Considere usar Git Hooks.

  _Por que?_

  > Git hooks aumentam de forma expressiva a produtividade do desenvolvedor. Faça alterações, commit e push sem o medo de quebrar o código pronto para produção. [Leia mais sobre...](http://githooks.com/)

- Use Prettier com o precommit hook.

  _Por que?_

  > O `prettier` por si só pode ser bem poderoso porém, não é muito produtivo rodar uma npm task sozinha toda hora só para formatar o código. É então que o `lint-staged` (e o `husky`) entram em ação. Leia mais sobre como configurar o  `lint-staged` [aqui](https://github.com/okonet/lint-staged#configuration) e sobre o  `husky` [aqui](https://github.com/typicode/husky).

<a name="logging"></a>

## 8. Logging

![Logging](/images/logging.png)

- Evite console logs no client-side em produção

  _Por que?_

  > Mesmo que o seu processo de compilação possa (e deva) se livrar deles, certifique-se de que seu lint de código avise sobre os console logs restantes.

- Crie logs de produção legíveis. O ideal é utilizar bibliotecas de log em produção (como, por exemplo [winston](https://github.com/winstonjs/winston) ou
  [node-bunyan](https://github.com/trentm/node-bunyan)).

      _Por que?_
      > Ele torna sua solução de problemas mais agradável com sistema de cores, data e hora, registra em um arquivo além do console e até mesmo pode atualizar o arquivo diariamente. [saiba mais...](https://blog.risingstack.com/node-js-logging-tutorial/)

<a name="api"></a>

## 9. API

<a name="api-design"></a>

![API](/images/api.png)

### 9.1 API design

_Por que?_

  > Queremos promover o desenvolvimento de RESTful interfaces bem construídas, fazendo com que o consumo por clientes e pelo time seja simples e consistente.

_Por que?_

  > Falta de consistência e simplicidade podem aumentar de forma expressiva os custos de manutenção e integração. E por isso `API design` está nesse documento.

- Devemos seguir o padrão orientado a recursos. O qual tem 3 principais fatore: recursos, coleçÕes, e URLs.

  - Um recurso possui dados, gets aninhados, e methods para permitir operações.
  - Um grupo de recursos é chamado coleção.
  - URL identifica a localização online de um recurso ou coleção.

  _Por que?_

  > Esse é um padrão muito bem conhecido por desenvolvedores (os principais consumidores de sua API). Fora o fato de ser fácil de usar e ler, permite-nos escrever bibliotecas genéricas e conectores sem ao menos precisar saber sobre o que a API é.

- use kebab-case para as URLs.
- use camelCase para os parâmetros na query string ou campo de recursos.
- use o plural do kebab-case nome dos recursos na URL.

- Sempre use o plural para nomear algum recurso na URL ou coleção: `/users`.

  _Por que?_

  > Basicamente, é melhor para ler e torna a URL mais consistente. [Leia mais sobre...](https://apigee.com/about/blog/technology/restful-api-design-plural-nouns-and-concrete-names)

- No código fonte, converta plurals para variáveis e propriedades com uma lista de sufixos.

  _Por que?_

  > Plural é interessante para URLs mas no código é muito sucetível a erros.

- Sempre use um conceito singular que comece com a coleção e termine com um identificador:

  ```
  /students/245743
  /airports/kjfk
  ```

- Evite URLs como:

  ```
  GET /blogs/:blogId/posts/:postId/summary
  ```

  _Por que?_

  > Isso não está apontando para um recurso mas, para uma propriedade. Você pode passar a propriedade como um parâmetro para encurtar a resposta.

- Matenha as URLs de recursos sem verbos.

  _Por que?_

  > Porque se você usar verbos para cada operação em um recurso você vai acabar com uma lista enrome de URLs e nenhum padrão consistente, o que torna difícil para desenvolvedores lerem. Além disso, nos usamos verbos para outra situação.

- Use verbos para 'não recursos'. Nesse caso, sua API não retorna nenhum recurso. Ao invés, você executa uma operação que retorna um resultado. Essas **não são** operações de um CRUD (criar, ler, atualizar, e deletar):

  ```
  /translate?text=Hallo
  ```

  _Por que?_

  > Porque para CRUD nos usamos os métodos HTTP nos `recursos` ou `coleções`. Os verbos que estamos falando são literalmente `Controllers`. Você geralmente não chega a desenvolver muito deles. [Leia mais sobre...](https://byrondover.github.io/post/restful-api-guidelines/#controller)

- Use `camelCase` para as propriedades no `JSON` das requisições e da repostas do servidor para manter a consistência.

  _Por que?_

  > Esse é um padrão de proejto para JavaScript, onde a linguagem usada para gerar e parsear JSON é, em teoria, JavaScript. 

- Mesmo que um recurso seja um conceito singular, similar à uma instancia ou registro do banco de dados, você não deve usar `nome_da_tabela` para o nome de um recurso e `nome_da_coluna` para a propriedade de um recurso.

  _Por que?_

  > Porque sua intenção é expor os recursos, não detalhes do schema do seu banco de dados. 

- Novamente, apenas use substantivos quando nomeando a URL de um recurso e não tente explica a funcionalidade. 

  _Por que?_

  > Only use nouns in your resource URLs, avoid endpoints like `/addNewUser` or `/updateUser` . Also avoid sending resource operations as a parameter.
  > Apenas use substantivos nos recursos na URL, evite coisas como `/addNewUser` ou `/updateUser`. Também, evite enviar operações sobre os recursos como parâmetros.

- Explicite as operações de CRUD usando funcionalidades do métodos HTTP:

  _Como:_

  > `GET`: Para obter/recuperar um recurso.

  > `POST`: Para criar um novo recurso ou sub-recurso.

  > `PUT`: Para atualizar recursos existentes.

  > `PATCH`: Para atualizar recursos existentes. Atualiza apenas os campos enviados deixando as outras propriedades como eram.

  > `DELETE`: Para deletar um recurso existente.

* Para recursos aninhados, use a relação entre eles e a URL. Por exemplo, usando `id` para se referir a um usuário específico.

  _Por que?_

  > Esse é um jeito natural de tornar os recursos fáceis de explorar.

  _Como?_

  > `GET /schools/2/students` , Deve obter a lista de estudantes da escola com ID 2.

  > `GET /schools/2/students/31` , Deve obter os detalhes do estudante 31, que pertence a escola 2.

  > `DELETE /schools/2/students/31` , Deve deletar o estudante 31, que pertence a escola 2.

  > `PUT /schools/2/students/31` , Deve atualizar as informações do estudante 31, Use PUT apenas para URL de recursos, não para coleções.

  > `POST /schools` , Deve criar uma nova escola e retornar os detalhes da nova escola criada. Use POST em URL de coleções.

* Use um simples número ordinal para a versão com o prefixo `v` (v1, v2). Coloque a versão à esquerda de todos URL da api:

  ```
  http://api.domain.com/v1/schools/3/students
  ```

  _Por que?_

  > Quando suas APIs são públicas, atualizar a API com alguma mudança que quebra o funcionamento antigo (Breaking Change) pode levar ao mal funcionamento de vários produtos e serviços que dependem da sua API. Usnado versões na URL você previne isso de acontecer. [Leia mais sobre...](https://apigee.com/about/blog/technology/restful-api-design-tips-versioning)

- Messagens das respostas devem ser auto descritivas. Uma boa mensagem de erro deve ser algo parecido com:

  ```json
  {
    "code": 1234,
    "message": "Algo de errado aconteceu",
    "description": "Mais detalhes"
  }
  ```

  Ou para validação de erros:

  ```json
  {
    "code": 2314,
    "message": "Validação Falhou",
    "errors": [
      {
        "code": 1233,
        "field": "email",
        "message": "Email inválido"
      },
      {
        "code": 1234,
        "field": "password",
        "message": "Senha em branco"
      }
    ]
  }
  ```

  _Por que?_

  > Desenvolvedores dependem de erros bem descritivos em momentos críticos quando eles estão com dificuldades resolvendo problemas da aplicação que eles construiram usando sua API.

    _Nota: Mantenha mensagens relacionadas a exceções de segurança o mais genéricas possível. Por exemplo, ao invés de 'Senha incorreta', você pode responder dizendo 'Usuário ou senha inválidos' para que não vazamos informações sobre dados corretos que não deveriam ser conhecido por terceiros._
    
- Use these status codes to send with your response to describe whether **everything worked**,
  The **client app did something wrong** or The **API did something wrong**.
- Use códigos de status para enviar descrever suas respostas ao invés de **tudo funcionou corrretamente**,
  O **App do cliente fez algo errado** ou A **API fez algo errado**.

  _Quais?_ > `200 OK` resposta de sucesso para requisições `GET`, `PUT` ou `POST`.

      > `201 Created` para quando uma nova instância é criada. Criar uma nova instância usando `POST` deve retornar o código de status `201`.

      > `204 No Content` resposta representa sucesso porém não tem nenhum conteúdo para ser enviado na resposta. Use quando operações com `DELETE` são bem sucedidas.

      > `304 Not Modified` resposta para minimizar informações trafegadas quando o "requerente" já possui os dados em cache.

      > `400 Bad Request` para quando a requisição não foi processada, como por exemplo quando o servidor não compreendeu o conteúdo da requisição.

      > `401 Unauthorized` para quando a requisição não possui credenciais suficientes para ser executada.

      > `403 Forbidden` siginifica que o servidor entendeu a requisição mas recusa a realiza-la.

      > `404 Not Found` indica que o recurso da requisição não foi encontrado.

      > `500 Internal Server Error` indica que a requisição foi recebida mas devida algum erro interno a requisição não pode ser completada.

      _Por que?_

      > A maioria das APIs fornecem um algum subconjunto de códigos de status HTTP. Por exemplo, a API do Google GData usa apenas 10 códigos, Netflix usa 9, e Digg, apenas 8. Evidente que essas requisições possuem dados com informações adicionais. Existem mais de 70 códigos de status HTTP. De qualquer forma, A maioria dos desenvolvedores não tem todos memorizados. Então se você escolher códigos que não são muito comuns pode assustar e repelir desenvolvedores de usar sua API. [Leia mais sobre...](https://apigee.com/about/blog/technology/restful-api-design-what-about-errors)

* Forneça o número total de recursos na sua resposta.
* Aceite `limit` e `offset` como parâmetros.
* A quantidade de dados que os recursos expõem deve ser levado em consideração. O consumidor da API nem sempre precisa ter uma representação completa do recurso. Use `fields` na query string para filtrar propriedades a serem enviadas:
  ```
  GET /student?fields=id,name,age,class
  ```
* Paginação, filtragem e ordenação não precisam ser suportadas inicialmente para todos os recursos. Documente os recursos que oferecem tais funcionalidades.

<a name="api-security"></a>

### 9.2 API security

Algumas boas práticas básicas de segurança:

- Não use autenticação básica a não ser sob uma conexão HTTPS. Tokens de autenticação não devem ser enviados na URL: `GET /users/123?token=asdf....`

  _Por que?_

  > Porque tokens ou ID de usuário e senha são enviados pela rede como texto (encoded como base64, mas base64 é um encoding reversível), o esquema básico de autenticação não é seguro [Leia mais sobre...](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication)

- Tokens devem ser enviados fazendo uso do header `Authorization` em todas as requisições: `Authorization: Bearer xxxxxx, Extra yyyyy`.

- Códigos de autorização devem ter "tempo de vida curto".

- Rejeite qualquer requisição não-TLS não respondendo nenhuma requisição HTTP para evitar vazamento de dados. Apenas resposnda `403 Forbidden`.

- Considere usar Limite de requisições.

  _Por que?_

  > Para proteger sua API de requisições maliciosas repetidas milhares de vezes por hora. Você deve considerar implementar Limite de requisições o mais cedo possível.

- Configurando os headers HTTP corretamente pode te ajudar a protejer sua aplicação web. [Leia mais sobre...](https://github.com/helmetjs/helmet)

- Sua API deve converter os dados recebidos para sua forma canônica ou rejeita-los. Retrone status `400 Bad Request` com detalhes sobre os de dados errados ou faltantes.

- Todos os dados trocados com a API REST devem ser validados pela API.
  
- Serialize seu JSON.

  _Por que?_

  > Uma das principais preocupações lidando com JSON encoders é previnir JavaScript malicioso de ser executado no broswer... Ou, se você está usando `node.js`, no servidor. É vital usar JSON corretamente serializados para evitar a execução de código enviado como input pelo broswer.

- Validate o content-type e na maioria dos casos use `application/*json` (Content-Type header).

  _Por que?_

  > Por exemplo, aceitando `application/x-www-form-urlencoded` mime type permite que alguém com má intenções crie um form e execute uma simple requisição POST. O servidor nunca deve tentar adivinhar o Content-Type. A falta do Content-Type ou um Content-Type inesperado deve resultar no servidor recusando a request com um erro `4XX` na resposta.

- Confira o checklist de segurança para um projeto de API. [Leia mais sobre...](https://github.com/shieldfy/API-Security-Checklist)

<a name="api-documentation"></a>

### 9.3 API documentation

- Complete a seção `API Reference` no [README.md Template](./README.sample.md) para sua API.
- Descreva os métodos de autenticação da sua API com exemplos de código.
- Explique a estrutura de recursos da sua URL (apenas o caminho do recurso) incluindo o tipo de request (Método).

Para cada `endpoint` explique:

- Parâmetros da URL se existirem, especifique de acordo com os nomes na descritos na seção de URL:

  ```
  Required: id=[integer]
  Optional: photo_id=[alphanumeric]
  ```

- Se o tipo da requisiçõa é POST, forneça alguns exemplos de código. Essa regra se aplica para parâmetros de URL também. Separe a seção entre `Requeridos` e `Opcionais`.

- Resposta de sucesso, qual deverias ser o código de status e tem algum dado à ser retornado junto? Isso é útil quando as pessoas precisam saber o que os seus `callbacks` devem esperar:

  ```
  Code: 200
  Content: { id : 12 }
  ```

- Mensagens de erro, a maioria dos `endpoints` possuem várias maneiras de falhar. De acesso negado à parâmetros errados e etc. Todos devem ser listados. Pode parecer repetitivo, mas ajuda a previnir que desenvolvedores tentem prever o que vai acontecer. Por exemplo
- 
  ```json
  {
    "code": 403,
    "message": "Authentication failed",
    "description": "Invalid username or password"
  }
  ```

* Use ferramentas de desing de API, existem muitas ferramentas de código aberto para uma boa documentação como [API Blueprint](https://apiblueprint.org/) e [Swagger](https://swagger.io/).

<a name="licensing"></a>

## 10. Licença

![Licensing](/images/licensing.png)

Tenha certeza de usar recursos aos quais você possui o direito de uso. Se você usa bibliotecas, lembre-se de procurar por MIT, Apache ou BSD mas se você precisa modifica-las, então confira nos detalhes da licensa. Imagens e vídeos com copyright podem te causar problemas.

---

Fontes:
[RisingStack Engineering](https://blog.risingstack.com/),
[Mozilla Developer Network](https://developer.mozilla.org/),
[Heroku Dev Center](https://devcenter.heroku.com),
[Airbnb/javascript](https://github.com/airbnb/javascript),
[Atlassian Git tutorials](https://www.atlassian.com/git/tutorials),
[Apigee](https://apigee.com/about/blog),
[Wishtack](https://blog.wishtack.com)

Icons by [icons8](https://icons8.com/)
