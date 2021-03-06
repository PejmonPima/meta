$.applyTextcomplete = function($element) {
  var textcompletesPath = '/api/textcompletes';
  var productId = $element.attr('data-product-id');
  if (!productId) {
    return;
  }

  var strategies = [
    {
      match: /(^|\s)((#|@)\w*)$/,

      search: function(query, callback) {
        var params = {
          product_id: productId,
          query: query
        }

        $.getJSON(textcompletesPath, params)
          .done(function(response) { callback(response['textcompletes']); })
          .fail(function() { callback([]); });
      },

      replace: function(value) {
        var match = value[0];

        return '$1' + match + ' ';
      },

      template: function(value) {
        var match = value[0];
        var detail = value[1];

        templateString = []
        templateString.push(match);
        templateString.push(' ');

        if(detail) {
          templateString.push('<span class="gray-2">');
          templateString.push(detail);
          templateString.push('</span>');
        }

        return templateString.join('');
      }
    }
  ];

  var options = {
    appendTo: $('body')
  };

  $element.textcomplete(strategies, options);
};

$(document).ready(function() {
  $('.textcomplete').each(function() {
    $.applyTextcomplete($(this));
  });
});
