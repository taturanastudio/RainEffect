
window.getQueryParams = function ( name, url ) {
  if (!url) url = location.href;
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  return results == null ? null : results[1];
}

window.getParam = function (param) {
  return window.getQueryParams(param, location);
}

function changeSlide() {
  (function slider(i) {
    if(i <= 5){
      location.hash = '#slide-' + i;
      window.setTimeout(function(){
        slider(++i);
      }, 2000);
    } else {
      return;
    }
  })(1);
}

function renderTemplate(container) {
  el = document.querySelectorAll('.container');
  el.innerHTML = "asdasd";
}

window.ready = function (fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}



window.ready(renderTemplate('#template'));
window.ready(changeSlide());