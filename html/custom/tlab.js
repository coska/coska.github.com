function windows_focus(oWin) {
  if (oWin == null) {
		maf.alert("system.message","popup.fail");
  }
  if (oWin.opener == null) {
  	oWin.opener = window;
  }

  oWin.focus();
}


function openYouTube(link) {
  var oWin = window.open('https://www.youtube.com/embed/'+link +'?autoplay=1',
                         'youtube',
                         'width=560,height=315,status=yes,menubars=no,scrollbars=yes,top=0px,left=0px');
  windows_focus(oWin);
}

// auto close dropdown menu on click
$(document).on("click", ".dropdown-menu a", function() {
	if($('.navbar-toggle').is(':visible')) {
		$('.navbar-toggle').click() ;//bootstrap 3.x by Richard
	}
});