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

$(document).on('ready page:change', function () {

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
});

