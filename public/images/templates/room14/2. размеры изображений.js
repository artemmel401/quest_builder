$('.wall').width((1920 * coef_w > $(window).width())  ? (1920 * coef_w) : ($(window).width()));
$('.wall').height(1080*coef_h );		
$('.wall').css({left: 0, top: 0 * coef_h });

$('.floor').width((1920 * coef_w > $(window).width())  ? (1920 * coef_w) : ($(window).width()));				
$('.floor').css({left: 0, top: 742 * coef_h });

$('.plintus').width((1920 * coef_w > $(window).width())  ? (1920 * coef_w) : ($(window).width()));				
$('.plintus').css({left: 0, top: 715 * coef_h });

$('.binocular').width(45 * coef_w);				
$('.binocular').css({left: 1383 * coef_w + offset_w, top: 614 * coef_h });

$('.cat').width(64 * coef_w);				
$('.cat').css({left: cat_left * coef_w + offset_w, top: cat_top * coef_h });

$('.closed').width(132 * coef_w);				
$('.closed').css({left: 1294 * coef_w + offset_w, top: 607 * coef_h });

$('.divan').width(623 * coef_w);				
$('.divan').css({left: 633 * coef_w + offset_w, top: 495 * coef_h });

$('.door').width(312 * coef_w);				
$('.door').css({left: 1502 * coef_w + offset_w, top: 142 * coef_h });

$('.gardina').width(491 * coef_w);				
$('.gardina').css({left: 121 * coef_w + offset_w, top: 84 * coef_h });

$('.kod').width(66 * coef_w);				
$('.kod').css({left: 1428 * coef_w + offset_w, top: 368 * coef_h });

$('.korm').width(66 * coef_w);				
$('.korm').css({left: 1307 * coef_w + offset_w, top: 501 * coef_h });

$('.korm2').width(62 * coef_w);				
$('.korm2').css({left: 584 * coef_w + offset_w, top: 914 * coef_h });

$('.left').width(103 * coef_w);				
$('.left').css({left: left_left * coef_w + offset_w, top: left_top * coef_h });

$('.list').width(62 * coef_w);				
$('.list').css({left: 1088 * coef_w + offset_w, top: 573 * coef_h });

$('.list2').width(48 * coef_w);				
$('.list2').css({left: 887 * coef_w + offset_w, top: 661 * coef_h });

$('.middle').width(160 * coef_w);				
$('.middle').css({left: 816 * coef_w + offset_w, top: 216 * coef_h });

$('.miska').width(108 * coef_w);				
$('.miska').css({left: 560 * coef_w + offset_w, top: 920 * coef_h });

$('.moved_podushka').width(193 * coef_w);				
$('.moved_podushka').css({left: 650 * coef_w + offset_w, top: 504 * coef_h });

$('.niz').width(160 * coef_w);				
$('.niz').css({left: 900 * coef_w + offset_w, top: 325 * coef_h });

$('.open').width(174 * coef_w);				
$('.open').css({left: 1273 * coef_w + offset_w, top: 607 * coef_h });

$('.plant').width(113 * coef_w);				
$('.plant').css({left: 179 * coef_w + offset_w, top: 405 * coef_h });

$('.podushka_divan').width(234 * coef_w);				
$('.podushka_divan').css({left: 706 * coef_w + offset_w, top: 622 * coef_h });

$('.right').width(102 * coef_w);				
$('.right').css({left: right_left * coef_w + offset_w, top: right_top * coef_h });

$('.shtora').width(w_shtora * coef_w);	
$('.shtora').height(650*coef_h );		
$('.shtora').css({left: 151 * coef_w + offset_w, top: 105 * coef_h });
if(shtora_moved == 1) {
	$('.shtora').width(10);
}

$('.tunba').width(154 * coef_w);				
$('.tunba').css({left: 1283 * coef_w + offset_w, top: 589 * coef_h });

$('.up').width(160 * coef_w);				
$('.up').css({left: 955 * coef_w + offset_w, top: 150 * coef_h });

$('.window').width(387 * coef_w);				
$('.window').css({left: 165 * coef_w + offset_w, top: 119 * coef_h });


$('.info_q').width(67  * 	coef_w);
$('.info_q').css({left: 105 * coef_w + offset_w, top: 1004 * coef_h });

$('#logo').width(75  * 	coef_w);
$('#logo').css({left: 25 * coef_w + offset_w, top: 970 * coef_h });

$('.menu_btn').width(200 * coef_w);