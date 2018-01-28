var codigoSecreto = [];
var millar;
var centenas;
var decenas;
var unidades;
var contador;
document.onkeyup = transformaTeclado;
document.onkeydown = colorTeclado;
function colorTeclado(elEvento){
  var evento = window.event || elEvento;
  /*Al presionar para aumentar el número la flecha se pondrá roja*/
  if(evento.keyCode == 38){
    $("div[style='opacity:1']").find("a.up img").attr("src", "imagenes/flechaUpClick.png");
  }
  /*Al presionar para disminuir el número la flecha se pondrá roja*/
  if(evento.keyCode == 40){
    $("div[style='opacity:1']").find("a.down img").attr("src", "imagenes/flechaDownClick.png");
  }
}
function transformaTeclado(elEvento) {
  var evento = window.event || elEvento;
//  alert(evento.keyCode);
  //recoge los números de la derecha del teclado
  if(evento.keyCode >= 96 && evento.keyCode <= 105){
    var div = $("div[style='opacity:1']");
    div.children("p").html(evento.keyCode-96);
  }
  //recoge los números de arriba del teclado
  if(evento.keyCode >= 48 && evento.keyCode <= 57){
    var div = $("div[style='opacity:1']");
    div.children("p").html(evento.keyCode-48);
  }
  /*Aumentar número*/
  if(evento.keyCode == 38){
    var div = $("div[style='opacity:1']");
    var num = parseInt(div.children("p").html());
    div.children("p").html((num==9)?0:num+1);
    div.find("a.up img").attr("src", "imagenes/flechaUpSelect.png");
  }
  /*Disminuir número*/
  if(evento.keyCode == 40){
    var div = $("div[style='opacity:1']");
    var num = parseInt(div.children("p").html());
    div.children("p").html((num==0)?9:num-1);
    div.find("a.down img").attr("src", "imagenes/flechaDownSelect.png");
  }
  /*Mover seleccion a la derecha*/
  if(evento.keyCode == 39){
    var div = $("div[style='opacity:1']");
    div.attr("style", "opacity:0.5")
    if(div.attr("id")=="unidades"){
      $("#millar").attr("style", "opacity:1");
    }else{
      div.next().attr("style", "opacity:1");
    }
  }
  /*Mover seleccion a la izquierda*/
  if(evento.keyCode == 37){
    var div = $("div[style='opacity:1']");
    div.attr("style", "opacity:0.5")
    if(div.attr("id")=="millar"){
      $("#unidades").attr("style", "opacity:1");
    }else{
      div.prev().attr("style", "opacity:1");
    }
  }
  if(evento.keyCode == 13){
    enter();
  }
}
window.onload = function(){
  $(".up").mousedown(function(){
    var num = parseInt($(this).next().html());
    $(this).next().html((num==9)?0:num+1);
    if($(this).parent().css("opacity") != 1){
      $("div[style='opacity:1']").attr("style", "opacity:0.5");
      $(this).parent().attr("style", "opacity:1");
    }
    $(this).children().attr("src", "imagenes/flechaUpClick.png");
  });
  $(".up").mouseup(function(){
    $(this).children().attr("src", "imagenes/flechaUpSelect.png");
  });

  $(".down").mousedown(function(){
    var num = parseInt($(this).prev().html());
    $(this).prev().html((num==0)?9:num-1);
    if($(this).parent().css("opacity") != 1){
      $("div[style='opacity:1']").attr("style", "opacity:0.5");
      $(this).parent().attr("style", "opacity:1");
    }
    $(this).children().attr("src", "imagenes/flechaDownClick.png");
  });
  $(".down").mouseup(function(){
    $(this).children().attr("src", "imagenes/flechaDownSelect.png");
  });
  $("#enter").click(function(){
    enter();
  })
  $("#reset").click(function(){
    codigoSecreto = [];
    generaCodigo();
    $("#error").children("th").remove();
    $("tbody").children("tr").remove();
    $(this).blur();
  })
  generaCodigo();
}
function generaCodigo(){
  contador=0;
  do{
    var random = Math.floor(Math.random() * 10);
    if(codigoSecreto.indexOf(random)<0){
      codigoSecreto.push(random);
    }
  }while(codigoSecreto.length !=4);
}
function enter(){
  if(contador==4){
    $("#tabla").css({"overflow":"scroll","overflow-x":"hidden"});
  }
  contador--;
  $("#error").children("th").remove();
  millar = parseInt($("#millar").children("p").html());
  centenas = parseInt($("#centenas").children("p").html());
  decenas = parseInt($("#decenas").children("p").html());
  unidades = parseInt($("#unidades").children("p").html());
  var muertos =0;
  var heridos =0;
  if(comprobar()==true){
    if(codigoSecreto.indexOf(millar)>=0){
      if(codigoSecreto.indexOf(millar)==0){
        muertos++;
      }else{
        heridos++;
      }
    }
    if(codigoSecreto.indexOf(centenas)>=0){
      if(codigoSecreto.indexOf(centenas)==1){
        muertos++;
      }else{
        heridos++;
      }
    }
    if(codigoSecreto.indexOf(decenas)>=0){
      if(codigoSecreto.indexOf(decenas)==2){
        muertos++;
      }else{
        heridos++;
      }
    }
    if(codigoSecreto.indexOf(unidades)>=0){
      if(codigoSecreto.indexOf(unidades)==3){
        muertos++;
      }else{
        heridos++;
      }
    }
    if(muertos == 4){
      $("body").children().remove();
      $("body").css({"background": "url(imagenes/fondoAbierto.jpg) no-repeat center center fixed","-webkit-background-size":" cover","-moz-background-size":" cover","-o-background-size":" cover","background-size":" cover","margin-right":" 0px","margin-top": "0px"});
      $("body").append("<button type='button' id='botonFinal'>RESET</button>");
      $("#botonFinal").click(function(){
        location.reload(true);
      });
    }else{
      $("tbody").prepend("<tr><td>"+millar+""+centenas+""+decenas+""+unidades+"</td><td>"+muertos+"</td><td>"+heridos+"</td></tr>");
      contador+=2;
    }
  }else{
    $("#error").prepend("<th colspan='3'>Los dígitos no son diferentes</th>");
    contador++;
  }
}
function comprobar(){
  var numeros = [millar];
  if(numeros.indexOf(centenas)>=0){
    return false;
  }else{
    numeros.push(centenas);
    if(numeros.indexOf(decenas)>=0){
      return false;
    }else{
      numeros.push(decenas);
      if(numeros.indexOf(unidades)>=0){
        return false;
      }
    }
  }
  return true;
}
