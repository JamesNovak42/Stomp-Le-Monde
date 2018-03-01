var u;
var UnitPanel = function() {
	var i, j, div, unit, button, units = ['inf','tank','ifv','aa'], sides = ['ru','us'];

	$('#hider').on('click',this.hide.bind(this));

	this.panel = mkElement('div', { id: 'unit-panel', className: 'unit-panel' });
	button = mkElement('div', { id: 'unit-panel-button' });
	$(button).on('click', this.show.bind(this));
	this.panel.appendChild(button);
	this.divs = [];
	this.fndragstop = this.dragStop.bind(this);
	for (i in sides) {
		for (j in units) {
			div = mkElement('div', { className: 'unit-panel-div ' +sides[i]+'-'+units[j]+'-div' });
			unit = this.makeUnit(this,sides[i],units[j]);
			div.appendChild(unit);
			this.divs.push(div);
		}
	}
	this.panel.appendChildren(this.divs);
	document.body.appendChild(this.panel);
}

UnitPanel.prototype.onDrag = function(e) {
	var pos, width, height, el, i, touches = e.originalEvent.touches || [e.originalEvent];
	this.drag = [];
	for (i = 0; i < touches.length; i++) {
		el = touches[i].target;
		if (!el) continue;
		el.style.left = (e.touches[i].x - (el.clientWidth/2)) + 'px';
		el.style.top = (e.touches[i].y - (el.clientHeight/2)) + 'px';
	}
}

UnitPanel.prototype.makeUnit = function(that,side,type) {
	var unit = mkElement('div', { className: side+' '+type });
	$(unit).draggable();
	$(unit).on('dragstop',that.fndragstop);
	return unit;
}

UnitPanel.prototype.dragStop = function(e) {
	var unit, el = $(e.target),
		side = e.target.classList[0],
		type = e.target.classList[1];

	el.absolutize();
	document.body.appendChild(e.target);
	el.off('dragstop',this.fndragstop);
	el.addClass('on-map');
	el.on('click', this.nameUnit.bind(this));
	el.hammer().bind('hold',this.removeUnit.bind(this));

	unit = this.makeUnit(this,side,type);
	$('.'+side+'-'+type+'-div')[0].appendChild(unit);
}

UnitPanel.prototype.hide = function(e) { $('#unit-panel').removeClass('show'); console.log('UnitPanel hide'); }
UnitPanel.prototype.show = function(e) { $('#unit-panel').addClass('show'); }

UnitPanel.prototype.nameUnit = function(e) {
	setTimeout(function () {	
		var textNode, res = prompt('Name unit (3 char max)');
		if (res !== null && res !== '') {
			if (e.target.childNodes.length > 0) {
				e.target.removeChild(e.target.firstChild);
			}
			textNode = document.createTextNode(res.toUpperCase());
			e.target.appendChild(textNode);
		}
	}, 10);
	return false;
}
UnitPanel.prototype.removeUnit = function(e) {
	$(e).off();
	e.target.parentNode.removeChild(e.target);
	return false;
}