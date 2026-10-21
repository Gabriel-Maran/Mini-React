import { createElement } from "../core/createElement.js";

// Componente "embrulho": não sabe o que vai dentro, só desenha a moldura.
// O conteúdo chega em props.children, como em qualquer tag.
export function Card(props) {
  return createElement(
    "div",
    { style: { border: "1px solid #ccc", borderRadius: "8px", padding: "12px" } },
    createElement("h3", { style: { margin: "0 0 8px" } }, props.titulo),
    ...props.children,
  );
}
