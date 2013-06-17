
//# Vertex
//! VERTEX

attribute  vec3    aVertex;

void main( void ) {
    gl_Position = vec4( aVertex, 1.0 );
}


//# TTFragment
//! FRAGMENT

uniform vec2 		uDimensions;
uniform sampler2D 	uTexture;

float height( vec2 uvx ){
    vec3 col = texture2D( uTexture, uvx ).rgb;
    return ( col.r + col.g + col.b ) / 3.0;
}

void main( void ) {
    
    vec2 unitTex 	= vec2( 1.0 / uDimensions.x, 1.0 / uDimensions.y );
    vec2 uv 		= gl_FragCoord.xy * unitTex;

    float texel = height( uv );
    vec3 up    = normalize( vec3(  0.0, -1.0, texel - height( uv + vec2( 0, -unitTex.y ))));
    vec3 down  = normalize( vec3(  0.0,  1.0, texel - height( uv + vec2( 0,  unitTex.y ))));
    vec3 left  = normalize( vec3( -1.0,  0.0, texel - height( uv + vec2( -unitTex.x, 0 ))));
    vec3 right = normalize( vec3(  1.0,  0.0, texel - height( uv + vec2(  unitTex.x, 0 ))));

    vec3 topLeftCross   = cross( left , up );
    vec3 downRightCross = cross( right, down );

    vec3 normal = ( topLeftCross + downRightCross ) / 2.0;

	//Out
    gl_FragColor = vec4( normal * 0.5 + 0.5, 1.0 );
}





