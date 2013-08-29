function initialize(size) {
	var isMouseDown = true;
	var table_body = $('#grid tbody');
	function hasAClass(selector, classes) {
		for(i in classes) {
			if ($(selector).hasClass(classes[i])) {
				return true;
			}
		}
		return false;
	}
	function toggleCurrentSquare() {
		var s = $('#selector .nav .dropdown-menu li.active').attr('selection');
		if(hasAClass(this, ['end', 'start', 'path']) || ($(this).hasClass('obstacle') && s != '2')) {
			return;
		}
		if (s == '0') {
			$('#grid td.start').text('');
			$('#grid td.start').toggleClass('start');
			$(this).toggleClass('start');
			$(this).text('S');
		}
		else if (s == '1') {
			$('#grid td.end').text('');
			$('#grid td.end').toggleClass('end');
			$(this).toggleClass('end');
			$(this).text('E');
		}
		else if (s == '2') {
			if (!$(this).hasClass('toggled')) {
				$(this).toggleClass('obstacle').toggleClass('toggled');
			}
		}
	}
	function isDown() {
		return isMouseDown;
	}
	function condCallback(b, f) {
		return function() {
			if (b()) {
				$(this).each(f);
			}
		};
	}
	for(var i = 0; i < size; i++) {
		table_body.append('<tr id="r' + String(i) + '"></tr>');
		for(var j = 0; j < size; j++) {
			table_body.find('#r' + String(i)).append('<td id="td' + String(j+i*size) + '"></td>');
			$('td#td'+String(j+i*size)).attr('x', j).attr('y', i);
		}
	}
	var cs = String(Math.floor( 620 / size * 100) / 100 - 2);
	$('#grid td').css({'width' : cs, 'height' : cs});
	$(document).mousedown(function() {
		isMouseDown = true;
	});
	$(document).mouseup(function() {
		isMouseDown = false;
		$('.toggled').toggleClass('toggled');
	});
	$('#grid td').hover(
		function() {
			$(this).toggleClass('hovered');
		},
		function() {
			$(this).toggleClass('hovered');
		}
	);
	$('#grid td').mouseenter(condCallback(isDown, toggleCurrentSquare));
	$('#grid td').mousedown(toggleCurrentSquare);
	$('#header .nav li').not('.divider-vertical').not('#instructions').click(function() {
		$('#header .nav li.active').toggleClass('active');
		$(this).toggleClass('active');
	});
	$('#header .nav li').not('.divider-vertical').each(function(index, value) {
		$(this).attr("selection", index);
	});
	$('#selector .nav .dropdown-menu li').click(function() {
		$('#selector .nav .dropdown-menu li.active').toggleClass('active');
		$(this).toggleClass('active');
		$('#selector a.dropdown-toggle').text($(this).text()).append('<b class="caret"></b>');
	});
	$('#selector .nav .dropdown-menu li').each(function(index, value) {
		$(this).attr("selection", index);
	});
}
