import { createElement } from "./core/createElement.js";
import { render } from "./core/render.js";
import { printVNode } from "./utils/printVNode.js";
import { Saudacao } from "./components/Saudacao.js";
import { Card } from "./components/Card.js";

const app = createElement(
  "section",
  {
    style: {
      display: "flex",
      gap: "10px",
      padding: "16px",
    },
  },
  createElement(
    Card,
    { titulo: "Teste de recursão" },
    createElement(Saudacao, { nome: "mundo", cor: "red" }),
  ),
  createElement(Saudacao, { nome: "componentes", cor: "blue" }),
  createElement(
    Card,
    { titulo: "Meu card" },
    createElement("p", null, "Isto veio de props.children"),
    createElement(
      "button",
      { onClick: () => alert("Funcionou!") },
      "Clique aqui",
    ),
  ),
);

printVNode(app);
render(app, document.getElementById("root"));
