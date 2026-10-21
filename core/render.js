// Transforma um vnode (o objeto que o createElement retorna) em DOM real
// e coloca o resultado dentro do container.

export function render(vnode, container) {
  if (!vnode) return;
  let element;

  while (typeof vnode.type === `function`) {
    vnode = vnode.type(vnode.props);
  }
  // TODO: abstração em pasta 'constants'
  // Caso de texto comum
  if (vnode.type === "TEXT_ELEMENT") {
    // Pode criar vazio, porq o aplicar props encontra o vnode.props.nodeValue
    // Não é bug, é proposital
    element = document.createTextNode("");
  } else {
    element = document.createElement(vnode.type);
  }

  const children = vnode.props.children;
  aplicarProps(element, vnode.props);

  // Pode ser usado com 'in' (ao inves do 'of')
  // so que irá percorrer os indicies e não os valores
  // Por isso optei por deixar 'of'
  for (const child of children) {
    render(child, element);
  }

  container.appendChild(element);
}

// Copia as props de um vnode para um elemento do DOM real.
// É a lógica que você escreveu na primeira versão do createElement.
// A única mudança: pular "children", porque filhos não são atributo,
// quem cuida deles é o render.
function aplicarProps(element, props) {
  for (const chave in props) {
    if (chave === "children") continue;

    if (chave === "style" && typeof props[chave] === "object") {
      Object.assign(element.style, props[chave]);
    } else if (chave.startsWith("on") && typeof props[chave] === "function") {
      const event = chave.substring(2).toLowerCase();
      element.addEventListener(event, props[chave]);
    } else {
      if (chave === "class" || chave === "className") {
        element.setAttribute("class", props[chave]);
      } else {
        element[chave] = props[chave];
      }
    }
  }
}
