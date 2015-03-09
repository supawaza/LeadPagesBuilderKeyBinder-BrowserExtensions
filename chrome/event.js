function setStatus(stat){
	if(!localStorage["keystatus"] || localStorage["keystatus"] == "OFF"){
		localStorage["keystatus"] = "ON";
	} else{
		localStorage["keystatus"] = stat;
	}
	chrome.browserAction.setBadgeText({text: stat});
};


chrome.runtime.onInstalled.addListener(setStatus('ON'));
chrome.runtime.onStartup.addListener(setStatus('ON'));

chrome.browserAction.onClicked.addListener(function(tab) {
	localStorage["keystatus"] == 'OFF' ? setStatus('ON') : setStatus('OFF');



	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {status: localStorage["keystatus"]});
	});

});