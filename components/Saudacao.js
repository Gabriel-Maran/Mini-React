import { createElement } from "../core/createElement.js";

// Componente simples: recebe dados por props e devolve um vnode.
export function Saudacao(props) {
  return createElement(
    "p",
    { style: { color: props.cor } },
    "Olá, ",
    createElement("b", null, props.nome),
    "!",
  );
}
