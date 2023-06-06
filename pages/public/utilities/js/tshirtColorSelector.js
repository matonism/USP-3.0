var tshirtColorSelector = (function(tshirtColorSelector){
	
	tshirtColorSelector.initialize = function(){
		let colorSelectBox = document.querySelectorAll('.color-select-box');
        if(colorSelectBox){
            colorSelectBox.forEach(box => {
                box.addEventListener('click', function(){
                    var classString = box.className;
                    classes = classString.split(' ');
                    for(var i = 0; i < classes.length; i++){
                        if(classes[i].includes('color-box-')){
                            var color = classes[i].split('-')[2];
    
                            document.querySelectorAll('.color-select-box').forEach(function(newBox){
                                var classString = newBox.className;
                                if(classString.includes('-' + color)){
                                    classString += ' selected';
                                }else{
                                    classString = classString.replace(' selected', '', true)
                                }
                                newBox.className = classString;
                            });
                            
                            var image = document.getElementById('tank-image');
                            image.src = '../utilities/images/2020/' + color + '.png';
                        }
                    }
                });

            })
        }
	}

	return tshirtColorSelector; 


})(tshirtColorSelector || {});