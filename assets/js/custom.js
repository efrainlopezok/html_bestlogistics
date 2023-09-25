
jQuery(document).ready(function() {

    // header toggle navigation
    
    jQuery('#nav-trigger').click(function(e) {
        e.preventDefault();
        jQuery('.main-header, .navigation, .main-content, .main-footer').toggleClass('navigation-hidden');

        jQuery(this).find('i').toggleClass('fa-chevron-left');
        jQuery(this).find('i').toggleClass('fa-bars');
    });

    // nav sidebar toggle
    jQuery('#nav-sidebar-trigger').click(function(e) {
        e.preventDefault();
        jQuery('body, .main-header, .main-content').toggleClass('sidebar-open');
        jQuery(this).toggleClass('sidebar-open');

        // jQuery(this).find('i').toggleClass('fa-chevron-right');
        // jQuery(this).find('i').toggleClass('fa-chevron-left');
    });
    
    jQuery('#dashboard').masonry({
        // set itemSelector so .grid-sizer is not used in layout
        itemSelector: '.box',
        columnWidth: '.box',
        percentPosition: true
    });

    // scroll top
    jQuery('.scroll-to').click(function(e) {
        e.preventDefault();

        var target = jQuery( jQuery(this).attr('href') );

        jQuery('html,body').animate({
            scrollTop: target.offset().top
        }, 'slow');
    });

    jQuery('.rating input').change(function () {
        var $radio = jQuery(this);
        jQuery('.rating .selected').removeClass('selected');
        $radio.closest('label').addClass('selected');
    });
    jQuery('.btn-approve').click(function(e) {
        e.preventDefault();
        jQuery(".alert-box").show();
    });
    jQuery('.alert-box .close').click(function(e) {
        jQuery(".alert-box").hide();
    });

    // Setting Show and Hidde
    jQuery('.row-group [data-click]').click(function(e) {
        e.preventDefault();
        jQuery(this).closest('.row-group').find('.down-info').removeClass('hidden');
        jQuery(this).closest('.row-group').find('.top-info').addClass('hidden');
    });

    jQuery('.row-group .down-info [data-btn]').click(function(e) {
        e.preventDefault();
        jQuery(this).closest('.row-group').find('.down-info').addClass('hidden');
        jQuery(this).closest('.row-group').find('.top-info').removeClass('hidden');
    });

    /* Suggestions
    -------------------------*/
    
    jQuery('[data-target-popup]').on('keyup', function () {
        var target = jQuery(this).attr('data-target-popup');
        if( jQuery(target).length) {
            
            var is_show = jQuery(target).is(':visible');
            
            if (jQuery(this).val().length > 0 && jQuery(is_show)) {
                jQuery(target).show('fast');
            }else{
                jQuery(target).hide( "fast");
            }
        }
    });
    
    jQuery('.popup-item[data-value]').click(function (e) { 
        e.preventDefault();
        var data_value = jQuery(this).attr('data-value');
        
        var target = jQuery(this).closest('.autocomplete-popup');
        target.hide( "fast");
        var wrap_value = '<a href="#shipper-information"><li class="li-from-location-button" data-value="1008">'+data_value+'</li></a>';
        var val_out = jQuery.parseHTML(wrap_value);
        var out_html = jQuery(val_out).html();
        
        // Get parent value wrap-tag-suggestions
        var sugesttion_wrap = jQuery(this).parent().attr('wrap-tag-suggestions');
        jQuery(out_html).appendTo(sugesttion_wrap); 
    });
    

    // multiselect
    jQuery(document).mouseup(function(e) {
        var container = jQuery(".multi-select");
        if (!container.is(e.target) && container.has(e.target).length === 0){
            container.hide( "fast", function() {
                // Animation complete.
            });
        }
    });
   
    jQuery(".multi-select .item-sugg").on('click', function () {
        jQuery(".multi-select .item-sugg").removeClass('select');
        jQuery(this).addClass('select');
    });

    jQuery('.autocomplete-popup .close').click(function () {
        var target = jQuery(this).closest('.autocomplete-popup');
        target.hide( "fast");
    });

    // dash dropdown of orders
    jQuery('#dashboard_order >a').click(function(e) {
        e.preventDefault();
        var status = jQuery(this).attr('data-status');

        jQuery('ul[data-status]').addClass('hidden');
        jQuery('ul[data-status="'+status+'"]').removeClass('hidden');
        jQuery('.upcoming-order, .loc-route.active').removeClass('active');

        var textLink = jQuery(this).text();
        jQuery('h3.dropdown .dropdown-toggle').html(textLink);
    
    });

    //Hide Left Bar in order page
    jQuery(window).on("load resize",function () { 
        var width_x = jQuery(window).width();
        if(jQuery('.add-orders-page').length){
            if(width_x > 768){
                jQuery('.main-header, .navigation, .main-content, .main-footer').addClass('navigation-hidden');
                jQuery('#nav-trigger i').removeClass('fa-chevron-left');
                jQuery('#nav-trigger i').addClass('fa-bars');
            }else{
                jQuery('.main-header, .navigation, .main-content, .main-footer').removeClass('navigation-hidden');
            }
        }
    });

    //checked
    // jQuery(window).scroll(function() {
    //     if (  document.documentElement.clientHeight + 
    //           jQuery(document).scrollTop() >= document.body.offsetHeight ){  
    //         console.log(jQuery(document).scrollTop());
    //         console.log(jQuery(window).scrollTop());
    //         console.log(jQuery("#contenido2").offset());
    //     }
    // });
    jQuery('.finish').click(function(){
        jQuery( '#have_you_set_up' ).prop( "checked", true );
        return false;
    });

    /*  Steps helper 
    --------------------------*/

    // Popup help animations
    var step = 1;
    if (!jQuery(".help-progress .step-content .step-content-body:first-child").hasClass('out')) {
        jQuery('.help-progress .btn-foot button[name="prev"]').addClass('out');
    }
    var current_step = jQuery(".help-progress .step-content #step" + step);
    // Next
    jQuery('.help-progress .btn-foot button[name="next"]').on("click", function() {
        step++;
        jQuery('.help-progress .btn-foot button[name="prev"]').removeClass('out');
        jQuery(".help-progress .step-content .step-content-body").addClass('out');
        var last_child = jQuery(".help-progress .step-content .step-content-body:last-child").attr("id");
        console.log(last_child);
        
        if (last_child == 'step' + step) {
            
            jQuery('.help-progress .btn-foot button[name="next"]').addClass('out');
            jQuery('.help-progress .btn-foot button[name="finish"]').removeClass('out');
        }
        if (current_step.length) {
            jQuery(".help-progress .step-content .step-content-body#step" + step).removeClass('out');
        }
    });
    //Prev
    jQuery('.help-progress .btn-foot button[name="prev"]').on("click", function() {
        step--;
        jQuery('.help-progress .btn-foot button[name="next"]').removeClass('out');
        jQuery(".help-progress .step-content .step-content-body").addClass('out');
        jQuery('.help-progress .btn-foot button[name="finish"]').addClass('out');
        if (current_step.length) {
            jQuery(".help-progress .step-content .step-content-body#step" + step).removeClass('out');
        }
        var first_child = jQuery(".help-progress .step-content .step-content-body:first-child").attr("id");
        if (first_child == 'step' + step) {
            jQuery('.help-progress .btn-foot button[name="prev"]').addClass('out');
        }
    });
    // Step Last
    jQuery('.help-progress .btn-foot button[name="finish"]').on('click', function() {
        jQuery('.help-progress .btn-foot button[name="prev"]').addClass('out');
        jQuery('.help-progress .btn-foot button[name="next"]').removeClass('out');
        jQuery(this).addClass('out');
        jQuery('.help-progress .step-content .step-content-body').addClass('out');
        jQuery('#step1').removeClass('out');
        step = 1;
    });

});

function wizard_goto(step) {
    jQuery('.row-wizard [data-step]').addClass('hidden');
    jQuery('.row-wizard [data-step="'+step+'"]').removeClass('hidden');
}

function wizard_back(step) {
    jQuery('.row-wizard [data-step]').addClass('hidden');
    jQuery('.row-wizard [data-step="'+step+'"]').removeClass('hidden');
}