$(function () {
  dibujarGrafo(0);
  $("#entrar").click(function () {
    completarPreliminares();
  });
});

function dibujarGrafo(num) {
  var container = document.getElementById("mynetwork");
  switch (num) {
    case 0:
      var dot =
        'dinetwork {node[shape=circle];1 -> 2 [label=" B / B / L" color=blue]; 2 -> 3[label=" B / B / R" color=blue]; 1 -> 1[label=" b / a / R | a / a / R " color=blue]; 2 -> 2[label=" a / a / L " color=blue]; 3[ borderWidth=7]}';
      break;
    case 1:
      var dot =
        'dinetwork {node[shape=circle];1[color = red];1 -> 2 [label=" B / B / L " color=blue]; 2 -> 3[label=" B / B / R " color=blue]; 1 -> 1[label=" a / a / R " color=red]; 2 -> 2[label=" a / a / L" color=blue]; 3[ borderWidth=7]}';
      break;
    case 2:
      var dot =
        'dinetwork {node[shape=circle];1 -> 2 [label=" B / B / L " color=red];2[color = red];2 -> 3[label=" B / B / R " color=blue]; 1 -> 1[label=" b / a / R | a / a / R " color=blue]; 2 -> 2[label=" a / a / L " color=blue]; 3[ borderWidth=7]}';
      break;
    case 3:
      var dot =
        'dinetwork {node[shape=circle];1->2[color=red];1 -> 2 [label=" B / B / L " color=blue];2 -> 3[label=" B / B / R " color=red]; 1 -> 1[label=" b / a / R | a / a / R " color=blue]; 2 -> 2[label=" a / a / L " color=blue];3[color = red]; 3[ borderWidth=7]}';
      break;
    case 4:
      var dot =
        'dinetwork {node[shape=circle];1[color = red];1 -> 2 [label=" B / B / L " color = blue]; 2 -> 3[label=" B / B / R " color = blue]; 1 -> 1[label=" b / a / R " color = red]; 2 -> 2[label=" a / a / L " color = blue]; 3[ borderWidth=7]}';
      break;
    case 5:
      var dot =
        'dinetwork {node[shape=circle];1 -> 2 [label=" B / B / L " color=blue];2[color = red];2 -> 3[label=" B / B / R " color=blue]; 1 -> 1[label=" b / a / R | a > a / R " color=blue]; 2 -> 2[label=" a / a / L " color=red]; 3[ borderWidth=7]}';
      break;
    case 6:
      var dot =
        'dinetwork {node[shape=circle];1->2[color=red];1 -> 2 [label=" B / B / L " color=blue];2 -> 3[label=" B / B / R " color=blue]; 1 -> 1[label=" b / a / R | a / a / R " color=blue]; 2 -> 2[label=" a / a / L " color=blue];3[color = red]; 3[ borderWidth=7]}';
      break;
    default:
      break;
  }

  var data = vis.parseDOTNetwork(dot);

  var options = {
    nodes: {
      shape: "dot",
      size: 50,
      font: {
        size: 32,
      },
      borderWidth: 1,
      shadow: true,
    },
    layout: {
      hierarchical: {
        sortMethod: "directed",
      },
    },
    edges: {
      width: 3,
      length: 190,
      font: {
        size: 16,
      },
      shadow: true,
      //color: "blue",
    },
  };
  var network = new vis.Network(container, data, options);
}

function leerCadena() {
  $("#carrete").html("");
  var texto = $("#entrada").val();
  return texto;
}

function convertirCadenaEnArreglo(texto) {
  var arreglo = texto.split("");
  return arreglo;
}

function limpiarCinta() {
  $("#carrete").html("");
}

function dibujarCinta(arreglo) {
  let tam = contarArreglo(arreglo);
  $("#carrete").append('<div id = "elemento0" class="circulo"></div>');
  let i;
  for (i = 0; i < tam; i++) {
    $("#carrete").append(
      '<div class="circulo" id = "elemento">' + arreglo[i] + "</div>"
    );
    $("#elemento").attr("id", "elemento" + (i + 1));
  }
  $("#carrete").append('<div class="circulo" id = "elemento"></div>');
  $("#elemento").attr("id", "elemento" + (i + 1));
}

function contarArreglo(arreglo) {
  var tam = arreglo.length;
  return tam;
}

function animarCinta() {
  anime({
    targets: ".circulo",
    translateY: 50,
    loop: false,
    delay: function (el, i, l) {
      return i * 100;
    },
    endDelay: function (el, i, l) {
      return (l - i) * 100;
    },
  });
}

function completarPreliminares() {
  limpiarCinta();
  var texto = leerCadena();
  var arreglo = convertirCadenaEnArreglo(texto);
  dibujarCinta(arreglo);
  animarCinta();
  $("#correr").click(function () {
    recorrerDerecha(0, contarArreglo(arreglo));
  });
}

function recorrerDerecha(i, tam) {
  if (i < tam) {
    console.log("iteracion" + i);
    setTimeout(function () {
      if ($("#elemento" + i).text() != "b") {
        $("#elemento" + i).text("a");
        dibujarGrafo(1);
      }
      anime({
        targets: "#elemento" + i,
        backgroundColor: "#FFF",
      });
    }, i * 2500 + 2000);
    setTimeout(function () {
      if ($("#elemento" + i).text() == "b") {
        $("#elemento" + i).text("a");
        dibujarGrafo(4);
      }
      anime({
        targets: "#elemento" + i,
        backgroundColor: "#008f39",
      });
    }, i * 2500 + 2500);
    i++;
    recorrerDerecha(i, tam);
  } else {
    leerVacioDerecha(i);
  }
}

function leerVacioDerecha(i) {
  setTimeout(function () {
    anime({
      targets: "#elemento" + (i + 1),
      backgroundColor: "#FFF",
    });
    dibujarGrafo(2);
  }, i * 2500 + 2000);
  setTimeout(function () {
    anime({
      targets: "#elemento" + (i + 1),
      backgroundColor: "#008f39",
    });
  }, i * 2500 + 2500);
  console.log(i + 1);

  recorrerIzquierda(i + 1, i + 1);
}

function recorrerIzquierda(i, j) {
  console.log("entrooo");
  if (i > 1) {
    console.log("iteracion" + i);
    setTimeout(function () {
      dibujarGrafo(5);
      anime({
        targets: "#elemento" + i,
        backgroundColor: "#FFF",
      });
    }, j * 2500 + 2000);
    setTimeout(function () {
      anime({
        targets: "#elemento" + i,
        backgroundColor: "#008f39",
      });
    }, j * 2500 + 2500);
    i--;
    j++;
    recorrerIzquierda(i, j);
  } else {
    leerVacioIzquierda(j);
  }
}

function leerVacioIzquierda(i) {
  setTimeout(function () {
    anime({
      targets: "#elemento0",
      backgroundColor: "#FFF",
    });
    dibujarGrafo(3);
  }, i * 2500 + 2000);
  setTimeout(function () {
    anime({
      targets: "#elemento0",
      backgroundColor: "#008f39",
    });
  }, i * 2500 + 2500);
  i++;
  setTimeout(function () {
    dibujarGrafo(6);
    anime({
      targets: "#elemento1",
      backgroundColor: "#FFF",
    });
  }, i * 2500 + 2000);
  setTimeout(function () {
    anime({
      targets: "#elemento1",
      backgroundColor: "#008f39",
    });
  }, i * 2500 + 2500);
}
