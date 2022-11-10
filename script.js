// Animation
document.querySelector( "#retrobg-sun" ).onclick = () => {
  document.querySelector( "#retrobg" ).classList.toggle( "retrobg-shutdown" );
};
// Reference: https://codepen.io/alvarotrigo 

const buttonRandomColor = document.getElementById('button-random-color');

const colorChoose2 = document.getElementById('colorChoose2');
const colorChoose3 = document.getElementById('colorChoose3');
const colorChoose4 = document.getElementById('colorChoose4');

function changeColors() {
  const storageColor2 = colorRandomRgb();
  const storageColor3 = colorRandomRgb();
  const storageColor4 = colorRandomRgb();
  const allStorageColors = [storageColor2, storageColor3, storageColor4];
  localStorage.setItem('colorPalette', JSON.stringify(allStorageColors));
  // Onde as cores serão armazenadas

  colorChoose2.style.backgroundColor = storageColor2; // Armazena cor 2
  colorChoose3.style.backgroundColor = storageColor3; // Armazena cor 3
  colorChoose4.style.backgroundColor = storageColor4; // Armazena cor 4
}
// --- Gerador de cores aleatórias

function colorRandomRgb() {
  let firstColorRed = Math.random() * (255 - 0) + 1;
  firstColorRed = Math.floor(firstColorRed);

  let secondColorGreen = Math.random() * (255 - 0) + 1;
  secondColorGreen = Math.round(secondColorGreen);

  let thirdColorBlue = Math.random() * (255 - 0) + 1;
  thirdColorBlue = Math.round(thirdColorBlue);

  return `rgb(${firstColorRed}, ${secondColorGreen}, ${thirdColorBlue})`;
}

if (localStorage.length === 0) {
  changeColors();
} else {
  const recoveredColors = JSON.parse(localStorage.getItem('colorPalette'));
  // Recupera array com as cores e converte para array
  colorChoose2.style.backgroundColor = recoveredColors[0];
  colorChoose3.style.backgroundColor = recoveredColors[1];
  colorChoose4.style.backgroundColor = recoveredColors[2];
  // Reatribui cores armazenadas a cada elemento respectivo
}

buttonRandomColor.addEventListener('click', changeColors);

// --- Gerar quadro

const pixelBoard = document.querySelector('#pixel-board');

function squareBoard(numberPixels) {
  pixelBoard.innerHTML = ''; // Limpando as divs "pixels"

  localStorage.setItem('boardSize', JSON.stringify(numberPixels)); // Salva o quadro do usuário

  for (let index = 0; index < numberPixels**2; index += 1) {
    const div = document.createElement('div');

    div.className = 'pixel';
    div.id = index;
    div.addEventListener('click', colorSelector);
    // Vai escutar o que esta acontecendo nas divs

    pixelBoard.appendChild(div);
  }
  // Altera a quantidade de linhas de acordo com o solicitado pelo usuário
  pixelBoard.style["grid-template-columns"] = `repeat(${numberPixels}, 40px)`;
}

  // Verifica se localStorage boardSize está vazio
if (localStorage.getItem('boardSize') === null) {
  squareBoard(5);
} else {
  squareBoard(JSON.parse(localStorage.getItem('boardSize')))
}

// Captura botão VQV e valor inserido pelo usuário

const captureButton = document.querySelector('#generate-board');

captureButton.addEventListener('click', function () {
  const captureInput = document.querySelector('#board-size');
  console.log(captureInput.value); // Captura o valor de VQV

  if (captureInput.value === '' ) { // Mensagem de alerta
    alert('Board inválido!');
  } else if (captureInput.value < 5) {
    squareBoard(5);
  } else if (captureInput.value > 50) {
    squareBoard(50);
  } else {
    squareBoard(captureInput.value); // Valor do usuário
  }
})

// Captura cor da paleta para pintar os pixels

function colorSelector(event) {
  // Captura o pixel clicado nas divs da função squareBoard
  const selectedColor = event.target;

  // Captura cor selecionada para pintar
  const color = document.querySelector('.selected').style.backgroundColor;

  selectedColor.style.backgroundColor = color;
  captureArtPixel();
}

// --- Cores da paleta
const paletteBoard = document.getElementsByClassName('color');

function colorPaletteBoard(event) {
  const actualClick = event.target; // Vai escutar onde estou clicando na paleta

  const colorClick = document.getElementsByClassName('selected');
  // Vai capturar o elemento e vai colocar em 1 posição na array

  colorClick[0].classList.remove('selected');
  // Vai remover classe do elemento que contenha selected

  actualClick.classList.add('selected');
  // Vai adicionar o selected no elemento clicado que não o contenha
}

for (let i = 0; i < paletteBoard.length; i += 1) {
  paletteBoard[i].addEventListener('click', colorPaletteBoard);
}
// Percorre a paleta de cores e adiciona o escutador a todos elementos

// --- Botão limpar quadro

const buttonClearBoard = document.getElementById('clear-board');
const pixelStart = document.getElementsByClassName('pixel');

// Percorre todo quadro e tranforma os pixels em brancos

function colorClear() {
  for (let i2 = 0; i2 < pixelStart.length; i2 += 1) {
    pixelStart[i2].style.backgroundColor = 'white';
  }
  captureArtPixel(); // Limpa também o que é capturado em loadArtPixel
}
buttonClearBoard.addEventListener('click', colorClear);

// --- Salvar Pixel Art parte 01

const captureBoard = document.querySelector('#pixel-board');

// --- Salvar Pixel Art parte 02

function captureArtPixel() {
  let storedArtPixel = []; // Jogar capturados nesta array

  for (let i3 = 0; i3 < pixelStart.length; i3 += 1) {
    storedArtPixel.push(pixelStart[i3].style.backgroundColor);
    // console.log(pixelStart[i3]);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(storedArtPixel));
  // Salva o Pixel Arte feito por último
}

function loadArtPixel() {
  // Verifica se localStorage pixelBoard está vazio
  if (localStorage.getItem('pixelBoard') === null ) {
    localStorage.setItem('pixelBoard', '[]');
  } 

  let artSaved = JSON.parse(localStorage.getItem('pixelBoard'));

  for (let i4 = 0; i4 < pixelStart.length; i4 += 1) {
    pixelStart[i4].style.backgroundColor = artSaved[i4];
    // Recupera o Pixel Arte do localstorage e insere em cada índice
  }
}
loadArtPixel();

// !!! AGRADECIMENTO ESPECIAL !!! 
// Professor Lucas Leal - (https://www.linkedin.com/in/lucaslealsp)
// Obrigado pelo incentivo e por tudo que vem ensinando a mim e meus colegas, e por contribuir para nos tornar profissionais de valor!
// Desejo todo sucesso a você!
