var palabras;
var ids = [[],[],[],[],[],[],[],[]];
var logogrifo = [];
var letras = [];
var words = [];
var comprobar;
var respuestas = "";
var id;
var letrasFondo = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var colores = ["red","blue", "orange", "green", "purple", "yellow", "pink", "white", "aqua"];

//Acciones que ocurren cuando se carga la página
window.onload = function(){
  //Se generan un total de 100 parrafos cada uno con una letra,
  //de distinto color para crear la animación
  for (var i = 1; i < 210; i++) {
    var color = colores[Math.floor(Math.random()*colores.length)];
    $("#fondoI").append("<p class='"+color+"' style ='font-size:"+(Math.floor(Math.random()*50)+20)+"px;color:"+color+"'>"+letrasFondo[Math.floor(Math.random()*letrasFondo.length)]+"</p>"+(i%15==0?'</br>':''));
    color = colores[Math.floor(Math.random()*colores.length)];
    $("#fondoD").append("<p class='"+color+"' style ='font-size:"+(Math.floor(Math.random()*50)+20)+"px;color:"+color+"'>"+letrasFondo[Math.floor(Math.random()*letrasFondo.length)]+"</p>"+(i%15==0?'</br>':''));

  }
  //Cada 2 segundos se ejecutará la animación
  setInterval("iluminaLetras()",2000);

  redimensionar();
  //Cada vez que se redimensione la página se ejecutará la función
  $(window).resize(function() {redimensionar();});
    //Accedera a logogrifo.json para extraer toda la información
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.status == 200 && this.readyState ==4){
            palabras = JSON.parse(this.responseText);
            clasificaPalabras(palabras);
        }
    }
    xhr.open("GET", "LogoGrifo/logogrifo.json?nocache="+Math.random(), true);
    xhr.send();
}
//Se encarga de que aleatoriamente un grupo de letras del mismo color se iluminen y se vuelvan a oscurecer
function iluminaLetras(){
    var color = colores[Math.floor(Math.random()*colores.length)];
    $("."+color+"").animate({opacity: '0.6'}, 2000);
    $("."+color+"").animate({opacity: '0.2'}, 2000);
}

//Toma en cuenta el ancho y alto de la ventana para establecer los margenes
//de los elementos y el tamaño de las letras del fondo
function redimensionar(){
    var ancho = $(window).width();
    var alto = $(window).height();
    var media = Math.trunc((ancho/alto)*15);
    $("#bloque").css("margin-left",media+"%");
    $("#bloque").css("margin-right",media+"%");
    $("#fondoD").css("margin-left",(media+30)+"%");
    $("#fondoI").css("font-size",media+"px");
    $("#fondoD").css("font-size",media+"px");
}
function clasificaPalabras(palabras){
    for (var i = 0; i < palabras.length; i++) {

        ids[palabras[i].palabra.length-3].push(palabras[i].id);
    }
    generaCuadraditos();

}
function generaCuadraditos(){
  logogrifo = [];
  letras = [];
  for (var i = 0; i <= 7 ; i++) {
      logogrifo.push(ids[i][Math.floor(Math.random()*ids[i].length)]);
      var auxiliar = palabras[logogrifo[i]-1].palabra;
      words.push(auxiliar);
      $("#bloque").append("<div><p>"+palabras[logogrifo[i]-1].definicion+"</p></div>");
      var divAux2 = document.createElement("div");
      auxiliar = auxiliar.split("");
      for (let j = 0; j < auxiliar.length; j++) {
        if (letras.indexOf(auxiliar[j]) <0){
          letras.push(auxiliar[j]);
        }
        $("#bloque").append('<input value=""  maxlength=1 pattern="[A-Za-z]{1}" placeholder="'+letras.indexOf(auxiliar[j])+'"  size="1px">');
      }

  }
  $("#bloque").append('<button id="comprobar" disabled >Comprobar</button>');
  $("#bloque").append('<button id="restart" onclick="restart(`bloque`)">Restart</button>');
  $("input").keyup(function(){


    //$(this).next().css("font-size","50px");
    var evento = window.event || elEvento;
    /*Si el codigo es una letra se busca que letra le corresponde*/
   if((evento.keyCode>=65 && evento.keyCode<=90) || evento.keyCode == 0 || evento.keyCode ==192){
       $('input[placeholder="'+$(this).attr("placeholder")+'"]').attr("value",$(this).val()).css("background-color", "#cccccc");
    }else{
      //alert($(this).attr("value"))
      /*if(!isNaN($(this).attr("value"))){
        alert("dads");
      }*/
         $(this).css("background-color", "#FF7774");
         //$(this).attr("value",$(this).val());
         $(this).attr("value","");
         //alert($(this).attr("value"))
      $('input[placeholder="'+$(this).attr("placeholder")+'"]').attr("value","");
    }
    if($('input[value=""]').length ==  0){
        $("#comprobar").prop("disabled",false);
    }else {
      if(!$("#comprobar").prop("disabled")){
        $("#comprobar").prop("disabled",true);
      }
    }
  });
  $("#comprobar").click(function(){
    comprobar = words.join("").toLowerCase();
    $('input').each(function(){
        return respuestas+=$(this).val();
    });
    respuestas = respuestas.toLowerCase();

    if(comprobar == respuestas){
      $("#bloque").empty();
      $("#bloque").css("background-color","black");
      $("#bloque").append("<p style='color:green; font-size:150px; text-align:center'>HAS GANADO</p>");
      $("#bloque").append('<button onclick="restart(`victoria`)">Restart</button>');

    }else{
      $("#bloque").empty();
      $("#bloque").css("background-color","black");
      $("#bloque").append("<p style='color:red; font-size:150px; text-align:center'>HAS PERDIDO</p>");
      $("#bloque").append('<button onclick="restart(`derrota`)">Restart</button>');

    }
  });
}
function restart(element){
  $("#bloque").animate({height: 'toggle'});
  $("#bloque").empty();
  $("#bloque").css("background-color","white");
  generaCuadraditos();
  $("#bloque").animate({height: 'toggle'},2000);

}
