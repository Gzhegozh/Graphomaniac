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
//= require react
//= require react_ujs
//= require components
//= require_tree .
//= require froala_editor.min.js


var changed = false;
var current_chapter;
var updated_title;
var updated_content;
var size;
var max;
var isEditing = true;

$(document).on('ready page:change', function () {

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
});

