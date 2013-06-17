define([
	"source/glsl!./heightToNormalDUDV.glsl",
	"source/glsl!./heightToNormal4x4.glsl",
	"source/glsl!./normalToHeight.glsl"
	], function( heightToNormalDuDvShader, heightToNormal4x4Shader, normalToHeightShader ){
	
	var canvas,
		context2D,
		context3D,
		indices,
		vertices,
		dimensions;

		
	function init(){
        
		

        if( canvas === undefined ){

			canvas		= document.createElement( 'canvas' );
			context2D   = canvas.getContext( '2d' );
			context3D 	= new GLOW.Context( { alpha: false, antialias: false, depth: false, stencil: false, preserveDrawingBuffer: true } );
			indices 	= GLOW.Geometry.Plane.indicesFlipped();
			vertices 	= GLOW.Geometry.Plane.vertices();
			dimensions  = new GLOW.Vector2();

			context3D.enableCulling( true, { frontFace: GL.CCW, cullFace: GL.FRONT } );
		    context3D.enableExtension( "OES_standard_derivatives" );
		}

	}


	var api = {

	
		heightToNormal: function( media, callback, useDuDV ){

			init();

			var shader = ( useDuDV ? heightToNormalDuDvShader : heightToNormal4x4Shader );
			dimensions.set( media.width, media.height );

			var texture 	= new GLOW.FBO({
	            width: 		media.width,
	            height:     media.height,
	            // filter:     GL.NEAREST,
	            data: 		media,
	            depth:      false,
	            stencil:   	false,
	        });

			var shader = new GLOW.Shader( {
                indices         : indices,
                vertexShader    : shader.vertexShader,
                fragmentShader  : shader.fragmentShader,
                data: {
                    uTexture        : texture,
                    uDimensions     : dimensions,
                    aVertex         : vertices
                }
            });

			context3D.cache.clear();
			context3D.resize( media.width, media.height );
			context3D.setupViewport();
			shader.draw();

			var pixels = new Uint8Array( media.width * media.height * 4),
				imageData;

  			GL.readPixels( 0, 0, media.width, media.height, GL.RGBA, GL.UNSIGNED_BYTE, pixels );
  			shader.dispose( true, true );

  			canvas.width = media.width;
  			canvas.height = media.height;
  			imageData = context2D.createImageData( media.width, media.height );
  			imageData.data.set( pixels );
  			context2D.putImageData( imageData, 0, 0 );


			var image = new Image();
			image.onload = function(){
				callback && callback( image );
			}
			image.src = canvas.toDataURL();


		},

		normalToHeight: function( media ){

			init();

			context3D.domElement.width = media.width;
			context3D.domElement.height = media.height;

			dimensions.set( media.width, media.height );

			var texture 	= new GLOW.FBO({
	            width: 		media.width,
	            height:     container.height,
	            // filter:     GL.NEAREST,
	            data: 		media,
	            depth:      false,
	            stencil:   	false,
	        });

			var shader = new GLOW.Shader( {
                indices         : indices,
                vertexShader    : normalToHeightShader.vertexShader,
                fragmentShader  : normalToHeightShader.fragmentShader,
                data: {
                    uTexture        : texture,
                    uDimensions     : dimensions,
                    aVertex         : vertices
                }
            });

			context3D.cache.clear();
			shader.draw();

			shader.dispose( true, true );

		}

	}
	
	return api;

});