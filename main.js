define( [
	'libs/domReady!',
	'source/textureutils'
	], function( doc, util ){
	
	var c = document.createElement('canvas');
	var hasWebGL = window.WebGLRenderingContext && ( c.getContext('webgl') !== null || c.getContext('experimental-webgl') !== null );

	var container = document.querySelector('#main_content');

	window.addEventListener( 'dragover',  function(evt) {

		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.

	}, false );

	window.addEventListener( 'drop', function( evt ){

		evt.stopPropagation();
		evt.preventDefault();

		var tagline = document.querySelector('#project_tagline');

		if( !hasWebGL ){
			tagline.innerHTML = "You don't fucking have <a href='http://get.webgl.org/'>WebGL</a>. Sort it out.";

			}else{
			

			// domElement.style.display = 'none';

			var files = evt.dataTransfer.files; // FileList object.


			// files is a FileList of File objects. List some properties.
			for (var i = 0, f; f = files[i]; i++) {
				
				if (!f.type == 'text/javascript' ) continue;

				tagline.innerHTML = "There's your fucking normal map";

				var reader = new FileReader();
				reader.onload = function( e ){

					var img = new Image();
					img.onload = function(){
						util.heightToNormal( img, function( normalMap ){
							normalMap.className = 'normal-map';
							container.appendChild( normalMap );
						} )
					}.bind( this );
					img.src = e.target.result;

				}

				// Read in the image file as a data URL.
				reader.readAsDataURL(f);
			}
		}

	}, false );


	
});