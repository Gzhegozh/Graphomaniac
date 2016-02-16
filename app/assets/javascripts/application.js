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

$(document).on('ready page:change', function () {

    var title_changed = false;
    var content_changed = false;
    var current_chapter = 0;

    $("#chapter_title").keydown( function(){
        title_changed = true;
    });

    $("#chapter").keydown( function(){
        content_changed = true;
        alert(current_chapter);
    });

    $(".ui-state-default").click(function() {
        url = 'get_chapter_text/' + this.id;
        current_chapter = this.id;
        title_changed = false;
        content_changed = false;
        $.get( url, function(data) {
            $("#chapter").html(data['text']);
            $("#chapter_title").html(data['title']);
        });
    });

    $(function() {
        $( "#sortable" ).sortable({
            revert: true
        });
        $( "ul, li" ).disableSelection();
    });

});