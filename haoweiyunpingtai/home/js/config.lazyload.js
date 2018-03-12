// lazyload config

angular.module('app')
/**
 * jQuery plugin config use ui-jq directive , config the js and css files that required
 * key: function name of the jQuery plugin
 * value: array of the css js file located
 */
  .constant('JQ_CONFIG', {
    plot: ['../public/js/jquery/charts/flot/jquery.flot.min.js',
      '../public/js/jquery/charts/flot/jquery.flot.resize.js',
      '../public/js/jquery/charts/flot/jquery.flot.tooltip.min.js',
      '../public/js/jquery/charts/flot/jquery.flot.spline.js',
      '../public/js/jquery/charts/flot/jquery.flot.orderBars.js',
      '../public/js/jquery/charts/flot/jquery.flot.pie.min.js'],
    footable: ['../public/js/jquery/footable/footable.all.min.js',
      '../public/js/jquery/footable/footable.core.css']
  }
)
  // oclazyload config
  .config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    // We configure ocLazyLoad to use the lib script.js as the async loader
    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
      modules: [
        {
          name: 'angularBootstrapNavTree',
          files: [
            '../public/js/modules/angular-bootstrap-nav-tree/abn_tree_directive.js',
            '../public/js/modules/angular-bootstrap-nav-tree/abn_tree.css'
          ]
        },
        {
          name: 'textAngular',
          files: [
            '../public/js/modules/textAngular/textAngular-sanitize.min.js',
            '../public/js/modules/textAngular/textAngular.min.js'
          ]
        },
        {
          name: 'ui.select',
          files: [
            '../public/js/modules/angular-ui-select/select.min.js',
            '../public/js/modules/angular-ui-select/select.min.css'
          ]
        }
      ]
    });
  }])
;