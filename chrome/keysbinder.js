var checkInterval;

checkInterval = setInterval(function(){
	if(window.App !== 'undefined'){
		var el = document.createElement('script');
		el.setAttribute('src', 'https://cdn.rawgit.com/LeadPages/builderBookmarklet/master/builderKeybinding.js');
		document.head.appendChild(el);

		clearInterval(checkInterval);
	}
}, 2000);
