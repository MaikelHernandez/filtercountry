const filtros = data => {

var x, i, j, l, ll, selElmnt, a, b, c;
/* Busque cualquier elemento con la clase "selección personalizada": */
x = document.getElementsByClassName("custom-select");
l = x.length;

for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* Para cada elemento, cree un nuevo DIV que actuará como el elemento seleccionado: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* Para cada elemento, cree un nuevo DIV que contendrá la lista de opciones: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");

  for (j = 1; j < ll; j++) {
    /* Para cada opción en el elemento de selección original,
    cree un nuevo DIV que actuará como un elemento de opción: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* Cuando se hace clic en un elemento, actualice el cuadro de selección original,
        y el elemento seleccionado: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
      h = this.parentNode.previousSibling;
      
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            
            console.log(s.options[i].value)
            const query = s.options[i].value
            if (query === '') {
              banderillas(data)
            } else {
              const arrayFiltrado = data.filter(item => item.region === query)
              banderillas(arrayFiltrado)
            }
            
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* Cuando se hace clic en el cuadro de selección, cierre cualquier otro cuadro de selección,
    y abra/cierre el cuadro de selección actual: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

/* Si el usuario hace clic en cualquier lugar fuera del cuadro de selección,
luego cierre todos los cuadros de selección: */
  document.addEventListener("click", closeAllSelect);


}