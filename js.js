$(function() {
  dibujarGrafo(0);
  $("#entrar" ).click(function() {
    completarPreliminares();
  });
});

function dibujarGrafo (num) {
  var container = document.getElementById("mynetwork");
  switch (num) {
    case 0:
      var dot = 'dinetwork {node[shape=circle];1 -> 2 [label="B>B, L"]; 2 -> 3[label="B>B, R"]; 1 -> 1[label="b>a, R|a>a, R"]; 2 -> 2[label="a>a, L"]; 3[ borderWidth=7]}';
      break;
    case 1:
      var dot = 'dinetwork {node[shape=circle];1[color = red];1 -> 2 [label="B>B, L"]; 2 -> 3[label="B>B, R"]; 1 -> 1[label="b>a, R|a>a, R"]; 2 -> 2[label="a>a, L"]; 3[ borderWidth=7]}';
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
      color: "blue",
    },
  };
  var network = new vis.Network(container, data, options);
}

function leerCadena() {
  $("#carrete").html('');
  var texto = $("#entrada").val();
  return texto;
}

function convertirCadenaEnArreglo(texto) {
  var arreglo = texto.split("");
  return arreglo;
}

function limpiarCinta() {
  $("#carrete").html('');
}

function dibujarCinta(arreglo) {
  let tam = contarArreglo(arreglo);
  $("#carrete").append('<div id = "elemento0" class="circulo"></div>');
  for(let i = 0; i < tam; i++){
    $("#carrete").append('<div class="circulo" id = "elemento">'+arreglo[i]+'</div>');   
    $("#elemento").attr("id","elemento"+(i+1));
  }
  $("#carrete").append('<div class="circulo" id = "elementoN"></div>');
}

function contarArreglo(arreglo) {
  var tam = arreglo.length;
  return tam;
}

function animarCinta() {
  anime({
    targets: '.circulo',
    translateY:50,
    loop: false,
    delay: function(el, i, l) {
      return i * 100;
    },
    endDelay: function(el, i, l) {
      return (l - i) * 100;
    }
  });
}

function completarPreliminares() {
  limpiarCinta();
  var texto = leerCadena();
  var arreglo = convertirCadenaEnArreglo(texto);
  dibujarCinta(arreglo);
  animarCinta();  
  $("#correr" ).click(function() {
    cambiar(0,contarArreglo(arreglo));
  });
}
  

function cambiar(i,tam){
  if(i<tam){
    console.log("iteracion"+i);
  setTimeout(function(){
    dibujarGrafo(1);
    anime({
      targets: '#elemento'+i,
      backgroundColor: '#FFF',
    });
  
  },(i*2500)+2000);
  setTimeout(function(){
    dibujarGrafo(0);
    if($('#elemento'+i).text()=="b"){
      $('#elemento'+i).text("a");
    }
    anime({
      targets: '#elemento'+i,
      backgroundColor: '#008f39',
    });
  },(i*2500)+2500);
  i++;
  cambiar(i,tam);
  }
  
}

function cambiar2(i,tam){
  if(i<tam){
    
  }
  console.log("iteracion"+i);
  setTimeout(function(){
    anime({
      targets: '#elemento'+i,
      backgroundColor: '#FFF',
    });
  
  },(i*2500)+2000);
  setTimeout(function(){
    if($('#elemento'+i).text()=="b"){
      $('#elemento'+i).text("a");
    }
    anime({
      targets: '#elemento'+i,
      backgroundColor: '#008f39',
    });
  },(i*2500)+2500);
  if (i <=tam-1) {
    i++;  
    cambiar(i,tam);
  }else{
    i=tam+2;
  }
}
