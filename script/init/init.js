$(document).ready(function() {
	var isMouseDown = true;
	var size = 10;
	var table_body = $('#grid tbody');
	function toggleCurrentSquare() {
		var s = $('#selector .nav .dropdown-menu li.active').attr('selection');
		if($(this).hasClass('end') || $(this).hasClass('start') || ($(this).hasClass('obstacle') && s != '2')) {
			return;
		}
		if (s == '0') {
			$('#grid td.start').toggleClass('start');
			$(this).toggleClass('start');
		}
		else if (s == '1') {
			$('#grid td.end').toggleClass('end');
			$(this).toggleClass('end');
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
			table_body.find('#r' + String(i)).append('<td id="td' + String(j+i*10) + '"></td>');
			$('td#td'+String(j+i*10)).attr('x', j).attr('y', i);
		}
	}
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
	$('#header .nav li').not('.divider-vertical').click(function() {
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
});
