# React2 — Diário do projeto

> Arquivo de contexto compartilhado entre você e o Claude.
> **Início de cada sessão:** o Claude lê este arquivo para saber onde paramos.
> **Ao fechar uma meta:** atualizamos o roadmap e escrevemos uma linha no diário.

## O que é este projeto

Um mini-React escrito do zero em JavaScript puro (ES modules, sem bundler, sem dependências),
para entender como o React funciona por dentro.

### Meu objetivo

Entender como o React funciona **por completo**, aprendendo e construindo o máximo possível:

1. **Entender de verdade.** Reimplementar aqui cada peça do React, sem caixa-preta.
2. **Ir além do React.** Criar recursos que ele não faz tão bem (ver "Diferenciais").
3. **Estar pronto para entrevistas.** Saber explicar cada conceito com as palavras certas (ver "Perguntas de entrevista").

### Como trabalhamos

- O Claude prepara a estrutura e explica os conceitos. Você escreve as partes centrais da lógica (marcadas com `TODO(human)`).
- Nomes e comentários do código em português.
- Cada etapa concluída ganha perguntas na seção "Perguntas de entrevista". Você só marca uma pergunta quando consegue respondê-la com suas palavras, sem olhar.

## Como rodar

O `index.html` carrega o `index.js` como `type="module"`, então **não funciona abrindo o arquivo direto** (`file://`).
Use um servidor local: a extensão **Live Server** do VS Code ou `npx serve` na pasta do projeto.
O `printVNode` mostra a árvore de vnodes no console do navegador (F12).

## Mapa do código

| Arquivo | Papel |
|---|---|
| `core/createElement.js` | Transforma a descrição em vnode (objeto JS puro). Não toca no DOM. Texto vira `TEXT_ELEMENT`. |
| `core/render.js` | Transforma o vnode em DOM real: resolve componentes, aplica props e chama a si mesmo nos filhos. |
| `components/Card.js` | Componente "embrulho": desenha a moldura, o conteúdo vem de `props.children`. |
| `components/Saudacao.js` | Componente simples que recebe dados por props. |
| `utils/printVNode.js` | Debug: imprime a árvore no console, num formato parecido com JSX. Não faz parte do React. |
| `index.js` | Monta o app de exemplo e chama `render`. |

## Roadmap

### ✅ Concluído

- [x] **Etapa 1: createElement criando DOM direto.** Era a primeira versão. A lógica de props dela virou o `aplicarProps`.
- [x] **Etapa 2: Virtual DOM.** `createElement` passou a devolver um objeto puro, o `render` ficou separado e texto virou `TEXT_ELEMENT`.
- [x] **Etapa 3: Componentes de função.** `type` pode ser uma função, conteúdo via `props.children`, componente dentro de componente.

### 🔜 Próxima

- [ ] **Etapa 4: Filhos "especiais"** (em `createElement`)
  - ignorar `null`, `undefined`, `true` e `false` (é o que permite `condicao && createElement(...)`)
  - achatar arrays (é o que permite `lista.map(...)` como filho)

### Depois

- [ ] **Etapa 5: Estado (`useState`)** com re-render ingênuo: limpa o container e desenha tudo de novo.
- [ ] **Etapa 6: Reconciliação (diff).** Compara a árvore antiga com a nova e só mexe no DOM onde mudou.
- [ ] **Etapa 7: Listas com `key`.** Reaproveita elementos quando a ordem muda.
- [ ] **Etapa 8: `useEffect`.**
- [ ] **Etapa 9 (avançado): Fiber.** Render em pedaços, que pode ser interrompido (`requestIdleCallback`).
- [ ] **Etapa 10 (opcional): JSX de verdade**, com um transpiler (esbuild/Babel) apontando para o nosso `createElement`.

## Diferenciais (ideias para ir além do React)

Escolhemos quais fazer depois da Etapa 6. Só com re-render funcionando dá para sentir onde o React sofre e comparar.

- **Reatividade fina (signals).** Atualizar só o texto que mudou, sem rodar o componente inteiro de novo. Solid, Vue e Preact Signals já fazem isso.
- **Estado global embutido**, sem precisar de Context + Provider ou de uma biblioteca externa.
- **Debug embutido.** O `printVNode` já é o começo: dá para mostrar o que mudou em cada render e por quê.
- **Mensagens de erro didáticas**, por exemplo: "você passou `null` como filho de `<Card>`".

## Perguntas de entrevista

Responda com suas palavras. Se travar, pergunte ao Claude e marque só depois de conseguir sozinho.

### Etapas 1–3 (já dá para responder)

- [ ] O que é o Virtual DOM e por que o React usa um?
- [ ] O que o JSX vira depois de compilado?
- [ ] Qual a diferença entre um **elemento** e um **componente**?
- [ ] Como o React sabe se `type` é uma tag HTML ou um componente?
- [ ] O que é `props.children` e para que serve?

### Vêm com as próximas etapas

- [ ] Por que hooks não podem ficar dentro de `if` ou de um loop? (Etapa 5)
- [ ] O que é reconciliação? (Etapa 6)
- [ ] Por que não é bom usar o índice do array como `key`? (Etapa 7)
- [ ] Quando o `useEffect` roda, e quando roda a função de limpeza dele? (Etapa 8)
- [ ] O que é Fiber e que problema ele resolve? (Etapa 9)

## Decisões tomadas (e por quê)

- **Texto vira vnode `TEXT_ELEMENT`** com `nodeValue`, assim o `render` trata todo filho do mesmo jeito. O text node é criado vazio e o `aplicarProps` preenche o `nodeValue` (é proposital).
- **Componentes são resolvidos com `while`**, não `if`, porque um componente pode retornar outro componente.
- **`for...of` em vez de `for...in`** nos filhos: queremos os valores, não os índices.
- **`children` é pulado no `aplicarProps`**: filhos não são atributo, quem cuida deles é o `render`.
- **`class` e `className`** viram `setAttribute("class")`.

## Pendências e bugs conhecidos

- [ ] `null` como filho quebra o render: `typeof null === "object"`, então ele passa como vnode e o render tenta ler `null.type`. → Etapa 4
- [ ] `false` e `undefined` viram texto. → Etapa 4
- [ ] Array como filho não é achatado (array também é `"object"`). → Etapa 4
- [ ] `render` só adiciona (`appendChild`): chamar duas vezes duplica a tela. Ainda não existe atualização. → Etapas 5–6
- [ ] Eventos cujo nome no DOM é diferente (`onDoubleClick` precisa virar `dblclick`).
- [ ] TODO em `core/render.js`: mover `"TEXT_ELEMENT"` para uma pasta `constants`.
- [ ] O projeto ainda não é um repositório git.

## Diário de sessões

### 2026-10-19
- Projeto criado (`index.html`, `index.css`).

### 2026-10-20
- Etapas 1–3: `createElement`, `render` separado, `printVNode` para debug, componentes `Card` e `Saudacao`.

### 2026-10-21
- A memória do Claude estava vazia. O contexto foi reconstruído a partir do código.
- Criado este `docs.md` e salva uma memória que manda o Claude lê-lo no início de cada sessão.
- Objetivo definido: entender o React por completo, ir além dele e se preparar para entrevistas. Adicionadas as seções "Diferenciais" e "Perguntas de entrevista".
