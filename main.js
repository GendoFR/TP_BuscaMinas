//Constantes del juego
const COLUMNAS = 10;
const FILAS = 10;
const CANTIDAD_MINAS = 10;

//Variables con colores para los casilleros (NO se pudieron declarar como constantes ya que  la fn color sólo está definida para el setup y el draw)
var COLOR_CASILLERO_CON_MINA;
var COLOR_CASILLERO_SIN_MINA;
var COLOR_CASILLERO_MARCADO;

//Variables controladas al hacer click con el mouse: mousePressed()
var columnaPresionada;
var filaPresionada;
var hizoClick = false;

//Otras variables
var casillerosSinDescubrir;



function setup()
{
  createCanvas(500, 500);   //crea un lienzo o panel donde estará el juego. El primer parámetro es el ancho y el segundo el alto del lienzo.
  laMagiaDeLosProfes();
  
  //Asigno colores que se utilizarán. La fn color solo está definida para el setup y el draw
  COLOR_CASILLERO_CON_MINA = color("#FF0000");
  COLOR_CASILLERO_SIN_MINA = color("#1CC932");
  COLOR_CASILLERO_MARCADO = color("#278EF2");
  casillerosSinDescubrir = FILAS*COLUMNAS
  // Modificar/completar
  
  ponerMinasTablero();
}


function draw() {
  if (hizoClick == true)
  {
    if(mouseButton == LEFT)
    {
      if(tieneMinaCasillero(columnaPresionada, filaPresionada))
      {
        mostrarMinas();
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_CON_MINA)
        perder()
      }
      else {
        //pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_SIN_MINA); //pinta el casillero clickeado. Modificar/completar
        descubrirCasillero(columnaPresionada, filaPresionada);
        if (ganoElJuego() == true)
        {
          ganar();
        }

      }
    }  
    if(mouseButton == RIGHT)
    {
      pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_MARCADO);
    }
    
    hizoClick = false;  //Indico que ya "procesé" el click del usuario. NO modificar
  }
}


function ganoElJuego()
{
  if (casillerosSinDescubrir > CANTIDAD_MINAS)
  {
    return false; 
  }
  else
  {
    return true;
  }
}
function ponerMinasTablero()
{
  var i = 0;
  while(i < CANTIDAD_MINAS)
  {
    var filaRandom = Math.floor(Math.random()*FILAS);
    var columnaRandom = Math.floor(Math.random()*COLUMNAS)
    if(tieneMinaCasillero(columnaRandom, filaRandom))
    {
      console.log(columnaRandom, filaRandom);
    }
    else
    {
      ponerMinaCasillero(columnaRandom, filaRandom);
      i++
      console.log(columnaRandom, filaRandom);
    }
  }
}

function mostrarMinas()
{
  for(let i = 0; i < FILAS; i++)
  {
    for(let colum = 0; colum < COLUMNAS; colum ++)
      if(tieneMinaCasillero(i, colum))
      {
        pintarCasillero(i, colum, COLOR_CASILLERO_CON_MINA);
      }
      else
      {
        colum = colum + 1;
      }
  }
}

function contarMinasAlrededor (columnaPresionada, filaPresionada)
{
  let minaCont = 0;
  let minaColumnas = [1, -1, -1, 0, 1, -1, 0, 1];
  let minaFilas = [0, 0, -1, -1, -1, 1, 1, 1];
  // Va de 0 a 8 porque es la cantidad de casilleros q tiene que revisar viste 
  for(let i = 0; i < 8; i++)
  {
    if(tieneMinaCasillero ((minaColumnas [i]+columnaPresionada), (minaFilas[i]+filaPresionada))) 
    {
      minaCont++;
    }
  }
  return minaCont;
}