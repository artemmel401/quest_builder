<img src="images/elem/wall.png" style="width: 100vw; height: auto; max-height: 100%; border: 0px solid red;; margin: 0; padding: 0;	z-index: 1; position: absolute;">
	<img src="images/elem/color_wall.svg" style="" class="obj color_wall drag">
	<img src="images/elem/Mend.svg" style="" class="obj Mendeleev drag">
	<img src="images/elem/bookcase.svg" style="" class="obj bookcase drag">
	<img src="images/elem/vikl.svg" style="" class="obj vkl drag">
	<img src="images/elem/door.svg" style="" class="obj door drag">
	<img src="images/elem/plant.svg" style="" class="obj plant drag">
	<img src="images/elem/table.svg" style="" class="obj table drag">
	<img src="images/elem/yashik.svg" style="" class="obj yashik1 drag">
	<img src="images/elem/yashik.svg" style="" class="obj yashik2 drag">
	<img src="images/elem/yashik.svg" style="" class="obj yashik3 drag">
	<img src="images/elem/hook.svg" style="" class="obj hook2 drag">
	<img src="images/elem/hook.svg" style="" class="obj hook3 drag">
	<img src="images/elem/halat.svg" style="" class="obj halat drag">
	<img src="images/elem/shelf.svg" style="" class="obj shelf drag">
	<img src="images/elem/white.svg" style="" class="obj white drag">
	
	<img src="images/elem/comp.svg" style="" class="obj comp drag">
	<img src="images/elem/left_col.svg" style="" class="obj left_col drag">
	<img src="images/elem/right_col.svg" style="" class="obj right_col drag">
	<img src="images/elem/key_mouse.svg" style="" class="obj key_mouse drag">
	<img src="images/elem/hz_2.svg" style="" class="obj hz drag">
	<img src="images/elem/journal.svg" style="" class="obj journal drag">
	<img src="images/elem/tryapka.svg" style="" class="obj tryapka drag">
	<img src="images/elem/pincet.svg" style="" class="obj pincet drag">
	<img src="images/elem/colb_1.svg" style="" class="obj colb_1 drag">
	<img src="images/elem/colb_2.svg" style="" class="obj colb_2 drag">
	<img src="images/elem/books.svg" style="" class="obj books drag">
	<img src="images/elem/safe.svg" style="" class="obj safe drag">
	<img src="images/elem/safe_open.svg" style="" class="obj safe_opened drag">
	<img src="images/elem/usb_card.svg" style="" class="obj card drag">
	<img src="images/elem/kod.svg" style="" class="obj kod drag">
	
	
	<img src="images/elem/white.svg" style="" class="obj white drag">
	<img src="images/elem/white.svg" style="" class="obj white_ontable drag">
	<img src="images/elem/opange.svg" style="" class="obj opange drag">
	<img src="images/elem/opange.svg" style="" class="obj opange_ontable drag padding">
	<img src="images/elem/paper.svg" style="" class="obj paper drag">
	<img src="images/elem/paper.svg" style="" class="obj paper_fall drag">
	<img src="images/elem/loupe.svg" style="" class="obj loupe drag">
	<img src="images/elem/pincet_paper.svg" style="" class="obj pincet_paper drag">
	<img src="images/elem/steam.svg" style="" class="obj steam drag">
	
	
	
	
	
	<div data-role="popup" id="popupfree" data-overlay-theme="a" data-corners="false" data-tolerance="30,15" style="">
		<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Закрыть</a>
		<p style="padding: 2wmin; font-size: 7vmin; text-align: center;">
		Ящик пуст<br>
		</p>
	</div>
	
	<div data-role="popup" id="popupnonact" data-overlay-theme="a" data-corners="false" data-tolerance="30,15" style="">
		<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Закрыть</a>
		<p style="padding: 2wmin; font-size: 7vmin; text-align: center;">
		Ничего не происходит<br>
		</p>
	</div>
	
	
	<div data-role="popup" id="popupuncolor" data-overlay-theme="a" data-corners="false" data-tolerance="30,15" style="">
		<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Закрыть</a>
		<p style="padding: 2wmin; font-size: 7vmin; text-align: center;">
		Хм, записка бесцветная...<br>
		Зачем же ее хранить?
		</p>
	</div>
	
	<div data-role="popup" id="popupsafety" data-overlay-theme="a" data-corners="false" data-tolerance="30,15" style="">
		<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Закрыть</a>
		<p style="padding: 2wmin; font-size: 7vmin; text-align: center;">
		А как же техника безопасности?
		</p>
	</div>
	
	<div data-role="popup" id="popupjournal" data-overlay-theme="a" data-corners="false" data-tolerance="30,15" style="">
		<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Закрыть</a>
		<p style="padding: 2wmin; font-size: 7vmin; text-align: center;">
			Шрифт слишком мелкий...
		</p>
	</div>
	
	<div data-role="popup" id="popupseif" data-overlay-theme="a" data-corners="false" data-tolerance="30,15" style="">
		<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Закрыть</a>
		<p style="padding: 2wmin; font-size: 7vmin; text-align: center;">
			<b>Сейф закрыт</b><br>
			<span style="padding: 2wmin; font-size: 6vmin;">Введите код</span>
			<input type="number" placeholder="00000000" max="99999999" id="seifcode" style="font-size: 7vmin; text-align: center;">
			<input type="button" value="&nbsp;&nbsp;Открыть сейф&nbsp;&nbsp;" class="openseif">
		</p>
	</div>
	
	<div data-role="popup" id="popupseifclosed" data-overlay-theme="a" data-corners="false" data-tolerance="30,15" style="">
		<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Закрыть</a>
		<p style="padding: 2wmin; font-size: 7vmin; text-align: center;">
			<b>Неверный код!</b><br>
		</p>
	</div>
	
	<div data-role="popup" id="popupdoor" data-overlay-theme="a" data-corners="false" data-tolerance="30,15" style="">
		<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Закрыть</a>
		<p style="padding: 2wmin; font-size: 7vmin; text-align: center;">
			<b>Код от двери</b><br>
			<span style="padding: 2wmin; font-size: 6vmin;">Введите код</span>
			<input type="text" placeholder="..." id="doorcode" style="font-size: 7vmin; text-align: center;">
			<input type="button" value="Открыть дверь" class="opendoor">
		</p>
	</div>
	
	<div data-role="popup" id="popupdoorclosed" data-overlay-theme="a" data-corners="false" data-tolerance="30,15" style="">
		<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Закрыть</a>
		<p style="padding: 2wmin; font-size: 7vmin; text-align: center;">
			<b>Неверный код!</b><br>
		</p>
	</div>
	
	<div data-role="popup" id="popuppicture" data-overlay-theme="a" data-corners="false" data-tolerance="30,15" style="">
		<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Закрыть</a>
		<p style="padding: 2wmin; font-size: 7vmin; text-align: center;  ">
			<img src="images/elem/Mend@2x.png" style="">
		</p>
	</div>
	
	<div data-role="popup" id="popupgas" data-overlay-theme="a" data-corners="false" data-tolerance="30,15" style="">
		<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Закрыть</a>
		<p style="padding: 2wmin; font-size: 7vmin; text-align: center;">
			<b>Невозможно работать!</b><br>
			<b>Всё загазованно!</b><br>
		</p>
	</div>
	
	
	
	
	
	$('.mainpage').css({"background-size": 1920 * coef_w });	
			
			$('#logo').width(75  * 	coef_w);
			$('#logo').offset({left: 15 * coef_w + offset_w, top: 1075 * coef_h });
			
			$('.info_q').width(67  * 	coef_w);
			$('.info_q').offset({left: 105 * coef_w + offset_w, top: 1080 * coef_h });
			
			$('.color_wall').width(840 * coef_w);				
			$('.color_wall').css({left: 465 * coef_w + offset_w, top: 0 * coef_h });	
			
			$('.Mendeleev').width(210 * coef_w);				
			$('.Mendeleev').css({left: 150 * coef_w + offset_w, top: 65 * coef_h });	
			
			$('.bookcase').width(338 * coef_w);				
			$('.bookcase').css({left: 75 * coef_w + offset_w, top: 316 * coef_h });
			
			$('.vkl').width(312 * coef_w);				
			$('.vkl').css({left: 550 * coef_w + offset_w, top: 0 * coef_h });
			
			$('.door').width(360 * coef_w);				
			$('.door').css({left: 1512 * coef_w + offset_w, top: 260 * coef_h });
			
			$('.plant').width(174 * coef_w);				
			$('.plant').css({left: 405 * coef_w + offset_w, top: 624 * coef_h });
			
			$('.table').width(802 * coef_w);				
			$('.table').css({left: 510 * coef_w + offset_w, top: 726 * coef_h });
			
			$('.yashik1').width(240 * coef_w);		
			$('.yashik1').css({left: 553 * coef_w + offset_w, top: 849 * coef_h });
			$('.yashik2').width(240 * coef_w);				
			$('.yashik2').css({left: 553 * coef_w + offset_w, top: 908 * coef_h });
			$('.yashik3').width(240 * coef_w);				
			$('.yashik3').css({left: 553 * coef_w + offset_w, top: 966 * coef_h });
			
			$('.hook2').width(49 * coef_w);				
			$('.hook2').css({left: 1353 * coef_w + offset_w, top: 255 * coef_h });
			$('.hook3').width(49 * coef_w);				
			$('.hook3').css({left: 1416 * coef_w + offset_w, top: 255 * coef_h });
			
			$('.halat').width(200 * coef_w);				
			$('.halat').css({left: 1206 * coef_w + offset_w, top: 254 * coef_h });
			
			$('.shelf').width(340 * coef_w);				
			$('.shelf').css({left: 869 * coef_w + offset_w, top: 431 * coef_h });
			
			$('.white').width(54 * coef_w);				
			$('.white').css({left: 917 * coef_w + offset_w, top: 365 * coef_h });
			$('.white_ontable').width(54 * coef_w);				
			$('.white_ontable').css({left: 890 * coef_w + offset_w, top: 715 * coef_h });
			
			$('.opange').width(61 * coef_w);				
			$('.opange').css({left: 1112 * coef_w + offset_w, top: 345 * coef_h });
			$('.opange_ontable').width(61 * coef_w);				
			$('.opange_ontable').css({left: 1172 * coef_w + offset_w, top: 685 * coef_h });
			
			$('.comp').width(244 * coef_w);				
			$('.comp').css({left: 897 * coef_w + offset_w, top: 550 * coef_h });
			
			$('.left_col').width(82 * coef_w);				
			$('.left_col').css({left: 844 * coef_w + offset_w, top: 679 * coef_h });
			
			$('.right_col').width(82 * coef_w);				
			$('.right_col').css({left: 1114 * coef_w + offset_w, top: 679 * coef_h });
			
			$('.key_mouse').width(210 * coef_w);				
			$('.key_mouse').css({left: 954 * coef_w + offset_w, top: 764 * coef_h });
			
			$('.hz').width(208 * coef_w);				
			$('.hz').css({left: 604 * coef_w + offset_w, top: 537 * coef_h });
			
			$('.journal').width(180 * coef_w);				
			$('.journal').css({left: 556 * coef_w + offset_w, top: 735 * coef_h });
			
			$('.tryapka').width(144 * coef_w);				
			$('.tryapka').css({left: 745 * coef_w + offset_w, top: 739 * coef_h });
			
			$('.pincet').width(98 * coef_w);				
			$('.pincet').css({left: 765 * coef_w + offset_w, top: 755 * coef_h });
			
			$('.colb_1').width(210 * coef_w);				
			$('.colb_1').css({left: 134 * coef_w + offset_w, top: 692 * coef_h });
			
			$('.books').width(154 * coef_w);				
			$('.books').css({left: 143 * coef_w + offset_w, top: 522 * coef_h });
			
			$('.colb_2').width(164 * coef_w);				
			$('.colb_2').css({left: 197 * coef_w + offset_w, top: 422 * coef_h });
			
			$('.safe').width(210 * coef_w);				
			$('.safe').css({left: 140 * coef_w + offset_w, top: 807 * coef_h });
			$('.safe_opened').width(330 * coef_w);				
			$('.safe_opened').css({left: 140 * coef_w + offset_w, top: 807 * coef_h });
			
			$('.card').width(46 * coef_w);				
			$('.card').css({left: 200 * coef_w + offset_w, top: 907 * coef_h });
			
			$('.kod').width(74 * coef_w);				
			$('.kod').css({left: 1427 * coef_w + offset_w, top: 439 * coef_h });
			
			$('.paper').width(76 * coef_w);				
			$('.paper').css({left: 1360 * coef_w + offset_w, top: 1060 * coef_h });
			//$('.paper').css({left: 1360 * coef_w + offset_w, top: 1060 * coef_h });
			$('.paper_fall').width(76 * coef_w);				
			$('.paper_fall').css({left: 1300 * coef_w + offset_w, top: 500 * coef_h });
			
			$('.pincet_paper').width(127 * coef_w);				
			$('.pincet_paper').css({left: 1360 * coef_w + offset_w, top: 1060 * coef_h });
			
			$('.loupe').width(70 * coef_w);				
			$('.loupe').css({left: 110 * coef_w + offset_w, top: 475 * coef_h });
			
			$('.steam').width(1500 * coef_w);				
			$('.steam').css({left: 50 * coef_w + offset_w, top: 50 * coef_h });
			
			
			
			$('.hidev').width(312 * coef_w);				
			$('.hidev').css({left: 550 * coef_w + offset_w, top: 0 * coef_h });
			$('.hidev').height($('.vkl').height());