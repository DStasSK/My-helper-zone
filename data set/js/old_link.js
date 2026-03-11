// Если вдруг попадутся старые ссылки, то будет автопереход по новым
// data set/html_css/help/help.html
// data set/scripts/help js.html

// объект с хешами и новыми ссылками
let new_links = {
	'#accesskey' : "data%20set/html_css/atributes/accesskey.html",
	'#autofocus' : "data%20set/html_css/atributes/autofocus.html",
	'#box-sizing' : "data%20set/html_css/box-sizing.html",
	'#class' : "data%20set/html_css/atributes/class.html",
	'#contenteditable' : "data%20set/html_css/atributes/contenteditable.html",
	'#data' : "data%20set/html_css/atributes/data.html",
	'#dir' : "data%20set/html_css/atributes/dir.html",
	'#draggable' : "data%20set/html_css/atributes/draggable.html",
	'#hidden' : "data%20set/html_css/atributes/hidden.html",
	'#id' : "data%20set/html_css/atributes/id.html",
	'#important' : "data%20set/html_css/important.html",
	'#isolation' : "data%20set/html_css/isolation.html",
	'#itemid' : "data%20set/html_css/atributes/itemid.html",
	'#itemprop' : "data%20set/html_css/atributes/itemprop.html",
	'#itemref' : "data%20set/html_css/atributes/itemref.html",
	'#itemscope' : "data%20set/html_css/atributes/itemscope.html",
	'#itemtype' : "data%20set/html_css/atributes/itemtype.html",
	'#lang' : "data%20set/html_css/atributes/lang.html",
	'#object-fit' : "data%20set/html_css/help/img.html#of",
	'#pointer-events' : "data%20set/html_css/pointer-events.html",
	'#resize' : "data%20set/html_css/resize.html",
	'#scroll-behavior' : "data%20set/html_css/scroll-behavior.html",
	'#spellcheck' : "data%20set/html_css/atributes/spellcheck.html",
	'#style' : "data%20set/html_css/atributes/style.html",
	'#tabindex' : "data%20set/html_css/atributes/tabindex.html",
	'#title' : "data%20set/html_css/atributes/title.html",
	'#translate' : "data%20set/html_css/atributes/translate.html",
	'#var' : "data%20set/html_css/functions/var.html",

	'#console' : "data%20set/scripts/console.html",
	'#event.preventDefault' : "data%20set/scripts/preventDefault.html",
}

let href = window.location.href;
let domen = 'data%20set';

check_hash();

document.addEventListener('click', (e) => {
	let hash = (e.target.href) ? e.target.href :
						 (e.target.parentElement.href) ? e.target.parentElement.href : '';

	if ( (hash) && (hash[0]='#') ) {
		hash = hash.substring( hash.indexOf('.html') + 5 );
		check_hash(hash);
	}
});


function check_hash(hash){
	if (hash) {
		if ( new_links.hasOwnProperty( hash ) ) {
			choose_way(hash);
		}
	}
	else if ( new_links.hasOwnProperty( window.location.hash ) ) {
		if ( ~href.indexOf(domen) ) {
			choose_way(window.location.hash);
		}
	}
}

function choose_way(hash) {
	make_array_from_href();
	make_way( new_links[hash] , href );
}


function make_array_from_href() {
	href = href.slice( href.indexOf(domen) );
	href = href.substring( 0, href.indexOf('.html') + 5 ).split('/');
}


function make_way(way,href) {
	way = way.split('/');

	let new_link = '';
	let str_href = '';
	let str_way = '';
	let count = 0;

	// определяем более короткий путь для перебора
	let i = href.length < way.length ? href.length : way.length;

	for (let j = 0; j < i; j++) {
		str_href += href[j];
		str_way += way[j];
		if ( str_href == str_way ) {
			count++;
			continue;
		}
		if ( href[j].indexOf('.html') == -1 ) {
			new_link += '../';
		}
	}
	str_href = '';
	str_way = '';

	for (let j = count; j < way.length; j++) {
		new_link += way[j] + '/';
	}

	new_link = new_link.slice(0, -1);  // убираем последний слэш /

	// переход на новую страницу по сгенерированному относительному пути
	window.location.href = `${new_link}`;
}
