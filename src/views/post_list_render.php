<?php
// postListType,投稿のタイプを条件分岐
// isTimeStamp,日付を表示するかフラグ
// isPostLabel,ラベルを表示するかフラグ
// showPostNumber,投稿の表示数
// postDesign,デザイン設定
// termId,選択されていた場合絞り込み
// postOrder,昇順？降順？
// postOrderBy,表示基準

class OjaPostProps {
  //管理画面でa タグを削除する
  public function href_checker() {
    if ( !is_admin() ) {
      $href = ' href="'. get_the_permalink().'"';
    } else {
      $href = '  style="pointer-events: none;"';
    }
    return $href;
  }

  //表示数に合わせてレイアウトを変更する
  public function content_style_width($show_post_num) {
    $content_width = 'style="flex-basis:';
    if($show_post_num % 4 === 0 || $show_post_num === 7) {
      $content_width .= 'calc((100% - 40px) / 4); margin-right: 10px;"';
    } elseif($show_post_num % 3 === 0 || $show_post_num === 5) {
      $content_width .= 'calc((100% - 30px) / 3); margin-right: 10px;"';
    } else {
      $content_width .= 'calc((100% - 40px) / 2); margin-right: 20px;"';
    }
    return $content_width;
  }
  
  //ラベルをレンダリングする関数
  public function content_label_render($post_list_type, $ID) {
    $post_label = '<span class="post_label">';
    $term = get_term($ID);
    if($post_list_type === "post") {
      $post_label .= "おすすめ記事</span>";
    } elseif($post_list_type === "category") {
      $post_label .= esc_html($term->name)."</span>";
    } else {
      $post_label .= '#'.esc_html($term->name).'</span>';
    }
    return $post_label;
  }
} // class OjaPostProps

function post_list_render($attr, $content) {
  $args = array(
    'post_type'      => 'blogs',
    'post_status'    => 'publish',
    'order'          => $attr['postOrder'],  //昇順 or 降順の指定
    'orderby'        => $attr['postOrderBy'],  //何順で並べるかの指定
    'posts_per_page' => $attr['showPostNumber'],
  );

  $post_class = ' '.$attr['postDesign'];
  //投稿タイプ以外の場合
  if($attr['postListType'] !== "post") {
      $tax_args[] =  array(
        'taxonomy' => $attr['postListType'] === "category" ? 'oja_cat' :
        'oja_tags',
        'field' => 'id',
        'terms' => $attr['termId'],
        'include_children' => false,//子タクソノミーを含めるかどうか
      );
    $args += Array('tax_query' => array($tax_args));
  }

  $archive   = '<div class="wp-block-oja-post-list'.$post_class.'"><ul class="post-list-container">';
  $the_query = new WP_Query( $args );
  $post_props = new OjaPostProps();
  if ( $the_query->have_posts() ) :
    while ( $the_query->have_posts() ) :
      $the_query->the_post();
      $archive .= '<li '.$post_props->content_style_width($attr['showPostNumber']).'>';
      $archive .= '<a class="post-list-link"'.$post_props->href_checker().'>';
      if (has_post_thumbnail() && $attr['postDesign'] !== "text") $archive .= '<figure>'.get_the_post_thumbnail().'</figure>';
      $archive .= '<div class="post_content">';
      if ($attr['isPostLabel']) $archive .= $post_props->content_label_render( $attr['postListType'], $attr['termId']);
      $archive .= '<h3>' . get_the_title() . '</h3>';
      if($attr['isTimeStamp']) $archive .= '<time datetime="' . get_the_date( 'Y-m-d' ) . '">' . get_the_date( 'Y年m月d日' ) . '</time>';
      $archive .= '</div></a></li>';
    endwhile;
      $archive .='</ul></div>';

    else:
    $archive = '<p>記事は取得できませんでした</p>';
  endif;
  wp_reset_postdata();
  //出力
  return $archive;

}