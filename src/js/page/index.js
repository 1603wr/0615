define(['jquery', 'tem'], function($, tem) {
    $(function() {
        $('header>a').on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
            var index = $(this).index();
            $('.cont').css({
                transform: 'translateX(-' + index * 100 + '%)'
            })
        });
        $.ajax({
            url: '/api/json',
            dataType: 'json',
            success: render
        })

        function render(datas) {

            //console.log(data)   {data:[{},{}]}
            var onedata = {};
            onedata.data = datas.data.filter(function(v, i) {
                return v.info
            }); //filter筛出数据 之后返回一个新的数组 给onedata存入数组

            // console.log(arr)
            var twodata = {};
            twodata.data = datas.data.filter(function(v, i) {
                return v.info == false
            }); //filter筛出数据 之后返回一个新的数组 给onedata存入数组
            tem($('.han').html(), onedata, $('.list-one'))
            tem($('.han').html(), twodata, $('.list-two'))
        }
    });
})