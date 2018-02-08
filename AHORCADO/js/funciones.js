/*Variables relacionadas con la serie a adivinar*/
var posicion = Math.floor(Math.random() * palabras.length);
var serie = palabras[posicion];
var arrayDeLetras = serie.replace(/ /g, "").split("");
var palabrasSerie = serie.split(" ");
/*Variable de la vida*/
var corazones = 60;
/*Variables de donde se guardara las letras ya dichas y el numero de letras acertadas*/
var usadas = [];
var letrasAcertadas =0;
/*variables del cronometro*/
var minutosMostrar =0;
var segundosMostrar = 0;
var nivel;


/*DA COMIENZO AL JUEGO*/
function start(snivel){
    /*Reconoce las letras pulsadas*/
    document.onkeyup = transformaTeclado;
    nivel = snivel;
    /*Genera el fondo dependiendo del nivel*/
    document.body.style.background = 'url(AHORCADO/imagenes/fondos/'+nivel+'.jpg) no-repeat center center fixed';
    document.body.style.backgroundSize = "cover";
    /*Tiene en cuenta si es la primera vez que se entra en el nivel para no mostrar siempre las instrucciones*/
    if(!document.getElementById('botones')){
      /*Se vuelve a buscar una nueva serie y se reinicia todos los contadores*/
        minutosMostrar =0;
        segundosMostrar = 0;
        posicion = Math.floor(Math.random() * palabras.length);
        serie = palabras[posicion];
        arrayDeLetras = serie.replace(/ /g, "").split("");
        palabrasSerie = serie.split(" ");
        corazones = 60;
        usadas = [];
        letrasAcertadas =0;
        botonesreinicio(nivel);
        cronometro(nivel);
        generaCorazones();
        generaPista(nivel);
        generaCuadraditos(nivel);
        generaMonigote();
        creaPanel(nivel);
    }else{
      /*Al ser la primera vez se desactivan los botones de elección de menú, luego muestra las reglas del nivel*/
        document.getElementById('botones').style.display = "none";
        introduccion(nivel);
    }
}

/*SE GENERA LA PRIMERA VEZ QUE ENTRAS EN UN NIVEL, TE MOSTRARÁ REGLAS DEL NIVEL E INFORMACIÓN SOBRE ESTE*/
function introduccion(nivel){
    var divPanel = document.createElement("div");
    divPanel.setAttribute("id", "box");
    if(nivel == 'facil'){
        divPanel.appendChild(document.createElement("p").appendChild(document.createTextNode("Bienvenidos al bosque donde pocos peligros puedes encontrar.")));
        divPanel.appendChild(document.createElement('br'));
        divPanel.appendChild(document.createElement('br'));
        divPanel.appendChild(document.createElement("p").appendChild(document.createTextNode("Una pista dos corazones os costarán.")));
        divPanel.appendChild(document.createElement('br'));
        divPanel.appendChild(document.createElement('br'));
        divPanel.appendChild(document.createElement("p").appendChild(document.createTextNode("Un fallo media vida os quitará, pero tranquilos que vuestros fallos se recordarán.")));
    }else{
        if(nivel == 'medio'){
            divPanel.appendChild(document.createElement("p").appendChild(document.createTextNode("Bienvenidos viajeros, sentaos y descansad, pero algunas cosas os he de avisar.")));
            divPanel.appendChild(document.createElement('br'));
            divPanel.appendChild(document.createElement('br'));
            divPanel.appendChild(document.createElement("p").appendChild(document.createTextNode("Una pista tres corazones os costarán.")));
            divPanel.appendChild(document.createElement('br'));
            divPanel.appendChild(document.createElement('br'));
            divPanel.appendChild(document.createElement("p").appendChild(document.createTextNode("Un fallo una vida os quitará, pero tranquilos que vuestros fallos se recordarán.")));
        }else{
            divPanel.appendChild(document.createElement("p").appendChild(document.createTextNode("Bienvenidos al castillo ambulante donde la vuelta a la infancia es una realidad.")));
            divPanel.appendChild(document.createElement('br'));
            divPanel.appendChild(document.createElement("p").appendChild(document.createTextNode("Mas tened cuidado, esta nostalgia os puede traicionar.")));
            divPanel.appendChild(document.createElement('br'));
            divPanel.appendChild(document.createElement('br'));
            divPanel.appendChild(document.createElement("p").appendChild(document.createTextNode("Una pista cuatro corazones os costarán.")));
            divPanel.appendChild(document.createElement('br'));
            divPanel.appendChild(document.createElement('br'));
            divPanel.appendChild(document.createElement("p").appendChild(document.createTextNode("Un fallo una vida os quitará.")));
            divPanel.appendChild(document.createElement('br'));
            divPanel.appendChild(document.createElement('br'));
            divPanel.appendChild(document.createElement("p").appendChild(document.createTextNode("Recordad vuestros fallos y aciertos, si no media vida perderéis.")));
        }
    }
    document.body.appendChild(divPanel);
    /*Genera el boton que dara inicio al juego teniendo en cuenta el nivel seleccionado anteriormente*/
    var boton = document.createElement("button");
    boton.setAttribute("onclick", "reinicioNivel('"+nivel+"')");
    boton.setAttribute("style", "background:url(AHORCADO/imagenes/iconos/gatobus.png) no-repeat; background-size: 150px 100px; margin-left:45%");
    boton.appendChild(document.createTextNode("JUGAR"));
    boton.setAttribute("class", "gatobus");
    document.body.appendChild(boton);
}

/*GENERA LOS BOTONES QUE PERMITIRAN VOLVER A LA PÁGINA PRINCIPAL O VOLVER A COMENZAR LA PARTIDA*/
function botonesreinicio(nivel){
    var botones = document.createElement("div");
    /*Genera boton de reinicio de nivel*/
    var boton = document.createElement("button");
    boton.setAttribute("onclick", "reinicioNivel('"+nivel+"')");
    boton.setAttribute("style", "background:url(AHORCADO/imagenes/iconos/gatobus.png) no-repeat; background-size: 150px 100px");
    boton.appendChild(document.createTextNode("RESTART"));
    boton.setAttribute("class", "gatobus");
    botones.appendChild(boton);
    /*Genera boton de vuelta al menu*/
    var boton = document.createElement("button");
    boton.setAttribute("onclick", "reinicioTodo()");
    boton.setAttribute("style", "background:url(AHORCADO/imagenes/iconos/gatobus.png) no-repeat; background-size: 150px 100px");
    boton.appendChild(document.createTextNode("MENÚ"));
    boton.setAttribute("class", "gatobus");
    botones.appendChild(boton);
    botones.setAttribute("id", "gatobus");
    document.body.appendChild(botones);
}

/*SE ACTIVA AL PULSAR EL BOTON DE VOLVER A COMENZAR EL NIVEL*/
function reinicioNivel(nivel){
  /*Para la ejecución de myVar para que no continue el cronómetro*/
    if(document.getElementById('segundos')){
        clearInterval(myVar);
    }
    /*Elimina todos los nodos de la pagina*/
    var element = document.body;
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    /*Vuelve a crear los elementos de nuevo comenzando todos los contadores a cero*/
    start(nivel);
}

/*REINICIA Y VUELVE AL MENU PRINCIPAL*/
function reinicioTodo(){
    window.location.reload();
}

/*CREA EL CRONOMETRO*/
function cronometro(){
    var panelcronometro = document.createElement("div");
    panelcronometro.setAttribute("id", "panelcronometro");
    var minutos = document.createElement("span");
    minutos.setAttribute("id", "minutos");
    minutos.appendChild(document.createTextNode("00:"));
    panelcronometro.appendChild(minutos);
    var segundos = document.createElement("span");
    segundos.setAttribute("id", "segundos");
    segundos.appendChild(document.createTextNode("00"));
    panelcronometro.appendChild(segundos);
    document.body.appendChild(panelcronometro);
    comenzar();
}

/*DA INICIO AL CRONOMETRO*/
function comenzar(){
    myVar = setInterval(myTimer, 1000);
}

/*AUMENTA EL TIEMPO*/
function myTimer(){
    segundosMostrar++;
    segundosMostrar = segundosMostrar%60;
    if(segundosMostrar<10){
        document.getElementById("segundos").innerHTML = "0"+segundosMostrar;
    }else{
        document.getElementById("segundos").innerHTML = segundosMostrar;
    }
    if(segundosMostrar == 0){
        minutosMostrar++;
        /*Si el tiempo alcanza una hora el juego se dara por finalizado*/
        if(minutosMostrar==60){
            finDeJuego(3,nivel);
        }
        minutosMostrar = minutosMostrar%60;
        if(minutosMostrar<10){
            document.getElementById("minutos").innerHTML = "0"+minutosMostrar+":";
        }else{
            document.getElementById("minutos").innerHTML = minutosMostrar+":";
        }
    }
}

/*GENERA LA BARRA DE CORAZONES CON TODOS LOS CORAZONES*/
function generaCorazones(){
    var imgCorazon = document.createElement("img");
    imgCorazon.setAttribute("id", "corazones");
    imgCorazon.setAttribute("src", "AHORCADO/imagenes/corazones/60.png");
    document.body.appendChild(imgCorazon);
}

/*CREA EL BOTON DE PISTA AL SER PULSADO MOSTRARA LA PISTA CORRESPONDIENTE A LA SERIE QUE CORRESPONDA*/
function generaPista(nivel){
    var buttonPista = document.createElement("button");
    buttonPista.setAttribute("id", "pista");
    buttonPista.setAttribute("onclick", "visualizaPistas('"+nivel+"')");
    buttonPista.appendChild(document.createTextNode("PISTA"));
    document.body.appendChild(buttonPista);
}

/*MOSTRARA LA PISTA RELACIONADA CON LA SERIE QUE CORRESPONDA*/
function visualizaPistas(nivel){
    document.getElementById('pista').style.background =  'url(AHORCADO/imagenes/pistas/'+serie.replace(/ /g, "")+'.png) no-repeat';
    document.getElementById('pista').style.backgroundSize = "150px 150px ";
    document.getElementById('pista').style.border = "none";
    document.getElementById('pista').innerHTML = "";
    document.getElementById('pista').disabled = true;
    /*Teniendo en cuenta el nivel, restara los corazones que correspondan*/
    if(nivel == "facil"){
        calculaCorazones(20, nivel);
    }else {
        if(nivel == "medio"){
            calculaCorazones(30, nivel);
        }else{
            calculaCorazones(40, nivel);
        }
    }
}

/*MODIFICARA LA BARRA DE SALUD RECIBIENDO POR PARAMETRO LA CANTIDAD DE VIDA QUE HAY QUE RESTARLE*/
function calculaCorazones(num, nivel){
    corazones-=num;
    /*Teniendo en cuenta la vida actualizada cambiara la barra de corazones por la correspondiente*/
    document.getElementById('corazones').src = "AHORCADO/imagenes/corazones/"+corazones+".png";
    /*Teniendo en cuenta la vida actualizada cambiara el monigote por el correspondiente*/
    document.getElementById('monigote').src = "AHORCADO/imagenes/monigotes/totoro"+Math.trunc((corazones/10)+((corazones%10 !=0)?1:0))+".png";
    /*Una vez alcanzado las cero vidas o estando por debajo de ellas se dara por finalizado el juego*/
    if(corazones<=0){
        finDeJuego(0, nivel);
    }
}

/*SE EJECUTARA CUANDO EL JUEGO SE HAYA FINALIZADO*/
function finDeJuego(valor, nivel){
    /*Para la ejecución de myVar para que no continue el cronómetro*/
    if(document.getElementById('segundos')){
        clearInterval(myVar);
    }
    /*Una vez finalizado se eliminaran todos los elementos de la página*/
    var element = document.body;
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    /*Acontinuación se generará la página teniendo en cuenta como finalizo el juego*/
    var divPanel = document.createElement("div");
    divPanel.setAttribute("id", "box");
    if(valor == 1){
      /*JUEGO GANADO*/
        var puntuacion = (((corazones*(nivel == "medio")?2:3)/(segundosMostrar+(minutosMostrar*60)))*100);
        puntuacion = puntuacion.toFixed(2);
        var imgMonigote = document.createElement("img");
        imgMonigote.setAttribute("id", "gif");
        imgMonigote.setAttribute("src", "AHORCADO/imagenes/monigotes/totorogana.gif");
        imgMonigote.setAttribute("style","width:500px");
        divPanel.appendChild(imgMonigote);


        divPanel.appendChild(document.createElement('br'));
        divPanel.appendChild(document.createElement("p").appendChild(document.createTextNode("¡HAS GANADO!")));
        divPanel.appendChild(document.createElement('br'));
        divPanel.appendChild(document.createElement('br'));
        divPanel.appendChild(document.createElement("p").appendChild(document.createTextNode("Tu puntuación: "+puntuacion)));

    }else{
        /*SE HA PERDIDO EL JUEGO*/
        var imgMonigote = document.createElement("img");
        imgMonigote.setAttribute("id", "gif");
        imgMonigote.setAttribute("src", "AHORCADO/imagenes/monigotes/totoro.gif");
        divPanel.appendChild(imgMonigote);
        /*Se especificara la razón por la cual perdio el usuario*/
        if(valor == 0){
            divPanel.appendChild(document.createTextNode("¡SIN VIDAS, HAS PERDIDO!"));
            divPanel.appendChild(document.createElement('br'));
            divPanel.appendChild(document.createElement('br'));
            divPanel.appendChild(document.createElement("p").appendChild(document.createTextNode("La serie era: "+serie)));

        }else{
            divPanel.appendChild(document.createTextNode("¡DEMASIADO TIEMPO, HAS PERDIDO!"));
            divPanel.appendChild(document.createElement('br'));
            divPanel.appendChild(document.createElement('br'));
            divPanel.appendChild(document.createElement("p").appendChild(document.createTextNode("La serie era: "+serie)));
        }
    }
    document.body.appendChild(divPanel);
    /*Se generarán los botones de reinicio de nivel y vuelta al menú*/
    botonesreinicio(nivel);
    document.getElementById('gatobus').setAttribute("style", "margin-left:37%");
}

/*GENERA LOS HUECOS CORRESPONDIENTES A LAS LETRAS DE LA SERIE*/
function generaCuadraditos(nivel){
    var nosalto =true;
    var divPanel = document.createElement("div");
    divPanel.setAttribute("id", "serie");
    document.body.appendChild(divPanel);
    /*Teniendo en cuenta el nivel se asignara una imagen que sustituya a las letras*/
    for(var i =0, cont =0; i <palabrasSerie.length;i++,cont++){
        for (var e = 0; e < palabrasSerie[i].length; e++,cont++) {
            document.getElementById("serie").innerHTML +=  '<span class="incognita"><img src="AHORCADO/imagenes/iconos/'+nivel+'Oculto.png" width="40px"></span>';
        }
        if(cont >=12 ){
            document.getElementById("serie").innerHTML += '</br>';
            if(cont != serie.length){
                cont =0;
                nosalto = false;
            }
        }else{
            document.getElementById("serie").innerHTML += '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
        }
    }
    document.getElementById("serie").setAttribute("style", "padding-left:50%; margin-left: -"+(((nosalto==true)?cont:12)*20) +"px");
}

/*CREA LA IMAGEN DEL MONIGOTE INICIAL*/
function generaMonigote(){
    var imgMonigote = document.createElement("img");
    imgMonigote.setAttribute("id", "monigote");
    imgMonigote.setAttribute("src", "AHORCADO/imagenes/monigotes/totoro6.png");
    document.body.appendChild(imgMonigote);
}

/*GENERA EL PANEL CON LAS LETRAS DEL ABECEDARIO*/
function creaPanel(nivel){
    var divPanel = document.createElement("div");
    divPanel.setAttribute("id", "panel");
    document.body.appendChild(divPanel);
    var element = document.getElementById("panel");
    for(var e =0; e < letras.length ;e++){
        var boton = document.createElement("button");
        boton.setAttribute("onclick", "activa('"+letras[e]+"','"+nivel+"')");
        boton.setAttribute("style", "background:url(AHORCADO/imagenes/iconos/"+nivel+".png) no-repeat; background-size: 50px 50px");
        boton.setAttribute("class", "botonPanel");
        boton.appendChild(document.createTextNode(letras[e]));
        element.appendChild(boton);
        if((e+1)%9==0){
            var saltolinea = document.createElement("br");
            element.appendChild(saltolinea);
        }
    }
}

/*RECONOCE LA TECLA PULSADA*/
function transformaTeclado(elEvento) {
  var evento = window.event || elEvento;
  /*Si el codigo es una letra se busca que letra le corresponde*/
 if((evento.keyCode>=65 && evento.keyCode<=90) || evento.keyCode == 0 || evento.keyCode ==192 ){
      for (var tecla in teclas){
        /*Se busca que letra corresponde con esa tecla y se indica que ha sido pulsada*/
        if(tecla == evento.keyCode){
              activa(teclas[tecla], nivel);
          }
      }
  }
}

/*SE EJECUTA CUANDO SE SELECCIONE UNA LETRA*/
function activa(letra, nivel){
    /*Comprueba que la serie contenga esa letra y que la letra no se haya usado anteriormente*/
    if(arrayDeLetras.indexOf(letra) >=0 && usadas.indexOf(letra) <0){
        /*Cambia los sustitutos de las letras por las letras y aumenta el contador de letras que ha acertado el usuario*/
        for(var i =0; i <arrayDeLetras.length;i++){
              if(letra == arrayDeLetras[i]){
                  document.getElementsByClassName('incognita')[i].innerHTML = letra;
                  letrasAcertadas++;
              }
        }
        /*Si no esta jugando el usuario en nivel dificil deshabilitará el boton de esa letra y lo dejara transparente*/
        if(nivel != "dificil"){
            document.getElementsByClassName('botonPanel')[letras.indexOf(letra)].disabled = true;
            document.getElementsByClassName('botonPanel')[letras.indexOf(letra)].style.color = "transparent";
        }
          /*En caso de ser el nivel dificil no cambiara nada y agregara la letra al array de letras que ya han sido usadas,
          los niveles facil y medio tambien contarán las letras dichas*/
          usadas.push(letra);
    }else{
        /*Si la letra no esta en la palabra o ya se ha dicho y esta jugando en el nivel dificil*/
        if(nivel == "dificil"){
            /*si la letra ya ha sido dicha anterior mente se restara media vida*/
            if(usadas.indexOf(letra) >=0){
                calculaCorazones(5, nivel);
            }else{
              /*Si la letra no se ha dicho anteriormente se restara una vida y se agregara dicha letra al array de letras que ya han sido usadas*/
                calculaCorazones(10, nivel);
                usadas.push(letra);
            }
        }else{
          /*Si la letra no ha sido usada anteriormente en el nivel facil y dificil se restara*/
          if(usadas.indexOf(letra) <0){
            /*Si no se encuentra en el nivel dificil se deshabilitara el boton*/
            document.getElementsByClassName('botonPanel')[letras.indexOf(letra)].disabled = true;
            document.getElementsByClassName('botonPanel')[letras.indexOf(letra)].style.color = "transparent";
            if(nivel == "facil"){
                /*Si se encuentra en el nivel fácil se restara media vida*/
                calculaCorazones(5, nivel);
            }else{
                /*Si se encuentra en el nivel medio se restara una vida*/
                calculaCorazones(10,nivel);
            }
          }
        }
    }
    /*Si el número de aciertos corresponde con el número de letras que constituyen la serie el juego se finaliza*/
    if(letrasAcertadas == arrayDeLetras.length){
        finDeJuego(1, nivel);
    }
}
