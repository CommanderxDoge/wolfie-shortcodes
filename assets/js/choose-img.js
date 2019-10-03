jQuery(document).ready(function($){ 

//choose one img
var t;
function chooseOneImage(event){
  event.preventDefault();
  event.stopPropagation();
  t = $(this);
  var frame,
      metaBox = t.closest('.wolfie-form-group'), // Your meta box id here
      addImg = metaBox.find('.choose-img'),
      imgContainer = metaBox.find('.wolfie-img-container')

      var inputId = t.parent().find('input');

    // If the media frame already exists, reopen it.
    if ( frame ) {
      frame.open();
      return;
    }
    
    // Create a new media frame
    frame = wp.media({
      title: 'Choose Image:',
      button: {
        text: 'Use this media'
      },
      multiple: false  
    });

    
    // When an image is selected in the media frame...
    frame.on( 'select', function() {

      // Get media attachment details from the frame state
      var attachment = frame.state().get('selection')._single.attributes;
      var imgId = attachment.id;
      var imgUrl = attachment.url;;

      if (attachment.sizes) {
        if(attachment.sizes.thumbnail) {
         var srcPost = attachment.sizes.thumbnail.url ; 
       } else {
        var srcPost = attachment.sizes.full.url;
       }
        
        imgContainer.html( '<img class="" src="'+ srcPost +'" alt="" style="">' );
        inputId.val( imgId );
      } else {
        inputId.val( imgUrl );
      }

    });

    // Finally, open the modal on click
    frame.open();

  }
  function deleteImg(e){
    e.preventDefault();
    t = $(this);
    var metaBox = t.closest('.wolfie-form-group'), // Your meta box id here
    deleteImg = metaBox.find('.delete-choose-img'),
    imgContainer = metaBox.find('.wolfie-img-container')
    var inputId = t.closest('.wolfie-form-group').find('input');

    imgContainer.html('');
    inputId.removeAttr('value');
  }

  // ADD IMAGE LINK
  $('body').on( 'click', '.choose-img', chooseOneImage);
  $('body').on( 'click', '.delete-choose-img', deleteImg)
});
