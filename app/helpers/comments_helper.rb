module CommentsHelper
  def nested_comments(comments, level = 0)
    comments.map do |comment, sub_comments|
      content_tag(:div, comment.parent && level == 0 ? nil : render(comment), :class => "row-fluid", id: "#{comment.id.to_s + '_c'}")
    end.join.html_safe
  end
end
