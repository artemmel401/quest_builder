<img src="images/wallfloor_back.svg" style="" class="obj pieceofwall drag">
	<img src="images/wallfloor_back.svg" style="" class="obj wallfloor drag">
	<img src="images/decor4wall.svg" style="" class="obj decor4wall drag">
	<img src="images/lamps.svg" style="" class="obj lamps drag">
	

	
	<img src="images/table_Mend@2x.png" style="" class="obj table_Mend drag">

	
	<img src="images/sink.svg" style="" class="obj sink drag">
	<img src="images/table.svg" style="" class="obj table drag">
	
	
	<img src="images/door.svg" style="" class="obj door drag">
	<img src="images/gorelka.svg" style="" class="obj gorelka drag">
	
	
	<img src="images/lupa.svg" style="" class="obj lupa drag noSwipe">
	<img src="images/many_predmet_glass.svg" style="" class="obj many_predmet_glass drag">
	<img src="images/colba.svg" style="" class="obj colba drag noSwipe">
	<img src="images/metal_plastina_big.svg" style="" class="obj metal_plastina drag hide">
	<img src="images/pinset.svg" style="" class="obj pinset drag noSwipe">
	<img src="images/Plan_evokuation@2x.png" style="" class="obj plan drag ">
	
	<img src="images/polka.svg" style="" class="obj polka drag">
	<img src="images/predmet_glass.svg" style="" class="obj predmet_glass drag noSwipe">
	<img src="images/safe.svg" style="" class="obj safe drag noSwipe">
	<img src="images/sand.svg" style="" class="obj sand drag">
	<img src="images/list.svg" style="" class="obj list drag hide">
	<img src="images/savok.svg" style="" class="obj savok drag noSwipe">
	<img src="images/gorelka.svg" style="" class="obj gorelka drag noSwipe">
	<img src="images/spichki.svg" style="" class="obj spichki drag noSwipe">
	<img src="images/chair.svg" style="" class="obj chair drag noSwipe">
	
	
	<!--Сообщения -->
	<div id="mend_full" class="modal noSwipe" style=""> 
		<p class="height100 center">
			<img class="popphoto" src="images/tabl.jpg" style="" alt="">	
		</p>
	</div>
	<div id="after_gorelka" class="modal noSwipe" style=""> 
		<p class="height100 center">
			<img class="popphoto" src="images/after_gorelka.svg" style="" alt="">	
		</p>
	</div>
	
	<div id="metal_plastina_about" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				На металлической пластине что-то есть...
			</div>
		</div>
	</div>
	<div id="notall" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				Собраны не все предметы
			</div>
		</div>
	</div>
	
	<div id="popup_water_pic" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				На предметном стекле появился рисунок...
			</div>
			
		</div>
	</div>
	
	<div id="gorelka_closed" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				Горелка закрыта.<br>
				Ее нельзя поджечь.
			</div>
		</div>
	</div>
	<div id="gorelka_notwork" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				Ничего не происходит...
			</div>
		</div>
	</div>
	<div id="spichki_about" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				Это спички...
			</div>
		</div>
	</div>
	<div id="sand_about" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				Песок необходим <br>согласно технике безопасности...
			</div>
		</div>
	</div>
	<div id="chair_about" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				Офисный стул <br>на колесиках...
			</div>
		</div>
	</div>
	
	
	
	
	$('.pieceofwall').width($(window).width());				
		$('.pieceofwall').height(th*coef_h );				
		$('.pieceofwall').css({left: 0, top: 0 * coef_h });
		console.log($('.pieceofwall').offset());
		
		$('.wallfloor').width(1858 * coef_w);				
		$('.wallfloor').css({left: 0 * coef_w + offset_w, top: 0 * coef_h });
		console.log($('.wallfloor').offset());
		$('.chair').width(227 * coef_w);				
		$('.chair').css({left: (offset_chair) * coef_w + offset_w , top: 758 * coef_h });

		$('.colba').width(92 * coef_w);				
		$('.colba').css({left: 803 * coef_w + offset_w, top: 559 * coef_h });

		$('.decor4wall').width(814 * coef_w);				
		$('.decor4wall').css({left: 516 * coef_w + offset_w, top: 142 * coef_h });

		$('.door').width(344 * coef_w);				
		$('.door').css({left: 1197 * coef_w + offset_w, top: 202 * coef_h });
	
		

		$('.gorelka').width(74 * coef_w);				
		$('.gorelka').css({left: 299 * coef_w + offset_w, top: 345 * coef_h });

		$('.lamps').width(1586 * coef_w);				
		$('.lamps').css({left: 147 * coef_w + offset_w, top: 94 * coef_h });

		$('.list').width(129 * coef_w);				
		$('.list').css({left: 1636 * coef_w + offset_w, top: lis_pos_top * coef_h });

		$('.lupa').width(77 * coef_w);				
		$('.lupa').css({left: 1000 * coef_w + offset_w, top: 640 * coef_h });

		$('.many_predmet_glass').width(132 * coef_w);				
		$('.many_predmet_glass').css({left: 519 * coef_w + offset_w, top: 610 * coef_h });

		$('.metal_plastina').width(188 * coef_w);				
		$('.metal_plastina').css({left: 189 * coef_w + offset_w, top: 551 * coef_h });

		$('.pinset').width(114 * coef_w);				
		$('.pinset').css({left: 884 * coef_w + offset_w, top: 647 * coef_h });

		$('.plan').width(251 * coef_w);				
		$('.plan').css({left: 1569 * coef_w + offset_w, top: 203 * coef_h });

		$('.plintus').width(1220 * coef_w);				
		$('.plintus').css({left: 0 * coef_w + offset_w, top: 841 * coef_h });

		$('.polka').width(324 * coef_w);				
		$('.polka').css({left: 85 * coef_w + offset_w, top: 431 * coef_h });

		$('.predmet_glass').width(125 * coef_w);				
		$('.predmet_glass').css({left: 657 * coef_w + offset_w, top: 639 * coef_h });

		$('.safe').width(168 * coef_w);				
		$('.safe').css({left: 543 * coef_w + offset_w, top: 762 * coef_h });

		$('.sand').width(188 * coef_w);				
		$('.sand').css({left: 1602 * coef_w + offset_w, top: 776 * coef_h });

		$('.savok').width(62 * coef_w);				
		$('.savok').css({left: 225 * coef_w + offset_w, top: 824 * coef_h });

		$('.sink').width(272 * coef_w);				
		$('.sink').css({left: 102 * coef_w + offset_w, top: 589 * coef_h });

		$('.spichki').width(66 * coef_w);				
		$('.spichki').css({left: 150 * coef_w + offset_w, top: 399 * coef_h });

		$('.table').width(672 * coef_w);				
		$('.table').css({left: 441 * coef_w + offset_w, top: 633 * coef_h });

		$('.table_Mend').width(533 * coef_w);				
		$('.table_Mend').css({left: 525 * coef_w + offset_w, top: 201 * coef_h });