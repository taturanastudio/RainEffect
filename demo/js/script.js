
/*
  DATA WHEATER
  rain
  drizzle
  sunny
  storm
  fallout

  WHEATER ICONS
  rainy
  drizzle
  sun
  storm
  radioactive

*/

var forecasts = {
  city: 'São Paulo',
  symbol: 'C',
  forecasts: [
    {
      title:'adasdasd',
      temperature: '23',
      longDate: 'Quinta-feira 13 de Outubro de 2016',
      shortDate: '13/10',
      dataWheater: 'rain',
      iconWheater: 'rainy'
    },{
      title:'qwerqwerqwer',
      temperature: '25',
      longDate: 'Sexta-feira 14 de Outubro de 2016',
      shortDate: '14/10',
      dataWheater: 'sunny',
      iconWheater: 'sun'
    }
  ]
}

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
  el = document.querySelectorAll('#main')[0];
  template = Handlebars.compile(document.querySelectorAll('#template')[0].innerHTML);
  el.innerHTML = template(forecasts);
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