
// Date
Date.prototype.months = new Array("Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro");
Date.prototype.weekdays = new Array("Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado");

Date.prototype.long = function() {
	return this.weekdays[this.getDay()] + ", " + this.getDate() + " de " + this.months[this.getMonth()]
	+ " de " + this.getFullYear();
}

Date.prototype.short = function() {
	return this.getDate() + "/" + this.getMonth();
}

// Forecast

function Forecast() {}

Forecast.prototype.build = function(data = null)
{
	function translateDataWheater(value) {
		switch(value) {
			// Ensolarado com muitas núvens
		    case 'cloudly_day':
		        return 'sunny'
		        break;
		    // Nublado
		    case 'cloud':
		        return 'sunny'
		        break;
		    // Tempestade
		    case 'storm':
		        return 'storm'
		        break;
		    default:
		        return 'sunny'
		}
	}

	function translateIconWheater(value) {
		switch(value) {
			// Ensolarado com muitas núvens
		    case 'cloudly_day':
		        return 'sun'
		        break;
		    // Nublado
		    case 'cloud':
		        return 'sun'
		        break;
		    // Tempestade
		    case 'storm':
		        return 'storm'
		        break;
		    default:
		        return 'sun'
		}
	}

	forecast = this;
	data = data ? data : this.data;
	forecast.forecasts = [];
	forecast.city = data['results']['city_name'];
	data['results']['forecast'].forEach(function(item, index){
		if (index > 7 ) return;
		year = new Date().getFullYear();
		month = item['date'].split('/')[1] - 1;
		day = item['date'].split('/')[0];
		date = new Date(year, month, day);
		forecast.forecasts[index] = {
			date: date,
			shortDate: date.short(),
			longDate: date.long(),
			temperature: item['max'],
			condition: item['condition'],
			dataWheater: translateDataWheater(item['condition']),
            iconWheater: translateIconWheater(item['condition'])
		}

	});
	return this;
}

Forecast.prototype.update = function(url) {

	var forecast = this;
	return new Promise(function (resolve, reject) {
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		//request.setRequestHeader('User-Agent', 'Mozilla/5.0');
		request.setRequestHeader('Access-Control-Allow-Origin', '*');
	    request.setRequestHeader('Access-Control-Allow-Methods', 'GET');

		request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				forecast.data = JSON.parse(request.responseText);
				forecast.build();
				resolve(request.responseText);
			} else {
			  reject({
		        status: this.status,
		        statusText: xhr.statusText
		      });
			}
		};

		request.onerror = function() {
		  reject({
	        status: this.status,
	        statusText: request.statusText
	      });
		};

		request.send();
	});
}