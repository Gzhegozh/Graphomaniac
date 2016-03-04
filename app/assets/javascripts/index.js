/**
 * Created by paul on 04.03.16.
 */
$(document).on('ready page:change', function () {
    $('#category').change(function () {
        get_genres();
    })

    function get_genres() {
        val = $("#category").val();
        url = '';
        if (val == '')
            url = 'get_genres';
        else
            url = 'get_genres/' + val;
        $.ajax({
            type: "GET",
            url: url,
        }).success(function (data) {
            $("select#genre_id").empty();
            $("select#genre_id").append($("<option>")
                .val('')
                .html('Choose Genre')
            );
            data.forEach(function (item, i, arr) {
                $("select#genre_id").append($("<option>")
                    .val(item['id'])
                    .html(item['name'])
                );
            });
            $("select#record_genre_id").empty();
            $("select#record_genre_id").append($("<option>")
                .val('')
                .html('Choose Genre')
            );
            data.forEach(function (item, i, arr) {
                $("select#record_genre_id").append($("<option>")
                    .val(item['id'])
                    .html(item['name'])
                );
            });
        });
    }
})