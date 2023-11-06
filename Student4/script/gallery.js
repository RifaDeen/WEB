
   
function increaseFontSize() {
document.querySelectorAll('body *').forEach(function(element) {
  element.style.fontSize = '20px';
});
document.querySelector('.sec_head').style.fontSize='100px';
}


function decreaseFontSize() {
  document.querySelectorAll('body *').forEach(function(element) {
  element.style.fontSize = '12px';
}

);
document.querySelector('.sec_head').style.fontSize='40px';

}

function revertChanges() {

  document.querySelectorAll('body *').forEach(function(element) {
  element.style.fontSize = '15px';
})
document.querySelectorAll('.img-text ').forEach(function(element) {
  element.style.backgroundColor = 'wheat'
});
document.querySelector('.sec_head').style.fontSize='30px';
document.querySelector('body').style.backgroundColor='#324455';
}



function changeColor(color) {
  document.querySelectorAll('.img-text').forEach(function(element) {
  element.style.backgroundColor = color;
})


document.querySelector('body').style.backgroundColor=color;

}




function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function random_color() {
  document.querySelectorAll('.img-text ').forEach(function(element) {
  element.style.backgroundColor = getRandomColor();
})

document.querySelector('.sec_head').style.color=getRandomColor();
document.querySelector('body').style.backgroundColor=getRandomColor();

}

