Date.prototype.addHours = function(h) {
	this.setTime(this.getTime() + (h*3600000));
}

Date.prototype.addDays = function(d) {
	this.setTime(this.getTime() + (d*86400000));
}

Number.prototype.px = function() {
	return ''+this+'px';
}

String.prototype.px = function() {
	return parseInt(this.substring(0,this.length-2));
}

var mkElement = function(tag, attrs) {
	e = document.createElement(tag);
	for (attr in attrs) {
		switch(attr) {
			case 'text':
				e.appendChild(document.createTextNode(attrs[attr]));
				break;
			case 'html':
				e.innerHTML = attrs[attr];
				break;
			case 'className':
				e.setAttribute('class', attrs[attr]);
				break;
			default:
				e.setAttribute(attr, attrs[attr]);
		}
	}
	return e;
}

Element.prototype.appendChildren = function(kids) {
	if (kids instanceof Array) {
		for (var i = 0; i < kids.length; i++) {
			this.appendChild(kids[i]);
		}
	}
	if (kids instanceof HTMLElement) {
		this.appendChild(kids);
	}
}

var getEl = function(el) {
	if (typeof el === 'string') {
		return document.getElementById(el);
	} else if (el instanceof HTMLElement) {
		return el;
	} else {
		throw new Error('getEl(el) requires an HTMLElement or id string.');
		return null;
	}
}

var isObj = function(o) {
	return (typeof o === 'object' && typeof o.splice !== 'function');
}