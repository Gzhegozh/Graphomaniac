/**
 * Created by paul on 04.03.16.
 */
$(document).on('ready page:change', function () {
    setTimeout(function() {
        $("#1").trigger('click');
    },10);

    $(function() {
        $('div#froala-editor').froalaEditor();
    });

    current_chapter = 1;
    ch_id = 1;
    updated_title = $("#chapter_title").text();
    updated_content = $('#froala-editor').froalaEditor('html.get');
    changed = false;
    isEditing = true;

    size = $('#attributes').attr('data-size');
    max = $('#attributes').attr('data-max');

    $(".simple-pagination").pagination({
        items: size,
        itemsOnPage: 1,
        cssStyle: 'compact-theme',
        onPageClick: function(pageNumber){
            save();
            current_chapter = pageNumber;
            changed = false;
            get_chapter_text(pageNumber);
        }
    });

    function get_chapter_text(pageNumber){
        $.ajax({
            type: "GET",
            url: '/chapters/1',
            data: {
                chapter: {
                    order: pageNumber,
                    record_id: $('#attributes').attr('data-record-id')
                }
            },
            dataType: 'json'
        }).success(function(data) {
            ch_id = data['id'];
            user_id = $('#attributes').attr('data-user-id');
            get_bookmarks(user_id);
            $.ajax({
                type: 'GET',
                url: 'chapters/bookmarks',
                data: {
                    chapter_id: ch_id,
                    user_id: user_id
                },
                dataType: 'json'
            }).success(function(data){
                if(data['notice'] != ''){
                    html = '<div class="col-lg-12" style="margin-left: -10%"><div class = "alert alert-warning"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+data['notice']+'</div></div>';
                    $("#bookmarks").append(html);
                }
                $("#chapter_title").val(data['title']);
                if (isEditing)
                    $("#froala-editor").froalaEditor('html.set', data['text']);
                else
                    $("#chapter").html(data['text']);
            });
        });
    }

    function get_bookmarks(user_id){
        $.ajax({
            type: "GET",
            url: '/bookmarks/1.json',
            data: {
                chapter_id: ch_id,
                user_id: user_id
            },
            dataType: 'json'
        }).success(function(data) {
            var href = '';
            data.forEach(function(item, i, arr) {
                href += '<a href="#' + item['name'].replace(/\s/g, '') + '">' + item['name'] + '</a></br>';
            });
            href += '</br>';
            $('#bookmarks').html(href);
        });
    }

    $("#new_chapter").click(function(){
        max++;
        size++
        var newLi = '<li class="ui-state-default ui-sortable-handle" data-index='+size+' id='+max+'>Untitled<span class="glyphicon glyphicon-remove" id='+max+' style="float: right"></span></li>';
        $("#sortable").append(newLi);
        $(".simple-pagination").pagination('updateItems', size);
        var order = max;
        save();
        changed = false;
        $.ajax({
            type: "POST",
            url: '/chapters.json',
            data: {
                chapter: {
                    title: "Untitled",
                    content: "",
                    order: order,
                    record_id: $('#attributes').attr('data-record-id')
                }
            }
        });
    });

    function save(){
        if (changed){
            $.ajax({
                type: "PUT",
                url: '/chapters/1.json',
                data: {
                    chapter: {
                        title: updated_title,
                        content: updated_content,
                        order: current_chapter,
                        record_id: $('#attributes').attr('data-record-id')
                    }
                }
            });
        }
    }

    $("#chapter_title").keyup(function() {
        changed = true;
        updated_title = $(this).val();
        $("#"+current_chapter).html(updated_title + '<span class="glyphicon glyphicon-remove" id='+current_chapter+' style="float: right">');
        updated_content = $("#froala-editor").froalaEditor('html.get', true);
    });

    $('#froala-editor').on('froalaEditor.contentChanged',(function() {
        changed = true;
        updated_content =  $('#froala-editor').froalaEditor('html.get', true);
        updated_title = $("#chapter_title").val();
    }));

})