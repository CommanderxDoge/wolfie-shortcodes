jQuery(document).ready(function($){ 

  var firstclick;
//define all shortcodes
var shortcodes_list = [
'columns',
'column',
'imagebox',
'button',
'image',
'icon',
'title',
'tabs',
'tab'
];


//generate modal for wolfie shortcodes [add shortcode]
var modal = `
<div class="wolfie-modal">
<div class="wolfie-modal-header">
<!-- <img src="/wp-content/plugins/wolfie-shortcodes/assets/images/wolfie_logo.png"> --->
<h2 style="margin:auto;">wolfie Shortcodes</h2>
<i class="fa fa-close close" aria-hidden="true"></i>
</div>
<div class="modal-body">
<div class="shortcode-wrapper wolfie-columns">
<i class="fa fa-columns" aria-hidden="true"></i>
<p>columns</p>
</div>
<div class="shortcode-wrapper wolfie-column">
<i class="fa fa-square-o" aria-hidden="true"></i>
<p>column</p>
</div>
<div class="shortcode-wrapper wolfie-imagebox">
<i class="fa fa-address-card-o " aria-hidden="true"></i>
<p>imagebox</p>
</div>
<div class="shortcode-wrapper wolfie-button">
<i class="fa fa-window-minimize" aria-hidden="true"></i>
<p>button</p>
</div>
<div class="shortcode-wrapper wolfie-icon">
<i class="fa fa-square" aria-hidden="true"></i>
<p>icon</p>
</div>
<div class="shortcode-wrapper wolfie-title">
<i class="fa fa-square" aria-hidden="true"></i>
<p>title</p>
</div>
<div class="shortcode-wrapper wolfie-tabs">
<i class="fa fa-folder" aria-hidden="true"></i>
<p>Tabs</p>
</div>
<div class="shortcode-wrapper wolfie-tab">
<i class="fa fa-folder" aria-hidden="true"></i>
<p>Tab single</p>
</div>
</div>
</div>
<div class="wolfie-back-overflow close"></div>
`
function openModal(){
  $('body').addClass('wolfie-fixed').append(modal);
}

//get all parameters from forms in inner shortcode modals [name == attr | attr['column']]
function get_form_attrs(t){
  var form = t.closest('.shortcode-modal').find('form');
  var input = form.find('input, textarea, select');
  var name = input.attr('name');
  var attr = {};
  $(input).each(function(index){
    attr[$(this).attr('name')] = $(this).val();
  });
  return attr;
}



//define modals for each shortcode
//columns
function openShortcodeModal(myname){
  // var myname = myname;
  function add_form(myname) {
    if (myname == 'wolfie-columns') {
      var form = `
      <form>
      <label for="columnNumber">
      How many columns?<br>
      <input id="columnNumber" type="text" name="column">
      </label>
      <div class="wolfie-form-group">
      <label for="colorpicker"> choose color to row background</label>
      <input type="text" class="wolfie-color-picker">
      <a class="btn button-primary color-picker-save" href="#"> Save color </a>
      <input type="text" name="bg">
      </div>
      <div class="wolfie-form-group">
      <label for="margin">
      Set margin: <em>/(top right bottom left)/</em><br> <small>example: 5px 5px 5px 5px</small>
      <div>
      <input id="margin" type="text" name="margin">
      </div>
      </label>
      </div>
      <div class="wolfie-form-group">
      <label for="padding">
      Set padding: <em>/(top right bottom left)/</em><br> <small>example: 5px 5px 5px 5px</small>
      <div>
      <input id="padding" type="text" name="padding">
      </div>
      </label>
      </div>
      <div class="wolfie-form-group">
      <label for="boxed">
      Boxed content? 
      <div>
      yes<input id="boxed" type="checkbox" name="boxed">
      </div>
      </label>
      </div>
      </form>
      `;
    } else if(myname == 'wolfie-imagebox'){
      var form = `
      <form>
      <div class="wolfie-form-group">
      <label for="imagebox-title">
      Title:<br>
      <input id="imagebox-title" class="w-100" type="text" name="title">
      </label>
      </div>
      <div class="wolfie-form-group">
      <label for="imagebox-description">
      description:<br>
      <textarea id="imagebox-description" class="w-100" type="text" name="description" rows="4"></textarea>
      </label>
      </div>
      <div class="wolfie-form-group">
      <div class="wolfie-choose-img">
      <label for="imagebox-url">
      url:<br>
      <input id="imagebox-url" class="w-100 choose-img" type="text" name="url">
      </label>
      <a class="button button-primary choose-img" href="#">Add url</a><a class="delete-choose-img" href="#">clear url</a>
      </div><!-- /wolfie-choose-img -->
      </div><!-- /wolfie-form-group -->
      <div class="wolfie-form-group">
      <label for="imagebox-button">
      button text:<br>
      <input id="imagebox-button" class="w-100" type="text" name="button">
      </label>
      </div>
      <div class="wolfie-form-group">
      <label for="imagebox-img">
      img:<br>
      <input id="imagebox-img" class="w-100" type="text" name="img" hidden>
      </label>
      <a class="button button-primary choose-img" href="#">Add img</a>
      <a class="delete-choose-img" href="#">delete img</a>
      <div class="wolfie-img-container"></div>
      </div>
      </form>
      `;
    } else if(myname == 'wolfie-icon'){
      var form = `
      <form>
      <div class="wolfie-form-group">
      <label for="wolfie-icon-title">
      Title:<br>
      <input id="wolfie-icon-title" class="w-100" type="text" name="title">
      </label>
      </div>
      <div class="wolfie-form-group">
      <label for="wolfie-icon-text">
      description:<br>
      <textarea id="wolfie-icon-text" class="w-100" type="text" name="description" rows="4"></textarea>
      </label>
      </div>
      <div class="wolfie-form-group">
      <div class="wolfie-choose-img">
      <label for="imagebox-url">
      choose icon:<br>
      <input id="imagebox-url" class="w-100" type="text" name="url">
      </label>
      <a class="button button-primary choose-img" href="#">Add icon</a><a class="delete-choose-img" href="#">clear</a>
      </div><!-- /wolfie-choose-img -->
      </div>
      <div class="wolfie-form-group">
      <label for="wolfie-icon-center">
      align icon:<br>
      <small>write: center left right</small>
      <div>
      <input id="wolfie-icon-center" class="w-100" type="text" name="align"></input>
      </div>
      </label>
      </div>
      <div class="wolfie-form-group">
      <label for="wolfie-icon-animation">
      animation:<br>
      <small>fadeIn FadeInLeft fadeInRight fadeInUp etc.</small>
      <input id="wolfie-icon-animation" class="w-100" type="text" name="animation"></input>
      </label>
      </div>
      </form>
      `;
    } else if(myname == 'wolfie-title'){
      var form = `
      <form>
      <div class="wolfie-form-group">
      <label> Title:
      <input type="text" name="title"></label>
      </div>
      <div class="wolfie-form-group">
      <label for="wolfie-align">
      align icon:<br>
      <small>write: center left right</small>
      <div>
      <input id="wolfie-align" class="w-100" type="text" name="align"></input>
      </div>
      </label>
      </div>
      <div class="wolfie-form-group">
      <label for="margin">
      Set margin: <em>/(top right bottom left)/</em><br> <small>example: 5px 5px 5px 5px</small>
      <div>
      <input id="margin" type="text" name="margin">
      </div>
      </label>
      </div>
      </form>`;
    }  else if(myname == 'wolfie-button'){
      var form = `
      <form>
      <div class="wolfie-form-group">
      <label for="title">
      button text:<br>
      <input id="title" class="w-100" type="text" name="title">
      </label>
      </div>
      <div class="wolfie-form-group">
      <label for="wolfie-button-style">
      choose button style<br>
      <select id="wolfie-button-style" class="w-100" name="button-style">
      <option selected value="btn-outline-gold">Gold outline</option>
      <option value="btn-gold">Gold</option>
      <option value="btn-outline-blue">Blue outline</option>
      <option value="btn-blue">Blue</option>
      </select>
      </label>
      </div>
      <div class="wolfie-form-group">
      <label for="wolfie-align">
      choose button alignment<br>
      <select id="wolfie-align" class="w-100" name="align">
      <option selected value="left">Left</option>
      <option value="center">Center</option>
      <option value="right">Right</option>
      </select>
      </label>
      </div>
      <div class="wolfie-form-group">
      <div class="wolfie-choose-img">
      <label for="imagebox-url">
      url:<br>
      <input id="imagebox-url" class="w-100 choose-img" type="text" name="url">
      </label>
      <a class="button button-primary choose-img" href="#">Add url</a><a class="delete-choose-img" href="#">clear url</a>
      </div><!-- /wolfie-choose-img -->
      </div><!-- /wolfie-form-group -->
      </form>
      `;
    }  else if(myname == 'wolfie-tabs'){
      var form = `
      <form>
      <label for="columnNumber">
      How many tabs?<br>
      <input id="columnNumber" type="text" name="column">
      </label>
      <div class="wolfie-form-group">
      <label for="colorpicker"> choose color to tab body content</label>
      <input type="text" class="wolfie-color-picker">
      <a class="btn button-primary color-picker-save" href="#"> Save color </a>
      <input type="text" name="bg">
      </label>
      </div>
      </form>
      `;
    }  else if(myname == 'wolfie-tab'){
      var form = `
      <form>
      <label for="columnNumber">
      How many tabs?<br>
      <input id="columnNumber" type="text" name="column">
      </label>
      <div class="wolfie-form-group">
      <label for="colorpicker"> choose color to tab body content</label>
      <input type="text" class="wolfie-color-picker">
      <a class="btn button-primary color-picker-save" href="#"> Save color </a>
      <input type="text" name="bg">
      </label>
      </div>
      </form>
      `;
    } else {
      var form = `
      inne
      `;
    }

    return form;
  }
  var shortcodeModal = `
  <div class="shortcode-modal">
  <div class="wolfie-modal-header">
  <h2>`+ myname +`</h2>
  <i class="fa fa-close closeShortcode" aria-hidden="true"></i>
  </div>
  <div class="wolfie-modal-form-body">` + add_form(myname) +`</div>
  <div class="wolfie-modal-form-footer">
  <a class="btn button-primary `+myname+`-save" href="#"> Save Options </a><a class="btn btn-default closeShortcode" href="#"> Close </a>
  </div>
  </div><!-- /shortcode-modal -->
  '<div class="shortcode-overflow closeShortcode"></div>'
  `;
  $('body').append(shortcodeModal);
  $('.wolfie-color-picker').wpColorPicker();
}


$('body').on('click','.shortcode-wrapper', function(){
  var shortcodeClass = $(this).attr('class').split(' ')[1];
  openShortcodeModal(shortcodeClass);
});



function closeModal(){
  $('.wolfie-modal').remove();
  $('.wolfie-back-overflow').remove();
  $('body').removeClass('wolfie-fixed');
}
function closeShortcodeModal(){
  $('.shortcode-modal').remove();
  $('.shortcode-overflow').remove();
}
function closeModals(){
  closeShortcodeModal();
  closeModal();
}


//add text to tinyMCE editor
(function printToEditorMce() {
 tinymce.PluginManager.add('wolfie_mce_button', function( editor, url ) {
   editor.addButton('wolfie_mce_button', {
     text: '[wolfie shortcodes]',
     icon: false,
     onclick: function() {
       // change the shortcode as per your requirement
       firstclick = $(this);
       openModal();
        // generated and print shortcode to editor
        $('body').off('click', '.wolfie-button-save').one('click', '.wolfie-button-save', function(e){
          e.preventDefault();
          var t = $(this);
          var attr = get_form_attrs(t);

          var title = ( attr['title'] ) ?  attr['title'] : title = '';
          var buttonStyle = ( attr['button-style'] ) ?  button = 'button="' + attr['button-style'] + '"' : button = '';
          var align = (attr['align']) ? align = 'align="' + attr['align'] + '"' : align = '';
          var url = (attr['url']) ? url = 'url="' + attr['url'] + '"' : url = '';

          editor.insertContent('[ww_button '+buttonStyle+ ' '+align+' '+url+']'+title+'[/ww_button]');
          closeModals();
        });
        $('body').off('click', '.wolfie-columns-save').one('click', '.wolfie-columns-save', function(e){
          e.preventDefault();
          var t = $(this);
          var attr = get_form_attrs(t);
          var margin = (attr['margin']) ? margin = 'margin="' + attr['margin'] + '"' : margin = '';
          var bg = (attr['bg']) ? bg = 'bg="' + attr['bg'] + '"' : bg = '';
          var padding = (attr['padding']) ? padding = 'padding="' + attr['padding'] + '"' : padding = '';
          var container = (attr['boxed']) ? container = 'container="boxed"' : container = '';
          var attributes = [margin, padding, bg, container].join(' ');
          var col = '<br/>[ww_col]<br/><br/>[/ww_col]'
          var cols = col.repeat(attr['column']);
          editor.insertContent('[ww_row '+attributes+']'+cols+'<br/>[/ww_row]');
          closeModals();
        });
        $('body').off('click', '.wolfie-column').one('click', '.wolfie-column', function(e){
          e.preventDefault();
          editor.insertContent('[ww_col]<br/><br/>[/ww_col]');
          closeModals();
        });
        $('body').off('click', '.wolfie-imagebox-save').one('click', '.wolfie-imagebox-save', function(e){
          e.preventDefault();
          var t = $(this);
          var attr = get_form_attrs(t);

          var title = attr['title'];
          var imgUrl = ( attr['img'] ) ?  imgUrl = 'img="' + attr['img'] + '"' : imgUrl = '';
          var url = (attr['url']) ? url = 'url="' + attr['url'] + '"' : url = '';
          var button = attr['button']
          var description = attr['description'];

          editor.insertContent('[ww_imagebox title="'+title+'" button="'+button+'" '+imgUrl+' '+url+']<br/>'+description+'<br/>[/ww_imagebox]');
          closeModals();
        });
        $('body').off('click', '.wolfie-title-save').one('click', '.wolfie-title-save', function(e){
          e.preventDefault();
          var t = $(this);
          var attr = get_form_attrs(t);

          var title = attr['title'];
          var align = attr['align'];
          editor.insertContent('[ww_title title="'+title+'" align="'+align+'"]');
          closeModals();
        });
        $('body').off('click', '.wolfie-icon-save').one('click', '.wolfie-icon-save', function(e){
          e.preventDefault();
          var t = $(this);
          var attr = get_form_attrs(t);


          var title = (attr['title']) ? title = 'title="' + attr['title'] + '"' : title = '';
          var description = (attr['description']) ? description = 'description="' + attr['description'] + '"' : description = '';
          var url = (attr['url']) ? url = 'url="' + attr['url'] + '"' : url = '';
          var animation = (attr['animation']) ? animation = 'animation="' + attr['animation'] + '"' : animation = '';
          var align = (attr['align']) ? align = 'align="' + attr['align'] + '"' : align = '';
          var attributes = [title, description, url, animation, align].join(' ');

          editor.insertContent('[ww_icon '+attributes+']');
          closeModals();
        });
        $('body').off('click', '.wolfie-tabs-save').one('click', '.wolfie-tabs-save', function(e){
          e.preventDefault();
          var t = $(this);
          var attr = get_form_attrs(t);
          var bg = (attr['bg']) ? bg = 'bg="' + attr['bg'] + '"' : bg = '';
          var attributes = [bg].join(' ');
          var col = '<br/>[ww_tab]<br/><br/>[/ww_tab]'
          var cols = col.repeat(attr['column']);
          editor.insertContent('[ww_tabs '+attributes+']'+cols+'<br/>[/ww_tabs]');
          closeModals();
        });
      }
    });

});

})();





$('body').on('click', '.shortcode-modal .btn', function(e){e.preventDefault()});
$('body').on('click', '.closeShortcode', closeShortcodeModal);
$('body').on('click', '.close', closeModal );
});