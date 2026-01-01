$j = jQuery.noConflict();

new function() {
    $j.fn.validate = {
        init: function(o) {
          if(o.name == 'recommend.fromName' || o.name == 'recommend.toName') { return this.required(o) };
          if(o.name == 'recommend.fromEmail' || o.name == 'recommend.toEmail') { return this.email(o) };
          return true;
        },
        required: function(o) {
           if (o.value.length ==  0) {
                doError(o,'el campo es requerido');
                return false;
            }else{
                doSuccess(o);
                return true;
            }
        },
        email: function(o) {
            if(!this.required(o))
                return false;
          var email  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
           if (o.value.match(email)) {
              doSuccess(o);
              return true;
            } else {
              doError(o,'el email no es valido');
              return false;
            };
        }
     };
};


jQuery(document).ready(function() {
    if($j('#confirm_msg'))
        $j('#confirm_msg').hide();
    $j('#previewLayer').jqm();
    
    
        $j("input[class=val_inp_ok]").blur(function() {
            $j(this).validate.init(this);
        });
    
    $j('#recommend_form').ajaxForm({
                //target: '#some_content',
                beforeSubmit: validateForm,
                resetForm: true,
				success: function() 
				{
				    $j("#previewLayer").jqmHide();
				    $j('#confirm_msg').show();
				}				
			});
    $j('#previewButton').click(function()
				{
                   $j("input[class^=val_inp]").each( function(){
                        doSuccess(this);
                   });
					$j('#previewLayer').jqmShow(200); //show previewLayer
				});

});


function validateForm(formData, jqForm, options){
   var isValid = true;
   $j("input[class^=val_inp]").each( function(){
        var ret = $j(this).validate.init(this);
        if(!ret)
            isValid = false;
   });
    
    return isValid;

}

function doSuccess(o) {
      $j('#' + o.id + '_err').hide();
      $j('#' + o.id).removeClass('val_inp_err');
      $j('#' + o.id).addClass('val_inp_ok');
}

function doError(o,m) {
      $j('#' + o.id + '_err').html( errMsgHtml(m) );
      $j('#' + o.id + '_err').show(200);
      $j('#' + o.id).removeClass('val_inp_ok');
      $j('#' + o.id).addClass('val_inp_err');
}

function errMsgHtml( msg ){
    return  "<div class='error_validate'>" + 
            "<div class='error_validate_pt'></div>" + msg + "</div>";
}
