define( ['source/textureutils', 'libs/image!heightmap.png'], function( util, image ){
	
	util.heightToNormal( image, function( normalImage ){

		document.body.appendChild( normalImage );

	} );

});