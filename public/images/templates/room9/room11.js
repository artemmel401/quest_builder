<img src="images/wall.png" style="" class="obj wall drag">
	<img src="images/wall.svg" style="" class="obj wall_main drag">
	<img src="images/floor.png" style="" class="obj floor drag">
	<img src="images/floor.svg" style="" class="obj floor_main drag">
	<img src="images/board.svg" style="" class="obj board drag">
	<img src="images/light.svg" style="" class="obj light drag hide">
	<div class="obj task_light hide" style="border: 0px solid red; text-align: center; background-color: white;
		background: url('https://www.learnis.ru/quests/<?php echo $id_quest.'/'.$pieces[3];?>') center center no-repeat white; background-size: contain;">
		
	</div>
	<img src="images/doska.svg" style="" class="obj doska drag">
	<div class="obj task_desk" style="border: 0px solid red; text-align: center; background-color: white;
		background: url('https://www.learnis.ru/quests/<?php echo $id_quest.'/'.$pieces[5];?>') center center no-repeat white; background-size: contain;">

	</div>
	
	<img src="images/kod.svg" style="" class="obj kod drag">
	<img src="images/plintus.png" style="" class="obj plintus drag">
	<img src="images/plintus.svg" style="" class="obj plintus_main drag">
	<img src="images/door.svg" style="" class="obj door drag">
	<img src="images/rasp.svg" style="" class="obj rasp drag">
	<img src="images/parol.svg" style="" class="obj parol drag">
	<img src="images/decor.svg" style="" class="obj decor drag">
	<img src="images/sock.svg" style="" class="obj sock drag">

	<img src="images/tree_bright.svg" style="" class="obj tr2 tree_bright drag noSwipe">
	<img src="images/desk.svg" style="" class="obj desk drag zmax">
	<img src="images/noyt.svg" style="" class="obj noyt drag zmax">
	<img src="images/book.png" style="" class="obj book drag zmax">
	<img src="images/pult.svg" style="" class="obj pult drag zmax hide">
	<img src="images/mail.svg" style="" class="obj mail drag zmax">
	<img src="images/round_decor.svg" style="" class="obj round_decor drag">

	
	<img src="images/gir_off.svg" style="" class="obj gir_off drag">
	<img src="images/gir_on.svg" style="" class="obj gir_on drag hide">
	<img src="images/projector_only.svg" style="" class="obj projector_only drag">
	
	<!--Сообщения -->
	<div id="popuprasp" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto; height: 100%;">
				<img src="https://www.learnis.ru/templates/room11/images/rasp_full.png"
					style="max-width: 100%; max-height: 100%; flex-shrink: 0;">
			</div>
		</div>
	</div>
	<div id="popupclosed" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto;">
				Дверь закрыта...
			</div>
		</div>
	</div>
	<div id="popupparol" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex; flex-shrink: 0;">
			<div style="margin: auto; height: 100%;">
				<img src="images/pass.png" style="max-width: 100%; max-height: 100%; flex-shrink: 0;">
			</div>
		</div>
	</div>
	<div id="popupnoyt" class="modal noSwipe" style=""> 
		<div style="text-align: center; font-size: 4vw; font-weight: bold; height: 100%; display: flex;">
			<div style="margin: auto; width: 100%;">
				<div style="display: block; width: 100%;">
					<p style="font-size: 5vmin; "><b>Пароль от компьютера</b></p>
					<p style="width: 80%; font-size: 4vw; margin-left: 10%;">
						<div style="width: 80%; margin-left: 10%;" class="">
							<div class="mdl-textfield  mdl-textfield--full-width mdl-js-textfield mdl-textfield--floating-label safe-textfield">
								<input class="mdl-textfield__input " type="text" id="safecode" style="font-size: 4vw; ">
								<label class="mdl-textfield__label " for="safecode" >Введите пароль...</label>
							</div>
							<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored opensafe">
								OK
							</button>
						</div>
					</p>
				</div>
			</div>
			
		</div>
	</div>
	
	
	
	
	$('.pieceofwall').width($(window).width());				
		$('.pieceofwall').height(th*coef_h );				
		$('.pieceofwall').css({left: 0, top: 0 * coef_h });
		
		$('.wall').width($(window).width());	
		$('.wall').height(858*coef_h );		
		$('.wall').css({left: 0, top: 0 * coef_h });
		
		$('.wall_main').width(1920 * coef_w);				
		$('.wall_main').css({left: 0 * coef_w + offset_w, top: 0 * coef_h });
		
		
		$('.floor').width($(window).width());	
		$('.floor').height(203*coef_h );			
		$('.floor').css({left: 0, top: 879 * coef_h });
		$('.floor_main').width(1920 * coef_w);				
		$('.floor_main').css({left: 0 * coef_w + offset_w, top:879 * coef_h });
		
		$('.plintus').width($(window).width());	
		$('.plintus').height(22*coef_h );		
		$('.plintus').css({left: 0, top: 858 * coef_h });
		$('.plintus_main').width(1920 * coef_w);				
		$('.plintus_main').css({left: 0 * coef_w + offset_w, top:858 * coef_h });
		
		
		$('.board').width(694 * coef_w);				
		$('.board').css({left: 486 * coef_w + offset_w, top: 132 * coef_h });

		$('.book').width(114 * coef_w);				
		$('.book').css({left: 540 * coef_w + offset_w, top: 727 * coef_h });

		$('.decor').width(666 * coef_w);				
		$('.decor').css({left: 544 * coef_w + offset_w, top: 535 * coef_h });

		$('.desk').width(693 * coef_w);				
		$('.desk').css({left: 83 * coef_w + offset_w, top: 532 * coef_h });

		$('.door').width(320 * coef_w);				
		$('.door').css({left: 1235 * coef_w + offset_w, top: 196 * coef_h });

		$('.doska').width(352 * coef_w);				
		$('.doska').css({left: 113 * coef_w + offset_w, top: 180 * coef_h });

		$('.task_desk').width(186 * coef_w);				
		$('.task_desk').height(120 * coef_h);				
		$('.task_desk').css({left: 194 * coef_w + offset_w, top: 400 * coef_h });
		
		$('.task_light').width(360 * coef_w);				
		$('.task_light').height(220 * coef_h);				
		$('.task_light').css({left: 660 * coef_w + offset_w, top: 270 * coef_h });
		

		$('.gir_off').width(1396 * coef_w);				
		$('.gir_off').css({left: 514 * coef_w + offset_w, top: 0 * coef_h });

		$('.gir_on').width(1396 * coef_w);				
		$('.gir_on').css({left: 514 * coef_w + offset_w, top: 0 * coef_h });

		$('.kod').width(69 * coef_w);				
		$('.kod').css({left: 1584 * coef_w + offset_w, top: 479 * coef_h });

		$('.mail').width(122 * coef_w);				
		$('.mail').css({left: 146 * coef_w + offset_w, top: 634 * coef_h });

		$('.noyt').width(212 * coef_w);				
		$('.noyt').css({left: 315 * coef_w + offset_w, top: 679 * coef_h });

		$('.parol').width(50 * coef_w);				
		$('.parol').css({left: 135 * coef_w + offset_w, top: 355 * coef_h });

		

		$('.projector').width(629 * coef_w);				
		$('.projector').css({left: 645 * coef_w + offset_w, top: 0 * coef_h });


		$('.light').width(440 * coef_w);				
		$('.light').css({left: 650 * coef_w + offset_w, top: 200 * coef_h });

		$('.projector_only').width(217 * coef_w);				
		$('.projector_only').css({left: 1040 * coef_w + offset_w, top: 0 * coef_h });

		$('.pult').width(80 * coef_w);				
		$('.pult').css({left: 677 * coef_w + offset_w, top: 753 * coef_h });

		$('.rasp').width(191 * coef_w);				
		$('.rasp').css({left: 194 * coef_w + offset_w, top: 245 * coef_h });

		$('.round_decor').width(170 * coef_w);				
		$('.round_decor').css({left: 205 * coef_w + offset_w, top: 76 * coef_h });

		$('.sock').width(162 * coef_w);				
		$('.sock').css({left: 798 * coef_w + offset_w, top: 615 * coef_h });

		
		$('.tree').width(648 * coef_w);				
		$('.tree').css({left: 1411 * coef_w + offset_w, top: 1 * coef_h });

		console.log('offset_tree_res='+offset_tree);
		$('.tree_bright').width(648 * coef_w);				
		$('.tree_bright').css({left: offset_tree * coef_w + offset_w, top: 1 * coef_h });