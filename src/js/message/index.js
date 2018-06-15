define(['jquery'], function($) {



    $('.sub').on('click', function() {
        var textarea = $('.text-box').val();
        var text = $('.text').val();
        if (textarea !== "" && text !== "") {
            // $('.rig>i').on('click', function() {
            var htmls = $(this).text();
            $.ajax({
                    url: '/api/data',
                    data: {
                        address: encodeURIComponent(textarea),
                        cause: encodeURIComponent(text),
                        datetime: Date.parse(new Date()) * 1,
                        // cause: htmls
                    },
                    dataType: 'json',
                    success: function(data) {
                        if (data.result == 1) {
                            window.location.href = '../index.html'

                        }

                    }
                })
                // })

        } else {
            alert('不能为空')
        }

    })

})