module PostsHelper
  def join_tags(post)
    post.tags.map { |t| t.name }.join(", ")
  end
  
  def tag_links(post)
    links = ''
    post.tags.map { |t| links += link_to( t.name, tag_name_path(t.name), :class => "tag") }
    return links.html_safe
  end
    
  def belongs_to_current_user(post)
    if post.user == current_user 
      return true
    else
      return false
    end
  end
end
