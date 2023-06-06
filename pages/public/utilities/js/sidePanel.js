var sidePanel = (function(sidePanel){
	
	sidePanel.functions = {
		setUpSidePanel: setUpSidePanel

	}
		return sidePanel;


	function setUpSidePanel(){

        
		let sidePanel = document.querySelector(".side-panel-control-left");
        if(sidePanel){
            sidePanel.addEventListener("click", function(){slideAllLeftSidePanels()});
        }

        sidePanel = document.querySelector(".side-panel-control-right");
        if(sidePanel){
            sidePanel.addEventListener("click", function(){slideAllRightSidePanels()});
        }

        sidePanel = document.querySelector(".side-bar-nav-tab-left");
        if(sidePanel){
            sidePanel.addEventListener("click", function(){slideAllLeftSidePanels()});
        }

        sidePanel = document.querySelector(".side-bar-nav-tab-right");
        if(sidePanel){
            sidePanel.addEventListener("click", function(){slideAllRightSidePanels()});
        }

	}

	function slideAllLeftSidePanels(){

		var leftSidePanels = [
		".side-bar-left-wide", 
		".side-bar-left-medium", 
		".side-bar-left-thin", 
		".side-bar-left-m-wide", 
		".side-bar-left-m-medium", 
		".side-bar-left-m-thin"
		];
		for(var i = 0; i < leftSidePanels.length; i++){
			if(document.querySelectorAll(leftSidePanels[i]).length > 0){
				slideSideBar(leftSidePanels[i]);
			}
		}
	}

	function slideAllRightSidePanels(){

		var rightSidePanels = [
		".side-bar-right-wide", 
		".side-bar-right-medium", 
		".side-bar-right-thin", 
		".side-bar-right-m-wide", 
		".side-bar-right-m-medium", 
		".side-bar-right-m-thin"
		];
		for(var i = 0; i < rightSidePanels.length; i++){
			if(document.querySelectorAll(rightSidePanels[i]).length > 0){
				slideSideBar(rightSidePanels[i]);
			}
		}
	}

	function slideSideBar(sideBarClass){
		if(sideBarClass.includes('left')){
			var navTabClass = '.side-bar-nav-tab-left';
			var sideBarOffset = parseFloat(document.querySelector(sideBarClass).offsetLeft);

			//if it should slide open
			if(sideBarOffset < 0){
				slideSideBarOpenFromLeft(sideBarClass, navTabClass);
			//if it should slide closed
			}else{
				slideSideBarClosedFromLeft(sideBarClass, navTabClass);
			}
		}else{
			var navTabClass = '.side-bar-nav-tab-right';
			var sideBarOffset = parseFloat(document.querySelector(sideBarClass).offsetRight);

			//if it should slide open
			if(sideBarOffset < 0){
				slideSideBarOpenFromRight(sideBarClass, navTabClass);
			//if it should slide closed
			}else{
				slideSideBarClosedFromRight(sideBarClass, navTabClass);
			}
		}
	}

	function slideSideBarOpenFromLeft(sideBarClass, navTabClass){
		var incrementOnInterval = 5;

		var interval = setInterval(function(){
			var currentSideBarOffset = parseFloat(getComputedStyle(document.querySelector(sideBarClass)).left);
			var navTabOffset = parseFloat(getComputedStyle(document.querySelector(navTabClass)).left);
			var mainContentLeftPadding = parseFloat(getComputedStyle(document.querySelector('.main-content')).paddingLeft);
			var mainContentRightMargin = parseFloat(getComputedStyle(document.querySelector('.main-content')).marginRight);
			if(currentSideBarOffset >= -incrementOnInterval){
				incrementOnInterval = -currentSideBarOffset;
				document.querySelector(sideBarClass).style.left = (currentSideBarOffset + incrementOnInterval).toString();
				document.querySelector(navTabClass).style.left = (navTabOffset + incrementOnInterval).toString();
				document.querySelector('.main-content').style.paddingLeft = (mainContentLeftPadding + incrementOnInterval).toString();
				document.querySelector('.main-content').style.marginRight = (mainContentRightMargin - incrementOnInterval).toString();
				clearInterval(interval);
			}else{

				document.querySelector(sideBarClass).style.left = (currentSideBarOffset + incrementOnInterval).toString();
				document.querySelector(navTabClass).style.left = (navTabOffset + incrementOnInterval).toString();
				document.querySelector('.main-content').style.paddingLeft = (mainContentLeftPadding + incrementOnInterval).toString();
				document.querySelector('.main-content').style.marginRight = (mainContentRightMargin - incrementOnInterval).toString();
			}
		}, 10);
	}

	function slideSideBarClosedFromLeft(sideBarClass, navTabClass){
		var incrementOnInterval = 5;

		var interval = setInterval(function(){
			var currentSideBarWidth = parseFloat(getComputedStyle(document.querySelector(sideBarClass)).width);
			var currentSideBarOffset = parseFloat(getComputedStyle(document.querySelector(sideBarClass)).left);
			var navTabOffset = parseFloat(getComputedStyle(document.querySelector(navTabClass)).left);
			var mainContentLeftPadding = parseFloat(getComputedStyle(document.querySelector('.main-content')).paddingLeft);
			var mainContentRightMargin = parseFloat(getComputedStyle(document.querySelector('.main-content')).marginRight);

			if(currentSideBarOffset <= -currentSideBarWidth + incrementOnInterval){
				incrementOnInterval = (currentSideBarWidth + currentSideBarOffset);
				document.querySelector(sideBarClass).style.left = (currentSideBarOffset - incrementOnInterval).toString();
				document.querySelector(navTabClass).style.left = (navTabOffset - incrementOnInterval).toString();
				document.querySelector('.main-content').style.paddingLeft = (mainContentLeftPadding - incrementOnInterval).toString();
				document.querySelector('.main-content').style.marginRight = (mainContentRightMargin + incrementOnInterval).toString();
				clearInterval(interval);
			}else{

				document.querySelector(sideBarClass).style.left = (currentSideBarOffset - incrementOnInterval).toString();
				document.querySelector(navTabClass).style.left = (navTabOffset - incrementOnInterval).toString();
				document.querySelector('.main-content').style.paddingLeft = (mainContentLeftPadding - incrementOnInterval).toString();
				document.querySelector('.main-content').style.marginRight = (mainContentRightMargin + incrementOnInterval).toString();
			}
		}, 10);
	}
	function slideSideBarOpenFromRight(sideBarClass, navTabClass){
		var incrementOnInterval = 5;

		var interval = setInterval(function(){
			var currentSideBarOffset = parseFloat(getComputedStyle(document.querySelector(sideBarClass)).right);
			var navTabOffset = parseFloat(getComputedStyle(document.querySelector(navTabClass)).right);
			var mainContentRightPadding = parseFloat(getComputedStyle(document.querySelector('.main-content')).paddingRight);
			var mainContentLeftMargin = parseFloat(getComputedStyle(document.querySelector('.main-content')).marginLeft);

			if(currentSideBarOffset >= -incrementOnInterval){
				incrementOnInterval = -currentSideBarOffset;
				document.querySelector(sideBarClass).style.right = (currentSideBarOffset + incrementOnInterval).toString();
				document.querySelector(navTabClass).style.right = (navTabOffset + incrementOnInterval).toString();
				document.querySelector('.main-content').style.paddingRight = (mainContentRightPadding + incrementOnInterval).toString();
				document.querySelector('.main-content').style.marginLeft = (mainContentLeftMargin - incrementOnInterval).toString();
				clearInterval(interval);
			}else{

				document.querySelector(sideBarClass).style.right = (currentSideBarOffset + incrementOnInterval).toString();
				document.querySelector(navTabClass).style.right = (navTabOffset + incrementOnInterval).toString();
				document.querySelector('.main-content').style.paddingRight = (mainContentRightPadding + incrementOnInterval).toString();
				document.querySelector('.main-content').style.marginLeft = (mainContentLeftMargin - incrementOnInterval).toString();
			}
		}, 10);
	}

	function slideSideBarClosedFromRight(sideBarClass, navTabClass){
		var incrementOnInterval = 5;

		var interval = setInterval(function(){
			var currentSideBarWidth = parseFloat(getComputedStyle(document.querySelector(sideBarClass)).width);
			var currentSideBarOffset = parseFloat(getComputedStyle(document.querySelector(sideBarClass)).right);
			var navTabOffset = parseFloat(getComputedStyle(document.querySelector(navTabClass)).right);
			var mainContentRightPadding = parseFloat(getComputedStyle(document.querySelector('.main-content')).paddingRight);
			var mainContentLeftMargin = parseFloat(getComputedStyle(document.querySelector('.main-content')).marginLeft);
			if(currentSideBarOffset <= -currentSideBarWidth+incrementOnInterval){

				incrementOnInterval = (currentSideBarWidth + currentSideBarOffset);
				document.querySelector(sideBarClass).style.right = (currentSideBarOffset - incrementOnInterval).toString();
				document.querySelector(navTabClass).style.right = (navTabOffset - incrementOnInterval).toString();
				document.querySelector('.main-content').style.paddingRight = (mainContentRightPadding - incrementOnInterval).toString();
				document.querySelector('.main-content').style.marginLeft = (mainContentLeftMargin + incrementOnInterval).toString();
				clearInterval(interval);

			}else{

				document.querySelector(sideBarClass).style.right = (currentSideBarOffset - incrementOnInterval).toString();
				document.querySelector(navTabClass).style.right = (navTabOffset - incrementOnInterval).toString();
				document.querySelector('.main-content').style.paddingRight = (mainContentRightPadding - incrementOnInterval).toString();
				document.querySelector('.main-content').style.marginLeft = (mainContentLeftMargin + incrementOnInterval).toString();
			}
		}, 10);
	}


})(sidePanel || []);