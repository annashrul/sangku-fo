// (function ($) {
//     // Drupal.behaviors.binaryPlan = {
//     //     attach: function (context, settings) {
//     //         $('.node-left-item,.node-right-item').each(function () {
//     //             center = window.innerWidth / 2;
//     //             pos = $(this).offset().left;
//     //             if (center < pos) {
//     //                 $(this).find('.pop-up-content').eq(0).addClass('right_tooltip');
//     //             }
//     //         });
//     //     }
//     // };
// })($);

function trigger_click(target, parent_id, obj) {
    alert('clicked')
    flag = false;
    $('.binary-genealogy-tree').each(function () {
        if (flag) {
            $(this).remove();
        }
        if ($.contains(this, target)) {
            flag = true;
        }
    });
    $(obj).parent().parent().parent().parent().parent().parent().parent().find('.last_level_user').each(function () {
        $(this).parent().fadeIn();
    });
    $('.last_level_user').each(function () {
        $(this).parent().removeClass('vertical_line');
    });
    $(obj).parent().addClass('vertical_line');
    if (parent_id.length) {
        // $.ajax({
        //     url: 'https://binary.epixelmlmsoftware.com/afl/genealogy-expand-view/' + parent_id,
        //     'type': 'GET',
        //     'async': false,
        //     'success': function (responses) {
                var response = "<div class='binary-genealogy-tree binary_tree_extended'><div class='binary-genealogy-level-0 clearfix'><div class='no_padding parent-wrapper clearfix'><div class='node-centere-item binary-level-width-100'><div class='node-item-root'><div class='binary-node-single-item user-block user-0'><div class='images_wrapper'><img class='profile-rounded-image-small' style='border-color: #ccc;' src='https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/common.png?itok=TpmAMsZE' width='70' height='70' alt='forrestnoel' title='forrestnoel' /></div><span class='wrap_content '>forrestnoel</span><div class='pop-up-content'><div class='profile_tooltip_pick'><div class='image_tooltip'><img class='profile-rounded-image-tooltip' src='https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/common.png?itok=TpmAMsZE' width='70' height='70' alt='forrestnoel' title='forrestnoel' /></div><div class='full-name'>Forrest Noel</div><div class='username'><span class='text-label'>Username : </span><span class='text-value'>forrestnoel</span></div></div><div class='tooltip_profile_detaile'><div class='text'><span class='text-label'>Sales (Left)</span><span class='text-value'>$0.00</span></div><div class='text'><span class='text-label'>Sales (Right)</span><span class='text-value'>$0.00</span></div><div class='text'><span class='text-label'>Carry-forward (Right)</span><span class='text-value'>$0.00</span></div><div class='text'><span class='text-label'>Carry-forward (Left)</span><span class='text-value'>$0.00</span></div></div><div class='tooltip-footer'><div class='text'><span class='text-label'>Joined Date : </span><span class='text-value'>2019-07-24 08:30:00</span></div></div></div></div></div><div class='parent-wrapper clearfix'><div class='node-left-item binary-level-width-50'> <span class='binary-hr-line binar-hr-line-left binary-hr-line-width-25'></span><div class='node-item-1-child-left  '><div class='binary-node-single-item user-block user-1'><div class='images_wrapper'><a href='/afl/ref/34/12/LEFT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIzNCIsInBvc2l0aW9uIjoiTEVGVCIsInJldHVybl9wYXRoIjoiYWZsXC9nZW5lYWxvZ3ktZXhwYW5kLXZpZXdcLzM0In0%3D'><img class='profile-rounded-image-small' src='https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/no-user.png?itok=jHw_hHUZ' width='70' height='70' alt='Add new member' title='Add new member' /></a></div><span class='wrap_content'><a href='/afl/ref/34/12/LEFT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIzNCIsInBvc2l0aW9uIjoiTEVGVCIsInJldHVybl9wYXRoIjoiYWZsXC9nZW5lYWxvZ3ktZXhwYW5kLXZpZXdcLzM0In0%3D'>Add new member</a></span> </div></div><div class='parent-wrapper clearfix'></div></div><div class='node-right-item binary-level-width-50'> <span class='binary-hr-line binar-hr-line-right binary-hr-line-width-25'></span><div class='node-item-1-child-right   '><div class='binary-node-single-item user-block user-2'><div class='images_wrapper'><a href='/afl/ref/34/12/RIGHT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIzNCIsInBvc2l0aW9uIjoiUklHSFQiLCJyZXR1cm5fcGF0aCI6ImFmbFwvZ2VuZWFsb2d5LWV4cGFuZC12aWV3XC8zNCJ9'><img class='profile-rounded-image-small' src='https://binary.epixelmlmsoftware.com/sites/binary/files/styles/genealogy-view/public/genealogy-img/no-user.png?itok=jHw_hHUZ' width='70' height='70' alt='Add new member' title='Add new member' /></a></div><span class='wrap_content'><a href='/afl/ref/34/12/RIGHT/add/new-ref?u=eyJzcG9uc29yIjoiMTIiLCJwYXJlbnQiOiIzNCIsInBvc2l0aW9uIjoiUklHSFQiLCJyZXR1cm5fcGF0aCI6ImFmbFwvZ2VuZWFsb2d5LWV4cGFuZC12aWV3XC8zNCJ9'>Add new member</a></span></div></div><div class='parent-wrapper clearfix'></div></div></div></div></div></div></div>"
                $('#block-system-main').append(response);
                w = $(obj).find('.fa-2x').offset().left;
                tt = $('.binary-genealogy-tree').eq($('.binary-genealogy-tree').length - 1).find('.binary-node-single-item').eq(0).offset().left;
                console.log("$(obj).find('.fa-2x')",$(obj).find('.fa-2x').offset())
                console.log("$(obj).find('.fa-2x')",$(obj).find('.fa-2x').position())
                console.log("W",w)
                console.log("tt",tt)
                if (w > tt) {
                    class_div = "binar-hr-line-left";
                    width = w - tt;
                    css_style = 'margin-right';
                    w = $('.binary-genealogy-tree').eq($('.binary-genealogy-tree').length - 1).width() - ($(obj).find('.fa-2x').offset().left - $('.binary-genealogy-tree').eq($('.binary-genealogy-tree').length - 1).offset().left + $('.fa-2x').width() / 2);
                    if ($(obj).parent().parent().hasClass('node-right-item')) {
                        w += 2;
                    }
                    width -= $('.binary-genealogy-tree').eq($('.binary-genealogy-tree').length - 1).find('.binary-node-single-item').eq(0).width() / 2;
                    console.log(w);
                } else {
                    class_div = "binar-hr-line-right";
                    width = tt - w;
                    css_style = 'margin-left';
                    binary_tree_left = $('.binary-genealogy-tree').eq($('.binary-genealogy-tree').length - 1).offset().left;
                    w -= binary_tree_left - $(obj).find('.fa-2x').width() / 2;
                    if ($(obj).parent().parent().hasClass('node-right-item')) {
                        w -= 2;
                    }
                    width += $('.binary-genealogy-tree').eq($('.binary-genealogy-tree').length - 1).find('.binary-node-single-item').eq(0).width() / 2;
                }
                console.log($(obj).find('.fa-2x').width())
                console.log(w)
                console.log(width)
                $('.binary-genealogy-tree').eq($('.binary-genealogy-tree').length - 1).prepend('<span class="line_logic hr_class ' + class_div + ' "></span>');
                $('.binary-genealogy-tree').eq($('.binary-genealogy-tree').length - 1).find('.hr_class').css('width', (width) + 'px');
                $('.binary-genealogy-tree').eq($('.binary-genealogy-tree').length - 1).find('.hr_class').css(css_style, w + 'px');
                $('.binary-genealogy-tree').eq($('.binary-genealogy-tree').length - 1).addClass('binary_tree_extended');
                $('html,body').animate({
                    scrollTop: $('.binary-genealogy-tree').eq($('.binary-genealogy-tree').length - 1).offset().top
                }, 1000);
                $(obj).parent().fadeOut();
                $('.node-left-item,.node-right-item').each(function () {
                    center = window.innerWidth / 2;
                    pos = $(this).offset().left;
                    if (center < pos) {
                        $(this).find('.pop-up-content').eq(0).addClass('right_tooltip');
                    }
                });
                return false;
    //         }
    //     });
    }
    return false;
}