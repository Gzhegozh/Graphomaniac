/**
 * Created by paul on 04.03.16.
 */
$(document).on('ready page:change', function () {
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
})
