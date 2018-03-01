var MapPanel = function() {
	var i, maps = [], types = ['i64','v64','i32','v32'], button;
	this.maps = {
		'Alborz Mountain': {
			'64': {
				ru: ['tank','tank'],
				us: []
			},
			'32': {
				ru: [],
				us: []
			}
		},
		'Armored Shield': {
			'64': {
				ru: [],
				us: []
			},
			'32': {
				ru: [],
				us: []
			}
		},
		'Bandar Desert': {
			'64': {
				ru: [],
				us: []
			},
			'32': {
				ru: [],
				us: []
			}
		},
		'Caspian Border': {
			'64': {
				ru: [],
				us: []
			},
			'32': {
				ru: [],
				us: []
			}
		},
		'Damavand Peak': {
			'64': {
				ru: [],
				us: []
			},
			'32': {
				ru: [],
				us: []
			}
		},
		'Death Valley': {
			'64': {
				ru: [],
				us: []
			},
			'32': {
				ru: [],
				us: []
			}
		},
		'Grand Bazaar': {
			'64': {
				ru: [],
				us: []
			},
			'32': {
				ru: [],
				us: []
			}
		},
		'Gulf of Oman': {
			'64': {
				ru: [],
				us: []
			},
			'32': {
				ru: [],
				us: []
			}
		},
		'Kharg Island': {
			'64': {
				ru: [],
				us: []
			},
			'32': {
				ru: [],
				us: []
			}
		},
		'Noshahr Canals': {
			'64': {
				ru: [],
				us: []
			},
			'32': {
				ru: [],
				us: []
			}
		},
		'Op. Firestorm': {
			'64': {
				ru: ['tank','tank','tank','tank','ifv','aa'],
				us: ['tank','tank','tank','tank','ifv','aa']
			},
			'32': {
				ru: [],
				us: []
			}
		},
		'Op. Metro': {
			'64': {
				ru: [],
				us: []
			},
			'32': {
				ru: [],
				us: []
			}
		},
		'Seine Crossing': {
			'64': {
				ru: [],
				us: []
			},
			'32': {
				ru: [],
				us: []
			}
		},
		'Sharqi Peninsula': {
			'64': {
				ru: [],
				us: []
			},
			'32': {
				ru: [],
				us: []
			}
		},
		'Strike At Karkand': {
			'64': {
				ru: [],
				us: []
			},
			'32': {
				ru: [],
				us: []
			}
		},
		'Tehran Highway': {
			'64': {
				ru: [],
				us: []
			},
			'32': {
				ru: [],
				us: []
			}
		},
		'Wake Island': {
			'64': {
				ru: [],
				us: []
			},
			'32': {
				ru: [],
				us: []
			}
		}
	};

	this.html = document.body.parentElement;
	$('#hider').on('click',this.hide.bind(this));

	this.panel = mkElement('div', { id: 'map-panel', className: 'map-panel' });
	button = mkElement('div', { id: 'map-panel-button' });
	$(button).on('click',this.show.bind(this));
	this.panel.appendChild(button);
	for (i in types) {
		this[types[i]] = mkElement('div', { id: types[i], className:'map-type-selector', text: types[i] });
	}
	$(this[types[0]]).addClass('type-selected');
	this.panel.appendChildren([this.i64, this.v64, this.i32, this.v32]);
	this.mapsDiv = mkElement('div', { id: 'map-div', className: 'map-div' });
	for (i in this.maps) {
		maps.push(mkElement('div', { id: i.replace(/\s+/g,'-'), className: 'map-selector', html: i }));//replace(/\s+/g,'<br>') }));
	}
	$(maps[0]).addClass('map-selected');
	this.mapsDiv.appendChildren(maps);
	this.panel.appendChild(this.mapsDiv);
	document.body.appendChild(this.panel);
	$('.map-type-selector').on('click',this.typeClick.bind(this));
	$('.map-selector').on('click',this.mapClick.bind(this));
	this.updateMap.bind(this);
}

MapPanel.prototype.hide = function(e) { $('#map-panel').removeClass('show'); console.log('UnitPanel hide'); }
MapPanel.prototype.show = function(e) { $('#map-panel').addClass('show'); }

MapPanel.prototype.updateMap = function(map,type) {
	var map  = $('.map-selected').get(0).id.replace(/-/g,' '),
		type = $('.type-selected').get(0).id.substring(1);
	$('.on-map').remove();
	//var map = "url('images/maps/"+map+" "+type+".jpg')";
	this.html.style.backgroundImage = "url('images/maps/"+map+" "+type+".jpg')";

}

MapPanel.prototype.typeClick = function(e) {
	var typeSelected = $('.type-selected');

	if (typeSelected.get(0) !== e.target) {
		typeSelected.removeClass('type-selected');
		$(e.target).addClass('type-selected');
		this.updateMap();
	}
	//e.stopPropagation();
	return false;
}

MapPanel.prototype.mapClick = function(e) {
	var mapSelected = $('.map-selected');

	if (mapSelected.get(0) !== e.target) {
		mapSelected.removeClass('map-selected');
		$(e.target).addClass('map-selected');
		this.updateMap();
	}
	//e.stopPropagation();
	return false;
}