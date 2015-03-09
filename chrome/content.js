if (!chrome.runtime) {
    // Chrome 20-21
    chrome.runtime = chrome.extension;
} else if(!chrome.runtime.onMessage) {
    // Chrome 22-25
    chrome.runtime.onMessage = chrome.extension.onMessage;
    chrome.runtime.sendMessage = chrome.extension.sendMessage;
}

var keystatus;

chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
	keystatus = msg.status;
});

var checkInterval = setInterval(function(){

	if(!document.getElementsByClassName('still-loading').length && keystatus == 'ON'){
		var el = document.createElement('script');
		el.setAttribute('src', 'https://cdn.rawgit.com/LeadPages/LeadPagesBuilderBookmarklet/master/builderKeybinding.js');
		document.head.appendChild(el);

		clearInterval(checkInterval);
	}
}, 1000);
