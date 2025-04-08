<img src="images/all.svg" style="" class="obj wall drag">
	<img src="images/plintus.svg" style="" class="obj plintus drag">
	<img src="images/floor.svg" style="" class="obj floor drag">
	<img src="images/door_kod.svg" style="" class="obj door_kod drag">
	<img src="images/door_no_ruchka.svg" style="" class="obj door_no_ruchka drag">
	<img src="images/door_open.svg" style="" class="obj door_open drag hide">
	<img src="images/kladovka.svg" style="" class="obj kladovka drag hide">
	
	<img src="images/table.svg" style="" class="obj table drag">
	
	<img src="images/minilamp_off.svg" style="" class="obj minilamp_off drag hide">
	<img src="images/minilamp_on.svg" style="" class="obj minilamp_on drag hide">
	<img src="images/bottle.svg" style="" class="obj bottle drag hide">
	<img src="images/dictionary.svg" style="" class="obj dictionary drag hide noSwipe">
	<img src="images/washing_machin_empty.svg" style="" class="obj washing_machin_empty drag hide">
	<img src="images/washing_machin_full.svg" style="" class="obj washing_machin_full drag hide">
	<img src="images/zaryad.svg" style="" class="obj zaryad drag hide noSwipe">
	<img src="images/privod.svg" style="" class="obj privod drag hide noSwipe">
	
	<div style="background-color: black; opacity: 0.5;" class="obj kladovka_shadow hide"></div>
	
	<img src="images/comp_no_privod.svg" style="" class="obj comp comp_no_privod drag">
	<img src="images/socket.svg" style="" class="obj socket drag">
	<img src="images/tel.svg" style="" class="obj tel drag noSwipe">
	<img src="images/tel_socket.svg" style="" class="obj tel_socket drag hide">
	<img src="images/monitor.svg" style="" class="obj comp monitor drag">
	<img src="images/otvertka.svg" style="" class="obj otvertka drag">
	<img src="images/plant_otvertka.svg" style="" class="obj plant_otvertka drag">
	
	<img src="images/basket_empty.svg" style="" class="obj basket_empty drag hide noSwipe">
	<img src="images/basket_full.svg" style="" class="obj basket_full drag noSwipe">

	<img src="images/book.svg" style="" class="obj book drag noSwipe">
	<img src="images/disketa.svg" style="" class="obj disketa drag  noSwipe">

	<img src="images/list.svg" style="" class="obj list drag">
	<img src="images/kover.svg" style="" class="obj kover drag noSwipe">
	<img src="images/list.svg" style="" class="obj list_washing hide drag">
	
	<img src="images/switchon.svg" style="" class="obj switch switchon drag hide">
	<img src="images/switchoff.svg" style="" class="obj switch switchoff drag">

	<img src="images/lamp_off.svg" style="" class="obj lamp_off1 drag">
	<img src="images/lamp_off.svg" style="" class="obj lamp_off2 drag">
	<img src="images/lamp_off.svg" style="" class="obj lamp_off3 drag">

	<img src="images/lamp_on.svg" style="" class="obj lamp_on lamp_on1 drag noSwipe">
	<img src="images/lamp_on.svg" style="" class="obj lamp_on lamp_on2 drag noSwipe">
	<img src="images/lamp_on.svg" style="" class="obj lamp_on lamp_on3 drag noSwipe">

	<img src="images/lightbulb.svg" style="" class="obj lightbulb1 drag hide">
	<img src="images/lightbulb.svg" style="" class="obj lightbulb2 drag hide">
	<img src="images/lightbulb.svg" style="" class="obj lightbulb3 drag hide">
	
	
	<img src="images/chair.svg" style="" class="obj chair drag">
	<img src="images/chair_front.svg" style="" class="obj chair_front drag hide">
	<img src="images/ruchka.svg" style="" class="obj ruchka drag hide noSwipe">
	
	
	
	<!--Размеры-->
	$('.wall').width((1920 * coef_w > $(window).width())  ? (1920 * coef_w) : ($(window).width()));
		$('.wall').height(1080*coef_h );		
		$('.wall').css({left: 0, top: 0 * coef_h });
		
		
		
		$('.basket_empty').width(180 * coef_w);				
		$('.basket_empty').css({left: 1028 * coef_w + offset_w, top: 624 * coef_h });

		$('.basket_full').width(180 * coef_w);				
		$('.basket_full').css({left: pos_left * coef_w + offset_w, top: 606 * coef_h });

		$('.book').width(110 * coef_w);				
		$('.book').css({left: 1225 * coef_w + offset_w, top: 530 * coef_h });

		$('.bottle').width(27 * coef_w);				
		$('.bottle').css({left: 698 * coef_w + offset_w, top: 234 * coef_h });

		$('.chair').width(269 * coef_w);				
		$('.chair').css({left: 1360 * coef_w + offset_w, top: 650 * coef_h });

		$('.chair_front').width(269 * coef_w);				
		$('.chair_front').css({left: 1360 * coef_w + offset_w, top: 650 * coef_h });

		$('.comp_no_privod').width(108 * coef_w);				
		$('.comp_no_privod').css({left: 1246 * coef_w + offset_w, top: 636 * coef_h });

		$('.dictionary').width(103 * coef_w);				
		$('.dictionary').css({left: 573 * coef_w + offset_w, top: 306 * coef_h });

		$('.disketa').width(56 * coef_w);				
		$('.disketa').css({left: 1649 * coef_w + offset_w, top: 550 * coef_h });

		$('.door_kod').width(259 * coef_w);				
		$('.door_kod').css({left: 122 * coef_w + offset_w, top: 188 * coef_h });

		$('.door_no_ruchka').width(259 * coef_w);				
		$('.door_no_ruchka').css({left: 531 * coef_w + offset_w, top: 188 * coef_h });

		$('.door_open').width(309 * coef_w);				
		$('.door_open').css({left: 531 * coef_w + offset_w, top: 155 * coef_h });

		$('.floor').width(1920 * coef_w);				
		$('.floor').css({left: 0 * coef_w + offset_w, top: 789 * coef_h });

		$('.kladovka').width(210 * coef_w);				
		$('.kladovka').css({left: 552 * coef_w + offset_w, top: 204 * coef_h });
		
		$('.kladovka_shadow').width(210 * coef_w);				
		$('.kladovka_shadow').css({left: 552 * coef_w + offset_w, top: 204 * coef_h });
		$('.kladovka_shadow').height(586*coef_h );

		$('.kover').width(801 * coef_w);				
		$('.kover').css({left: 201 * coef_w + offset_w, top: 858 * coef_h });

		$('.list').width(120 * coef_w);				
		$('.list').css({left: 849 * coef_w + offset_w, top: 885 * coef_h });

		$('.list_washing').width(120 * coef_w);				
		$('.list_washing').css({left: 454 * coef_w + offset_w, top: 828 * coef_h });

		$('.minilamp_off').width(35 * coef_w);				
		$('.minilamp_off').css({left: 644 * coef_w + offset_w, top: 205 * coef_h });

		$('.minilamp_on').width(149 * coef_w);				
		$('.minilamp_on').css({left: 588 * coef_w + offset_w, top: 205 * coef_h });

		$('.monitor').width(185 * coef_w);				
		$('.monitor').css({left: 1465 * coef_w + offset_w, top: 394 * coef_h });

		$('.otvertka').width(14 * coef_w);				
		$('.otvertka').css({left: 1798 * coef_w + offset_w, top: 659 * coef_h });

		$('.plant_otvertka').width(149 * coef_w);				
		$('.plant_otvertka').css({left: 1739 * coef_w + offset_w, top: 530 * coef_h });

		$('.plintus').width(1920 * coef_w);				
		$('.plintus').css({left: 0 * coef_w + offset_w, top: 757 * coef_h });

		$('.privod').width(64 * coef_w);				
		$('.privod').css({left: 677 * coef_w + offset_w, top: 417 * coef_h });

		$('.ruchka').width(159 * coef_w);				
		$('.ruchka').css({left: 1400 * coef_w + offset_w, top: 770 * coef_h });

		$('.socket').width(54 * coef_w);				
		$('.socket').css({left: 933 * coef_w + offset_w, top: 648 * coef_h });

		$('.switchoff').width(54 * coef_w);				
		$('.switchoff').css({left: 454 * coef_w + offset_w, top: 463 * coef_h });

		$('.switchon').width(54 * coef_w);				
		$('.switchon').css({left: 454 * coef_w + offset_w, top: 463 * coef_h });

		$('.table').width(518 * coef_w);				
		$('.table').css({left: 1199 * coef_w + offset_w, top: 542 * coef_h });

		$('.tel').width(45 * coef_w);				
		$('.tel').css({left: 1398 * coef_w + offset_w, top: 534 * coef_h });

		$('.tel_socket').width(70 * coef_w);				
		$('.tel_socket').css({left: 897 * coef_w + offset_w, top: 661 * coef_h });

		

		$('.washing_machin_empty').width(196 * coef_w);				
		$('.washing_machin_empty').css({left: 561 * coef_w + offset_w, top: 525 * coef_h });

		$('.washing_machin_full').width(196 * coef_w);				
		$('.washing_machin_full').css({left: 561 * coef_w + offset_w, top: 525 * coef_h });

		$('.zaryad').width(97 * coef_w);				
		$('.zaryad').css({left: 568 * coef_w + offset_w, top: 415 * coef_h });


		$('.lamp_off1').width(91 * coef_w);				
		$('.lamp_off1').css({left: 207 * coef_w + offset_w, top: 0 * coef_h });

		$('.lamp_off2').width(91 * coef_w);				
		$('.lamp_off2').css({left: 917 * coef_w + offset_w, top: 0 * coef_h });

		$('.lamp_off3').width(91 * coef_w);				
		$('.lamp_off3').css({left: 1617 * coef_w + offset_w, top: 0 * coef_h });


		$('.lamp_on1').width(398 * coef_w);				
		$('.lamp_on1').css({left: 53 * coef_w + offset_w, top: 0 * coef_h });

		$('.lamp_on2').width(398 * coef_w);				
		$('.lamp_on2').css({left: 763 * coef_w + offset_w, top: 0 * coef_h });

		$('.lamp_on3').width(398 * coef_w);				
		$('.lamp_on3').css({left: 1465 * coef_w + offset_w, top: 0 * coef_h });


		$('.lightbulb1').width(29 * coef_w);				
		$('.lightbulb1').css({left: 238 * coef_w + offset_w, top: 89 * coef_h });

		$('.lightbulb2').width(29 * coef_w);				
		$('.lightbulb2').css({left: 948 * coef_w + offset_w, top: 89 * coef_h });

		$('.lightbulb3').width(29 * coef_w);				
		$('.lightbulb3').css({left: 1648 * coef_w + offset_w, top: 89 * coef_h });
	
	
	<!--Сообщения -->
	
	<div id="notall" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				Собраны не все предметы
			</div>
		</div>
	</div>
	<div id="lamp_used" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				Вы уже применили этот объект
			</div>
		</div>
	</div>
	<div id="door_no_ruchka_info" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				Без ручки дверь не открыть
			</div>
		</div>
	</div>
	<div id="door_only_ruchka" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				Не удается прикрепить ручку.<br>
				Нужна отвертка.
			</div>
		</div>
	</div>
	<div id="kladovka_shadow_info" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				Слишком темно.
			</div>
		</div>
	</div>
	<div id="mini_lamp_info" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				Кажется, нет лампочки...
			</div>
		</div>
	</div>
	<div id="tel_info" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				Телефон разряжен
			</div>
		</div>
	</div>
	<div id="basket_full_info" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				Кажется, пора стирать...
			</div>
		</div>
	</div>
	<div id="book_info" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				Книга написана <br>на неизвестном вам языке
			</div>
		</div>
	</div>
	<div id="translator_info" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				На компьютере нет переводчика
			</div>
		</div>
	</div>
	<div id="disketa_get_info" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				У этого компьютера нет дисковода<br>
				для чтения дискет.
			</div>
		</div>
	</div>
	<div id="comp_info" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				Обычный компьютер
			</div>
		</div>
	</div>