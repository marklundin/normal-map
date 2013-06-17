
//# Vertex
//! VERTEX

attribute  vec3    aVertex;

void main( void ) {
    gl_Position = vec4( aVertex, 1.0 );
}


//# TTFragment
//! FRAGMENT

#extension GL_OES_standard_derivatives : enable

uniform vec2 		uDimensions;
uniform sampler2D 	uTexture;

void main( void ) {
    
    vec2 unitTex 	= vec2( 1.0 / uDimensions.x, 1.0 / uDimensions.y );
    vec2 uv 		= gl_FragCoord.xy * unitTex;

    vec3 texel 		= texture2D( uTexture, uv ).rgb;
    float height 	= ( texel.r + texel.g + texel.b ) / 3.0;
    vec3 dx 		= normalize( vec3( 1.0, 0.0, max( 0.0, dFdx( height ))));
	vec3 dy 		= normalize( vec3( 0.0, 1.0, max( 0.0, dFdy( height ))));
	vec3 normal 	= cross( dx, dy ) * 0.5 + 0.5;

	//Out
    gl_FragColor = vec4( normal, 1.0 );
}





