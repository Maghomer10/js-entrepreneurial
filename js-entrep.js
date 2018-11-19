jQuery(document).ready(function($) {
	var prefix_dynamic = '';
	var checkAnswers = function(from, to)
	{
		var pass = true;
		var str = 'Avant de poursuivre le questionnaire, vous devez répondre aux questions suivantes : ';
		for (; from <= to ; ++from)
			if ($('input[name=q' + from + ']:checked').val() == undefined)
			{
				$('input[name=q' + from + ']').parent().parent().addClass('error');
				pass = false;
				str += ' ' + from + ', ';
			}
			else
				$('input[name=q' + from + ']').parent().parent().removeClass('error');
		str = str.slice(0, -2);
		str += '.';
		if (pass)
		{
			$('.test-entrepreneurial-error').hide();
			return true;
		}
		$('.test-entrepreneurial-error').text(str).show();
		return false;
	};

	$('#test-entrepreneurial-go-step1').click(function() { $('#test-entrepreneurial-home').hide();$('#test-entrepreneurial-step1').show();return false; });
	$('#test-entrepreneurial-go-step2').click(function() { if (!checkAnswers(1, 24)) return false;$('#test-entrepreneurial-step1').hide();$('#test-entrepreneurial-step2').show();return false;});
	$('#test-entrepreneurial-go-end').click(function() {
		if (!checkAnswers(25, 48)) return false;
		$('#test-entrepreneurial-step2').hide();
		$('#test-entrepreneurial-results').show();
		var param = '';
		for (var from = 1; from <= 48 ; ++from)
			param += $('input[name=q' + from + ']:checked').val();
		$('#test-entrepreneurial-results-graph').html('<img src="http://www.cci.fr/test-profil-entrepreneurial/' + prefix_dynamic + '/render-graphic.php?answers=' + param + '" alt="Graphique de resultats" />');
		$('#test-entrepreneurial-pdf').attr('title', prefix_dynamic + 'http://www.cci.fr/test-profil-entrepreneurial/tpe.php?answers=' + param);
		$('#test-entrepreneurial-print').attr('title', prefix_dynamic + 'http://www.cci.fr/test-profil-entrepreneurial/render-print.html?answers=' + param);
		return false;
	});
	$('#test-entrepreneurial-print').click(function() { window.open($(this).attr('title')); });
	$('#test-entrepreneurial-pdf').click(function() { window.open($(this).attr('title')); });
	$('#test-entrepreneurial-reset').click(function() {
		for (var from = 1; from <= 48 ; ++from)
			$('input[name=q' + from + ']:checked').removeAttr("checked");
		$('#test-entrepreneurial-results-graph').empty();
		$('#test-entrepreneurial-results').hide();
		$('#test-entrepreneurial-home').show();
	});
});