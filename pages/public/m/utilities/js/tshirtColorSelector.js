var tshirtColorSelector = (function(tshirtColorSelector){
	
	tshirtColorSelector.initialize = function(){
		document.querySelector('.color-select-box').on('click', function(){
			var classString = this.className;
			classes = classString.split(' ');
			for(var i = 0; i < classes.length; i++){
				if(classes[i].includes('color-box-')){
					var color = classes[i].split('-')[2];

					document.querySelector('.color-select-box').each(function(){
						var classString = this.className;
						if(classString.includes('-' + color)){
							classString += ' selected';
						}else{
							classString = classString.replace(' selected', '', true)
						}
						this.className = classString;
					});
					
					var image = document.getElementById('tank-image');
					image.src = '../utilities/images/2020/' + color + '.png';
				}
			}
		});
	}

	return tshirtColorSelector; 


})(tshirtColorSelector || {});