<?php
/*
Plugin Name: Wolfie shortcodes
Plugin URI: https://github.com/CommanderxDoge/wolfie-shortcodes
Description: WOLFIE plugin which adds amazing shortcodes to tinyMCE.
Version: 1.0
Author: Paweł Witek
Author URI: https://github.com/CommanderxDoge
License: GPL
*/

/*******************************************************************
*
* EDIT: assets/js/plugin.js
* to edit button in tinyMCE
*
********************************************************************/

define("WW_PATH",  plugin_dir_path( __FILE__ ) );
define("WW_URL",  plugin_dir_url( __FILE__ ) );

include WW_PATH . 'inc/helpers/functions.php';

class Wolfie_shortcodes {

	public function __construct()
	{
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_front_scripts' ));
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ));
		add_action( 'admin_head', array( $this, 'wolfie_add_mce_button' ));
		add_action( 'wp_footer', array( $this, 'print_footer' ) );
		add_action( 'admin_head', array( $this, 'wolfie_add_to_head' ) );
		//add shortcodes
		add_shortcode( 'ww_row', array( $this, 'wolfie_shortcode_row' ) );
		add_shortcode( 'ww_col', array( $this, 'wolfie_shortcode_col' ) );
		add_shortcode( 'ww_imagebox', array( $this, 'wolfie_shortcode_imagebox' ) );
		add_shortcode( 'ww_button', array( $this, 'wolfie_shortcode_button' ) );
		add_shortcode( 'ww_icon', array( $this, 'wolfie_shortcode_icon_with_text' ) );
		add_shortcode( 'ww_title', array( $this, 'wolfie_shortcode_title' ) );
		add_shortcode( 'ww_tabs', array( $this, 'wolfie_shortcode_tabs' ) );
		add_shortcode( 'ww_tab', array( $this, 'wolfie_shortcode_tab' ) );
	}

	public static function wolfie_shortcode_title( $atts, $content ) {
		$atts = shortcode_atts(array(
			'title'   => 'Amazing title',
			'align' => 'center',
			'margin' => '20px 0px 20px 0px',
		), $atts);
		return '<div class="wolfie-title-wrapper"><h2 style="margin:'.$atts['margin'].';" class="wolfie-title text-'.$atts['align'].'">' . $atts['title'] . '</h2><div class="decoration-wrapper"><div class="decoration"></div></div>';
	}
	public static function wolfie_shortcode_tabs( $atts, $content ) {
		$atts = shortcode_atts(array(
			'margin'   => '',
			'padding' => '',
			'class' => '',
		), $atts );
		//parse tabs
		// $patterntwo = '/(?<=\[ww_tab\])(.|\n)*?(?=\[\/ww_tab\])/';
		$pattern = '/\[ww_tab(?:(\s[^\]]*)\]|\])((?:.|\n)*?)(?=\[\/ww_tab\])/';
		$subject = $content; 
		preg_match_all($pattern, $subject, $matches);
		$tabs_atts = $matches[1];
		$tabs_content = $matches[2];
		//set active class to body of active tab as well
		$pattern_tab = '/(\[ww_tab)/';
		$replacement = '[ww_tab class="active" ';
		$content = preg_replace($pattern_tab, $replacement, $content, 1);

		ob_start(); ?>

		<div class="wolfie-tabs <?php echo $atts['class']  ?>">
			<div class="wolfie-tabs-nav">
				<?php 
				$counter = 1;
				foreach ($tabs_atts as $key => $value): 
					$atts = shortcode_parse_atts( $value );
					?>
					<div class="tab <?php if($counter ==1) echo 'active'; ?>">
						<?php
						if($atts['name']){
							echo $atts['name'];
						} else {
							echo 'tab name #' . $counter ;
						}
						?>
					</div>
					<?php 
					$counter++;
				endforeach ?>
			</div>
			<div class="wolfie-tabs-body "><?php echo do_shortcode($content) ?></div>
		</div>
		<?php

		$content = ob_get_clean();
	//enqueue scripts and styles for this shortcode
		wp_enqueue_script('ww-tabs');
		wp_enqueue_style('ww-tabs');

		return $content;
	}
	public static function wolfie_shortcode_tab( $atts, $content ) {
		$atts = shortcode_atts(array(
			'class' => '',
		), $atts );
		return '<div class="wolfie-tab-content ' . $atts['class'] . '">' . do_shortcode($content) . '</div>';
	}

	public static function wolfie_shortcode_icon_with_text( $atts, $content ) {
		$atts = shortcode_atts(array(
			'title' => 'amazing title',
			'description' => '',
			'url' => '',
			'animation' => '',
			'class' => '',
		), $atts );

		$id = $atts['url'];
		$url = wp_get_attachment_url($id);

		ob_start(); ?>

		<div class="wolfie-icon">
			<div class="wolfie-icon-wrapper wow <?php echo $atts['animation'] . ' ' . $atts['align'] ?>">
				<div class="image-wrapper">
					<img class="change-to-svg" src="<?php echo $url ?>">
				</div><!-- /image-wrapper -->
				<div class="content-wrapper">
					<p class="icon-title"><?php echo $atts['title']  ?></p>
					<p class="icon-content"><?php echo $atts['description'] ?></p>
				</div><!-- /content-wrapper -->
			</div><!-- /wolfie-icon-wrapper -->
		</div><!-- /wolfie-icon -->

		<?php 
		return ob_get_clean();
	}

	public static function wolfie_shortcode_row( $atts, $content ) {
		$atts = shortcode_atts(array(
			'container'   => 'fluid',
			'bg'   => '',
			'margin'   => '',
			'padding' => '',
			'class' => '',
		), $atts );
		//set style properties
		$bg = ($atts['bg'] ? 'background:'. $atts['bg'] . ';' : ' ');
		$margin = ($atts['margin'] ? 'margin:' . $atts['margin'] . ';' : '');
		$padding = ($atts['padding'] ? 'padding:' . $atts['padding'] . ';' : '');
		$style = [$bg, $margin, $padding];
		if(!empty($style)) {
			$style = 'style="'. implode('', $style) . '"';
		} else {
			$style = '';
		}
		//set classes
		$class = $atts['class'];
		$text = do_shortcode($content);
		$content = strip_tags($text, '<p><a><div><img><b><strong><form><input><button><textarea><select><ul><li><table><tbody><thead><tr><td><h1><h2><h3><h4><h5><h6>');

		$column_nummber = countWord($content, "wolfie-col");
		$claww_col = '';
		if($column_nummber == 1) $claww_col = 'wolfie-cols-1';
		if($column_nummber == 2) $claww_col = 'wolfie-cols-2';
		if($column_nummber == 3) $claww_col = 'wolfie-cols-3';
		if($column_nummber == 4) $claww_col = 'wolfie-cols-4';
		if($column_nummber == 5) $claww_col = 'wolfie-cols-5';
		if($column_nummber == 6) $claww_col = 'wolfie-cols-6';
		if($column_nummber == 7) $claww_col = 'wolfie-cols-7';
		if($column_nummber == 8) $claww_col = 'wolfie-cols-8';
		if($column_nummber == 9) $claww_col = 'wolfie-cols-9';
		if($column_nummber == 10) $claww_col = 'wolfie-cols-10';
		if($column_nummber == 11) $claww_col = 'wolfie-cols-11';
		if($column_nummber == 12) $claww_col = 'wolfie-cols-12';


		return '<section class="wolfie-section' . $class .'" ' . $style . '><div class="wolfie-row ' . $claww_col . ' ' . $atts['container'] . '">' . do_shortcode($content) . '</div></section>';
	}

	public static function wolfie_shortcode_col( $atts, $content ) {
		return '<div class=" wolfie-col ">' . do_shortcode($content) . '</div>';
	}
	public static function wolfie_shortcode_imagebox( $atts, $content ) {
		$atts = shortcode_atts(array(
			'title'   => 'Amazing title',
			'subtitle'   => 'this is subtitle',
			'img'   => 'https://api.fnkr.net/testimg/350x200/00CED1/FFF/?text=img+placeholder',
			'url' => '#',
			'button'   => 'Add awesome title',
			'description' => $content,
		), $atts );

		ob_start(); ?>

		<div class="box project-box border-gold-hover shadow pointer content-accordion mb-3 active">

			<div class="post-wrapper">

				<div class="image-wrapper">
					<?php if (strpos($atts['img'], '//')): ?>
						<img src="<?php echo $atts['img'] ?>">	
					<?php else: 
						$imgUrl = wp_get_attachment_url( $atts['img'] ); ?>
						<img src="<?php echo $imgUrl ?>">
					<?php endif ?>
				</div><!-- /image-wrapper -->

				<div class="header-wrapper">

					<div class="inner-wrapper">

						<h2 class="post-title"><?php echo $atts['title'] ?></h2>

						<div class="post-meta">

							<!-- <span></span><span></span><span></span> -->

						</div><!-- /post-meta -->

						<div class="excerpt-wrapper">

							<div class="text-heading">

								<p><?php echo $atts['subtitle'] ?></p>

								<a style="position: relative; z-index: 25;" href="<?php echo $atts['url'] ?>" class="btn btn-outline-gold"><?php echo $atts['button'] ?></a>

							</div><!-- /heading -->

						</div><!-- /excerpt-wrapper -->

					</div><!-- /inner-wrapper -->

				</div><!-- /content-wrapper -->

			</div><!-- /post-wrapper -->

			<div class="content-wrapper" style="display: block;">

				<p><?php echo $atts['description'] ?></p>

			</div>

		</div><!-- /box -->
		<?php 
		$output =  ob_get_clean();
		$content = $output;
		return $content;
	}

	public static function wolfie_shortcode_button( $atts, $content ) {
		$atts = shortcode_atts(array(
			'title'   => 'Click me',
			'url' => '#',
			'button'   => 'btn-blue',
			'align' => 'left',
		), $atts );
		if ($atts['align'] == 'center') {
			$align_class = 'wolfie-align-center';
		} elseif($atts['align'] == 'right'){
			$align_class = 'wolfie-align-right';
		} else {
			$align_class = 'wolfie-align-left';
		}

		return '<div class="wolfie-button btn-wrapper ' . $align_class .'"><a href="' . $atts['url'] . '" class="btn '. $atts['button'] .'">' . $content . '</a></div>';

	}

	public function enqueue_front_scripts(){
		wp_enqueue_style( 'wolfie-shortcodes-css', plugin_dir_url( __FILE__ ) . 'assets/front/front.css');
		wp_register_script( 'ww-tabs', plugin_dir_url( __FILE__ ) . 'assets/front/js/ww_tabs.js', array('jquery'), false, true );
		wp_register_style( 'ww-tabs', plugin_dir_url( __FILE__ ) . 'assets/front/css/ww_tabs.css', array(), false, false );
	}
	public function enqueue_admin_scripts(){
		wp_enqueue_style( 'wolfie-shortcodes-admin-css', plugin_dir_url( __FILE__ ) . 'assets/admin/admin.css');
		wp_enqueue_script( 'wolfie-shortcodes-chooseimg-js', plugin_dir_url( __FILE__ ) . 'assets/js/choose-img.js');
		wp_enqueue_style( 'wp-color-picker' );
		wp_enqueue_script( 'wolfie-color-picker', plugins_url('/assets/js/wolfie-color-picker.js', __FILE__ ), array( 'wp-color-picker' ), false, true );
	}
	public function wolfie_add_to_head(){
		echo '<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">';
	}

	// hooks your functions into the correct filters
	public function wolfie_add_mce_button() {
            // check user permissions
		if ( !current_user_can( 'edit_posts' ) &&  !current_user_can( 'edit_pages' ) ) {
			return;
		}
           // check if WYSIWYG is enabled
		if ( 'true' == get_user_option( 'rich_editing' ) ) {
			add_filter( 'mce_external_plugins', 'wolfie_add_tinymce_plugin' );
			add_filter( 'mce_buttons', 'wolfie_register_mce_button' );
		}

		// register new button in the editor
		function wolfie_register_mce_button( $buttons ) {
			array_push( $buttons, 'wolfie_mce_button' );
			return $buttons;
		}

		// declare a script for the new button
// the script will insert the shortcode on the click event
		function wolfie_add_tinymce_plugin( $plugin_array ) {
			$plugin_array['wolfie_mce_button'] = $plugin_array['myplugin'] = plugins_url( '/assets/js/plugin.js',__FILE__ );
			return $plugin_array;
		}
	}
}
new Wolfie_shortcodes;