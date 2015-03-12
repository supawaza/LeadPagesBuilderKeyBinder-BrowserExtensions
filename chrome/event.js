

var keybinder = {
	init: function(){
		//Set the initial state or the current state and send it back to content_script
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			if (request.currentStatus == undefined){
		 		sendResponse({status: 'ON'});
		 	} else {
		 		sendResponse({status: localStorage['keystatus']});
		 	}
		});
	},
	sendStatus: function(id){
		var tabId = id || -1;
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			tabId = tabs[0].id;
		  	chrome.tabs.sendMessage(tabId, {status: localStorage['keystatus']});
		});
	},
	setStatus: function(state){
		if(!localStorage['keystatus'] || localStorage['keystatus'] === 'OFF'){
			localStorage['keystatus'] = 'ON';
		} else{
			localStorage['keystatus'] = state;
		}
		chrome.browserAction.setBadgeText({text: state});
	}
};

keybinder.init();

//Default the initial badge to 'ON'
chrome.runtime.onStartup.addListener(keybinder.setStatus('ON'));

chrome.browserAction.onClicked.addListener(function(tab) {

	localStorage['keystatus'] === 'OFF' ? keybinder.setStatus('ON') : keybinder.setStatus('OFF');

	//Grab the currently opened LeadPages
	chrome.tabs.query({
		url: [
			"https://my.leadpages.net/page/*/edit/",
			"https://my.leadpages.net/template/*/new-page/*",
			"https://my.leadpagestest.net/template/*/new-page/*",
			"https://my.leadpagestest.net/page/*/edit/"
		]
	}, function(tabs){

		var leadpage = tabs[0];

		if(!leadpage.active && localStorage['keystatus'] === 'ON'){
			chrome.tabs.update(leadpage.id, {selected: true});
			setTimeout(function(){
				keybinder.sendStatus(leadpage.id);
			}, 1000);
		} else {
			keybinder.sendStatus();
		}
	});
});