require.config({
    baseUrl: '/js/',
    paths: {
        jquery: 'lib/jquery-2.1.1.min',
        flex: 'lib/flexible',
        index: 'page/index',
        handlebars: 'lib/handlebars-v4.0.11',
        tem: 'common/tem',
        message: 'message/index'
    }
})
require(['flex']);
require(['tem'])