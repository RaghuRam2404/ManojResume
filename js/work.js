let last_known_scroll_position = 0;
let ticking = false;
let menu = 'home'
var oldy=window.scrollY
var introheight=100
var movement = false;

function handleScroll(scroll_pos) {
	var currenty = window.scrollY
	var scrolldown = oldy > currenty;
	var scrollup = oldy < currenty;
	var samescroll = oldy == currenty;
	oldy = currenty;

	//console.log(oldy+" "+currenty+" scrollup:"+scrollup+" samescroll:"+samescroll)

	if(currenty >= 0 && currenty <= introheight*0.75){
		// selected menu - home
		$(".menuhome").html("<div class='menuitem hideitem active'><span class='activechar'>H</span>ome</div>");
		$(".menuabout").html("<div class='menuitem hideitem'>About</div>");
	}else{
		$(".menuhome").html("<div class='menuitem hideitem '>Home</div>");
		$(".menuabout").html("<div class='menuitem hideitem active'><span class='activechar'>A</span>bout</div>");
	}

	if(samescroll) return;

	if(!movement && currenty >= 0 && currenty <= introheight && (scrollup || samescroll)){
		movement = true;
		$('html, body').animate({
			scrollTop: introheight+1
		}, 500, function(){
			movement = false;
		});
	}else if(!movement && currenty >= introheight && currenty <= introheight+100 && (scrolldown || samescroll)){
		movement = true;
		$('html, body').animate({
			scrollTop: 0
		}, 500, function(){
			movement = false;
		});
	}

}

function addScrollListener(){
	window.addEventListener('scroll', function(e) {
	  last_known_scroll_position = window.scrollY;
	  if (!ticking) {
	    window.requestAnimationFrame(function() {
	      handleScroll(last_known_scroll_position);
	      ticking = false;
	    });

	    ticking = true;
	  }
	});

}

$( document ).ready(function(){
	introheight = document.getElementsByClassName("intro")[0].offsetHeight;
	addScrollListener();
	setTimeout(function(){
		
		$("body").addClass('bgcolor')
		$(".topbar").addClass('bgcolor')
		$(".topbar").addClass('bgcolor1')

		setTimeout(function(){
			$(".intro").addClass('introbg')
			$(".hold").addClass('moveupanim')
		},200);
	}, 500);
});