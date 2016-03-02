// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//

//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require turbolinks
//= require_tree .
//= require froala_editor.min.js


var changed = false;
var current_chapter;
var updated_title;
var updated_content;

$(document).on('ready page:change', function () {

    setTimeout(function() {
        $("#1").trigger('click');
    },10);

    function getChapterByIndex(index)
    {
        var matchingElement;
        var allElements = document.getElementsByTagName('*');
        for (var i = 0, n = allElements.length; i < n; i++)
        {
            if (allElements[i].getAttribute('data-index') == index)
            {
                matchingElement = allElements[i];
            }
        }
        return matchingElement;
    }

    $(function() {
        $('div#froala-editor').froalaEditor();
    });

    current_chapter = 1;
    ch_id = 1;
    updated_title = $("#chapter_title").text();
    updated_content = $('#froala-editor').froalaEditor('html.get');
    changed = false;
    var isEditing = true;

    var size = $('#attributes').attr('data-size');
    var max = $('#attributes').attr('data-max');

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

    $('#froala-editor').on('froalaEditor.keyup',(function() {
        changed = true;
        updated_content =  $('#froala-editor').froalaEditor('html.get', true);
        updated_title = $("#chapter_title").val();
    }));


    $(function() {
        $( "#sortable" ).sortable({
            revert: true
        });
        $( "ul, li" ).disableSelection();
    });

    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#preview').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#user_avatar").change(function(){
        readURL(this);
    });

    $("#record_cover").change(function(){
        readURL(this);
    });

    if ($('#attributes').attr('data-user-id') != 0) {
        var txt, pos;

        $('#chapter').mouseup(function (e) {
            txt = window.getSelection().toString();
            if (txt != "") {
                $('#new-anchor').css({left: e.pageX, top: e.pageY - 50}).fadeIn();
                var ch = document.getElementById("chapter");
                var sel = getSelectionCharOffsetsWithin(ch);
                pos = sel.start;
            }
        });

        $('#chapter').mousedown(function (e) {
            $('#new-anchor').fadeOut();
        });
        $("#new-anchor").click(function (e) {
            $("#bookmark-tip").css({left: e.pageX, top: e.pageY - 50}).fadeIn(1500);
            $("#bookmark-tip").fadeOut(1500);
            $('#new-anchor').fadeOut();
            insertAnchor();
        })

        function getSelectionCharOffsetsWithin(element) {
            var start = 0, end = 0;
            var sel, range, priorRange;
            if (typeof window.getSelection != "undefined") {
                range = window.getSelection().getRangeAt(0);
                priorRange = range.cloneRange();
                priorRange.selectNodeContents(element);
                priorRange.setEnd(range.startContainer, range.startOffset);
                start = priorRange.toString().length;
            } else if (typeof document.selection != "undefined" &&
                (sel = document.selection).type != "Control") {
                range = sel.createRange();
                priorRange = document.body.createTextRange();
                priorRange.moveToElementText(element);
                priorRange.setEndPoint("EndToStart", range);
                start = priorRange.text.length;
            }
            return {
                start: start
            };
        }

        function insertAnchor() {
            var anchor = '<a id="' + txt.replace(/\s/g, '') + '"></a>';
            var ch_id = 0;
            $.ajax({
                type: "GET",
                url: '/chapters/1',
                data: {
                    chapter: {
                        order: current_chapter,
                        record_id: $('#attributes').attr('data-record-id')
                    }
                },
                dataType: 'json'
            }).success(function (data) {
                ch_id = data['id'];
                $.ajax({
                    type: "POST",
                    url: '/bookmarks.json',
                    data: {
                        bookmark: {
                            anchor: anchor,
                            name: txt,
                            index: pos,
                            user_id: $('#attributes').attr('data-user-id'),
                            chapter_id: ch_id
                        },
                    },
                    dataType: 'json'
                });
            });
        }
    }
});

