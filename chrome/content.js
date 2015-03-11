if (!chrome.runtime) {
    // Chrome 20-21
    chrome.runtime = chrome.extension;
} else if(!chrome.runtime.onMessage) {
    // Chrome 22-25
    chrome.runtime.onMessage = chrome.extension.onMessage;
    chrome.runtime.sendMessage = chrome.extension.sendMessage;
}

var keystatus;

//Ask background script for the initial/previously set state
chrome.runtime.sendMessage({currentStatus: localStorage['keystatus']}, function(response) {
  keystatus = response.status;
  localStorage['keystatus'] = keystatus;
});

//Get toggled/clicked state from background
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	keystatus = msg.status;
	localStorage['keystatus'] = keystatus;
});

var checkInterval = setInterval(function(){

	//Make sure the builder finished loading
	if(!document.getElementsByClassName('still-loading').length && keystatus == 'ON'){
		var el = document.createElement('script');
		el.setAttribute('src', 'https://cdn.rawgit.com/supawaza/LeadPagesBuilderBookmarklet/extensions/builderKeybinding.js');
		document.head.appendChild(el);

		clearInterval(checkInterval);
	}
}, 1000);
