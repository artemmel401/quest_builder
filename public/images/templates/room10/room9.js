<img src="images/plintus@2x.png" style="" class="obj plintus drag">
	<div style="background: url('images/floor@2x.png') top left repeat-x; background-size: contain;" class="obj floor drag"></div>
	
	<img src="images/green.jpeg" style="" class="obj green drag">
	<img src="images/orange.jpeg" style="" class="obj orange drag">
	<img src="images/new_wallpaper.svg" style="" class="obj new_wallpaper drag">
	<img src="images/old_wallpaper.svg" style="" class="obj old_wallpaper drag">
	<img src="images/old_wallpaper_with_gray_wall.svg" style="" class="obj old_wallpaper_full drag">
	<img src="images/door.svg" style="" class="obj door drag">
	<img src="images/polka@2x.png" style="" class="obj polka drag">
	<img src="images/left_col.svg" style="" class="obj left_col drag">
	<img src="images/right_col.svg" style="" class="obj right_col drag">
	<img src="images/fen.svg" style="" class="obj fen drag treasure">
	<img src="images/books.svg" style="" class="obj books drag">
	<img src="images/zapiska.svg" style="" class="obj zapiska drag">
	<img src="images/table.svg" style="" class="obj table drag">
	<img src="images/comp.svg" style="" class="obj comp drag">
	<img src="images/keyboard.svg" style="" class="obj keyboard drag">
	<img src="images/mouse.svg" style="" class="obj mouse drag">
	<img src="images/phone.svg" style="" class="obj phone drag">
	<img src="images/mug.svg" style="" class="obj mug drag noSwipe">
	<img src="images/lemon.svg" style="" class="obj lemon drag treasure">
	<img src="images/picture@2x.png" style="" class="obj picture drag">
	<img src="images/pilesos.svg" style="" class="obj pilesos drag"> 
	<img src="images/kover.svg" style="" class="obj kover drag"> 
	<img src="images/perchatki.svg" style="" class="obj perchatki drag treasure"> 
	<img src="images/paper.svg" style="" class="obj paper drag hide"> 
	<img src="images/gubka.svg" style="" class="obj gubka drag treasure"> 
	<img src="images/basket.svg" style="" class="obj basket drag"> 
	<img src="images/sunduk.svg" style="" class="obj sunduk drag"> 
	<img src="images/open_sunduk.svg" style="" class="obj sunduk_opened drag hide"> 
	<img src="images/otvertka.svg" style="" class="obj otvertka drag hide noSwipe"> 
	<img src="images/key.svg" style="" class="obj key drag noSwipe"> 
	<img src="images/paper_backet.svg" style="" class="obj paper_backet papers drag hide"> 
	<img src="images/paper_in_sunduk.svg" style="" class="obj paper_sunduk papers drag hide"> 
	<img src="images/paper_mug_key_books.svg" style="" class="obj paper_mug papers drag"> 
	<img src="images/paper_mug_key_books.svg" style="" class="obj paper_key papers drag"> 
	<img src="images/paper_mug_key_books.svg" style="" class="obj paper_books papers drag hide"> 
	<img src="images/paper_mug_key_books.svg" style="" class="obj paper_cover papers drag"> 
	
	
	<!--Сообщения -->
	<div id="broken" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				Пылесос не работает!<br>
				В нем что-то застряло!
			</div>
		</div>
	</div>
	
	<div id="somepic" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				Кажется, эта картина пуста...<br>
				Может быть, в ней что-то скрыто?
			</div>
		</div>
	</div>
	
	<div id="dontknow" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				Что же делать <br>
				с этим набором..
			</div>
		</div>
	</div>
	
	
	
	
	$('.plintus').width(tw);				
		$('.plintus').height(32*coef_h );				
		$('.plintus').css({left: 0, top: 956 * coef_h });
		
		$('.floor').width(tw);				
		$('.floor').height(292*coef_h );				
		$('.floor').css({left: 0, top: 988 * coef_h });
		
		$('.green').width(offset_w + 550*coef_w);				
		$('.green').height(955*coef_h);				
		$('.green').css({left: 0, top: 0 * coef_h });
		
		$('.orange').width(offset_w + 392*coef_w);				
		$('.orange').height(955*coef_h);				
		$('.orange').css({left: 1527*coef_w + offset_w , top: 0 * coef_h });
		
		$('.new_wallpaper').width(1130 * coef_w);				
		$('.new_wallpaper').css({left: 0 * coef_w + offset_w, top: 0 * coef_h });
		$('.old_wallpaper').width(90 * coef_w);				
		$('.old_wallpaper').css({left: 1527 * coef_w + offset_w, top: 136 * coef_h });
		$('.old_wallpaper_full').width(400 * coef_w);				
		$('.old_wallpaper_full').css({left: 1527 * coef_w + offset_w, top: 136 * coef_h });
		$('.old_wallpaper_task').width(250 * coef_w);				
		$('.old_wallpaper_task').height(250 * coef_h);				
		$('.old_wallpaper_task').css({left: 1557 * coef_w + offset_w, top: 176 * coef_h });
		$('.old_wallpaper_task').css({opacity:'0.7'});
		
		$('.door').width(356 * coef_w);				
		$('.door').css({left: 48 * coef_w + offset_w, top: 304 * coef_h });
		$('.table').width(690 * coef_w);				
		$('.table').css({left: 416 * coef_w + offset_w, top: 776 * coef_h });
		$('.polka').width(454 * coef_w);				
		$('.polka').css({left: 540 * coef_w + offset_w, top: 414 * coef_h });
		$('.left_col').width(80 * coef_w);				
		$('.left_col').css({left: 541 * coef_w + offset_w, top: 496 * coef_h });
		$('.right_col').width(80 * coef_w);				
		$('.right_col').css({left: 901 * coef_w + offset_w, top: 496 * coef_h });
		$('.fen').width(80 * coef_w);
		$('.fen').css({left: 639 * coef_w + offset_w, top: 470 * coef_h });	
		$('.books').width(66 * coef_w);
		$('.books').css({left: 730 * coef_w + offset_w, top: 457 * coef_h });	
		$('.zapiska').width(48 * coef_w);
		$('.zapiska').css({left: 836 * coef_w + offset_w, top: 468 * coef_h });
		$('.comp').width(241 * coef_w);
		$('.comp').css({left: 653 * coef_w + offset_w, top: 586 * coef_h });
		$('.keyboard').width(121 * coef_w);
		$('.keyboard').css({left: 648 * coef_w + offset_w, top: 788 * coef_h });
		$('.mouse').width(40 * coef_w);
		$('.mouse').css({left: 818 * coef_w + offset_w, top: 788 * coef_h });
		$('.phone').width(58 * coef_w);
		$('.phone').css({left: 475 * coef_w + offset_w, top: 777 * coef_h });
		$('.mug').width(54 * coef_w);
		$('.mug').css({left: 920 * coef_w + offset_w, top: 750 * coef_h });
		$('.lemon').width(72 * coef_w);
		$('.lemon').css({left: 990 * coef_w + offset_w, top: 775 * coef_h });
		$('.picture').width(480 * coef_w);				
		$('.picture').css({left: 1107 * coef_w + offset_w, top: 690 * coef_h });
		$('.pilesos').width(276 * coef_w);				
		$('.pilesos').css({left: 1361 * coef_w + offset_w, top: 828 * coef_h });
		$('.perchatki').width(148 * coef_w);				
		$('.perchatki').css({left: 952 * coef_w + offset_w, top: 1128 * coef_h });
		$('.kover').width(1068 * coef_w);				
		$('.kover').css({left: 52 * coef_w + offset_w, top: 1068 * coef_h });
		$('.paper').width(52 * coef_w);				
		$('.paper').css({left: 1280 * coef_w + offset_w, top: 1112 * coef_h });
		$('.gubka').width(102 * coef_w);				
		$('.gubka').css({left: 1162 * coef_w + offset_w, top: 1128 * coef_h });
		$('.basket').width(96 * coef_w);				
		$('.basket').css({left: 924 * coef_w + offset_w, top: 910 * coef_h });
		$('.sunduk').width(208 * coef_w);				
		$('.sunduk').css({left: 508 * coef_w + offset_w, top: 884 * coef_h });
		$('.sunduk_opened').width(208 * coef_w);				
		$('.sunduk_opened').css({left: 508 * coef_w + offset_w, top: 884 * coef_h });
		$('.otvertka').width(100 * coef_w);				
		$('.otvertka').css({left: 528 * coef_w + offset_w, top: 944 * coef_h });
		$('.paper_sunduk').width(38 * coef_w);				
		$('.paper_sunduk').css({left: 648 * coef_w + offset_w, top: 940 * coef_h });
		
		$('.key').width(108 * coef_w);				
		$('.key').css({left: 166 * coef_w + offset_w, top: 1128 * coef_h });
		$('.paper_backet').width(58 * coef_w);				
		$('.paper_backet').css({left: 930 * coef_w + offset_w, top: 1024 * coef_h });
		
		$('.paper_mug').width(58 * coef_w);				
		$('.paper_mug').css({left: 876 * coef_w + offset_w, top: 778 * coef_h });
		$('.paper_key').width(58 * coef_w);				
		$('.paper_key').css({left: 568 * coef_w + offset_w, top: 780 * coef_h });
		$('.paper_books').width(58 * coef_w);				
		$('.paper_books').css({left: 735 * coef_w + offset_w, top: 462 * coef_h });
		$('.paper_cover').width(58 * coef_w);				
		$('.paper_cover').css({left: 456 * coef_w + offset_w, top: 1148 * coef_h });