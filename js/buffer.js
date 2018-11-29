export function showBuf(map){
  var clickState2 = 0;
  var btn = document.querySelector('.button-elem');
  btn.addEventListener('click', function(){
    if (clickState == 0) {
      // code snippet 1
      circle.setMap(map);
      clickState = 1;
    } else {
      // code snippet 2
      circle.setMap(null);
      clickState = 0;
    }
  });
}
