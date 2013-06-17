
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

void main( void ) {
    
    vec2 uv = gl_FragCoord.xy / uDimensions;
    float height = texture2D( uTexture, uv ).rgb * 2.0 - 1.0 ;
    gl_FragColor = vec4( height, 1.0 );
    
}





