var container = document.getElementById("mynetwork");
var dot = 'dinetwork {node[shape=circle];1[color = red];1 -> 2 [label="B>B, L"]; 2 -> 3[label="B>B, R"]; 1 -> 1[label="b>a, R|a>a, R"]; 2 -> 2[label="a>a, L"]; 3[ borderWidth=7]}';
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

  
$("#entrar" ).click(function() {
    $("#carrete").html('');
    var texto = $("#entrada").val();
    var arreglo = texto.split("");
    var tam = arreglo.length;
    $("#carrete").append('<div id = "elemento0" class="circulo"></div>');
    for(i = 0; i < tam; i++){
        $("#carrete").append('<div class="circulo" id = "elemento">'+arreglo[i]+'</div>');   
        $("#elemento").attr("id","elemento"+(i+1));
    }
    $("#carrete").append('<div class="circulo" id = "elementoN"></div>');
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
    let j = 0;
    $("#correr" ).click(function() {
      console.log(tam);
      cambiar(j,tam);
    });
});


function cambiar(i,tam){
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
  if (i <tam) {
    i++;  
    cambiar(i,tam);
  }else{
    i=tam+1;
  }
}


