// Transforma uma "descrição" de elemento num objeto JS puro (um nó do Virtual DOM).
// Nada aqui toca no DOM real: nada de document.createElement aqui dentro.
// Quem cria DOM de verdade é o render() (veja core/render.js).
//
// Exemplo de uso:
//   createElement("p", { style: { color: "red" } }, "Olá", createElement("b", null, "mundo"))
//
// Deve retornar um objeto comum, algo nesse formato (é o formato do React):
//   {
//     type: "p",
//     props: {
//       style: { color: "red" },
//       children: [ "Olá", { type: "b", props: { children: ["mundo"] } } ]
//     }
//   }
//
// Repare que:
//   - props pode vir como null
//   - children pode ter strings ("Olá") e objetos (o <b>) misturados

export function createElement(type, props, ...children) {
  if (!type) return;
  return {
    type: type,
    props: {
      ...props,
      children: children.map((item) => {
        const tipo = typeof item;
        if (tipo === "object") {
          return item;
        }
        return {
          type: "TEXT_ELEMENT",
          props: { nodeValue: item, children: [] },
        };
      }),
    },
  };
}
