// Imprime uma árvore de vnodes no console num formato parecido com JSX.
// Ferramenta de debug: não faz parte do seu React.

const cores = {
  tag: "color: #e45649; font-weight: bold",
  prop: "color: #c18401",
  valor: "color: #50a14f",
  texto: "color: #888",
  aviso: "color: #fff; background: #c0392b",
  normal: "color: inherit",
};

export function printVNode(vnode) {
  let formato = "";
  const estilos = [];

  // Cada pedaço de texto ganha um %c com a sua cor (o console aplica na ordem)
  const escrever = (texto, cor = cores.normal) => {
    formato += `%c${texto}`;
    estilos.push(cor);
  };

  const visitar = (no, nivel) => {
    const recuo = "  ".repeat(nivel);

    if (no === null || typeof no !== "object") {
      escrever(`${recuo}${String(no)}`, cores.aviso);
      escrever("  ← isso não é um vnode\n");
      return;
    }

    if (no.type === "TEXT_ELEMENT") {
      escrever(`${recuo}${JSON.stringify(no.props.nodeValue)}\n`, cores.texto);
      return;
    }

    const { children = [], ...props } = no.props;

    escrever(`${recuo}<`);
    escrever(nomeDoTipo(no.type), cores.tag);
    for (const [chave, valor] of Object.entries(props)) {
      escrever(` ${chave}`, cores.prop);
      escrever("=");
      escrever(formatarValor(valor), cores.valor);
    }

    if (children.length === 0) {
      escrever(" />\n");
      return;
    }

    escrever(">\n");
    for (const filho of children) {
      visitar(filho, nivel + 1);
    }
    escrever(`${recuo}</`);
    escrever(nomeDoTipo(no.type), cores.tag);
    escrever(">\n");
  };

  visitar(vnode, 0);
  console.log(formato, ...estilos);
}

// Já preparado pra etapa 3, quando type puder ser uma função (componente)
function nomeDoTipo(type) {
  return typeof type === "function" ? type.name || "Anonimo" : type;
}

function formatarValor(valor) {
  if (typeof valor === "function") return `{${valor.name || "fn"}}`;
  if (typeof valor === "string") return JSON.stringify(valor);
  return `{${JSON.stringify(valor)}}`;
}
