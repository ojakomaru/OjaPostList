<?php
/**
 * Plugin Name:       Oja Post List Block
 * Description:       記事リストを表示するブロックです
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            ojako
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       post-list
 *
 * @package           oja
 */


new OjaPostListBlock;
class OjaPostListBlock {
  public function __construct() {
    // ブロック登録
    add_action( 'init', array($this, 'oja_post_list_block_init'));
  }

  public function oja_post_list_block_init() {
    if ( !function_exists('register_block_type')) {
      return;
    }
    $dir = dirname( __FILE__ );

    $script_asset_path = "$dir/build/index.asset.php";

    $index_js     = 'build/index.js';
    $script_asset = require( $script_asset_path );
    wp_register_script(
      'oja-post-list-script',
      plugins_url( $index_js, __FILE__ ),
      $script_asset['dependencies'],
      $script_asset['version']
    );
  
    $editor_css = 'build/index.css';
    wp_register_style(
      'oja-post-list-editor-style',
      plugins_url( $editor_css, __FILE__ ),
      array(),
      filemtime( "$dir/$editor_css" )
    );
  
    $style_css = 'build/style-index.css';
    wp_register_style(
      'oja-post-list-style',
      plugins_url( $style_css, __FILE__ ),
      array(),
      filemtime( "$dir/$style_css" )
    );
  
    register_block_type( "oja/post-list", array(
      'editor_script' => 'oja-post-list-script',
      'editor_style'  => 'oja-post-list-editor-style',
      'style'         => 'oja-post-list-style',
      'render_callback' => 'post_list_render_func',
      'attributes' => [
        'postListType' => [
          'type'    => 'string',
          'default' => 'post'
        ],
        'isTimeStamp' => [
          'type'    => 'boolean',
          'default' => true
        ],
        'isPostLabel' => [
          'type'    => 'boolean',
          'default' => true
        ],
        'showPostNumber' => [
          'type'    => 'number',
          'default' => 6
        ],
        'postDesign' => [
          'type'    => 'string',
          'default' => 'cade'
        ],
        'postOrder' => [
          'type' => 'string',
          'default' => 'DESC'
        ],
        'postOrderBy' => [
          'type' => 'string',
          'default' => 'date'
        ],
        'termId' => [
          'type'    => 'number',
          'default' => -1
        ]
      ]
    ) );
  }

} // class

//ダイナミックブロックによるレンダリング
function post_list_render_func($attributes, $content) {
  //画像ブロックレンダリング
  require_once dirname(__FILE__) . '/src/views/post_list_render.php';
  return post_list_render($attributes, $content);
}
