var checkInterval = setInterval(function(){
	if(!document.getElementsByClassName('still-loading').length){
		var el = document.createElement('script');
		el.setAttribute('src', 'https://cdn.rawgit.com/LeadPages/LeadPagesBuilderBookmarklet/master/builderKeybinding.js');
		document.head.appendChild(el);

		clearInterval(checkInterval);
	}
}, 2000);
