/**
 * Created by paul on 04.03.16.
 */

$(document).on('ready page:change', function () {
    $( "#sortable" ).sortable({
        appendTo: document.body
    });

    if (window.location.toString().indexOf("edit") != -1){
        $( "#sortable" ).sortable( "option", "disabled", false );
        isEditing = true;
    }
    else {
        $( "#sortable" ).sortable( "option", "disabled", true );
        isEditing = false;
    }

    $('#sortable').on('click', '.ui-state-default', function() {
        $(".simple-pagination").pagination('selectPage', $(this).attr("data-index"));
    });

    $('#sortable').on('click', '.glyphicon.glyphicon-remove', function() {
        size--;
        if (size >= 1){
            $("#sortable #" + $(this).attr('id').toString()).remove();
            $.ajax({
                type: "DELETE",
                url: '/chapters/1.json',
                data: {
                    chapter: {
                        order: $(this).attr('id'),
                        record_id: $('#attributes').attr('data-record-id')
                    }
                },
                dataType: 'json'
            }).success(function(data) {
                reorder();
                $(".simple-pagination").pagination('selectPage', 1);
                $(".simple-pagination").pagination('updateItems', size);
            });
        }
    });



    $('#sortable').on("sortstop", function (event, ui) {
        reorder();
        $(".simple-pagination").pagination('selectPage', ui.item.attr("data-index"));
    });

    function reorder(){
        $(".ui-state-default").each(function(index){
            $(this).attr('data-index', index + 1);
        });
        $(".ui-state-default").each(function(){
            $.ajax({
                type: "POST",
                url: '/chapters/reorder/' + this.id,
                data: {
                    chapter: {
                        title: $(this).text().trim(),
                        order: $(this).attr('data-index'),
                        record_id: $('#attributes').attr('data-record-id')
                    }
                },
                dataType: 'json'
            })
        });
    }

    $(function() {
        $( "#sortable" ).sortable({
            revert: true
        });
        $( "ul, li" ).disableSelection();
    });
})
