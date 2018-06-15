define(['handlebars', 'jquery'], function(han) {
    return function(html, data, parent) {
        //设置预编译引擎内容
        var com = han.compile(html);
        han.registerHelper('showtime', function(items) {
            return new Date(items).toLocaleString()
        })
        var ele = com(data);
        parent.html(ele)

    }
})