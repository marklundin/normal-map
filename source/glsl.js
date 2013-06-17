define( function() {

        /*
        * GLSL parser by Bartek Drozyz
        * Slightly modified to suit GLOW by Mikael Emtinger
        */

        function getTemplate( template ){

            var matches = template.match( /\{\{(.+?)\}\}/g );

            if( !matches ) return null;

            var names   = matches.slice(0),
                i       = names.length;

            while( i-- > 0 )
            {
                names[i] = names[i].replace(/\s/g, '').replace(/\{\{/g, '').replace(/\}\}/g, '');
            }

            return {
                names: names,
                matches: matches
            }

        }

        function parseGLSL( text ) {
            var vs = "";
            var fs = "";
            var ls = text.split( "\n" );
            var buf = "";
            for( var i = 0; i < ls.length; i++ ) {
                if( ls[ i ].indexOf( "//#" ) > -1 ) {
                    if( ls[ i ].indexOf( "Fragment" ) > -1 ) {
                        vs = buf;
                        buf = "";
                    }
                } else {
                    var l = ls[ i ];
                    if( l.indexOf( "//" ) > -1 ) {
                        l = l.substring( 0, l.indexOf( "//" ));
                    }
                    if( l.indexOf( ";" ) === -1 ) {
                        l += "\n";
                    }
                    buf += l;
                }
            }
            fs = buf;

            return { fragmentShader: "#ifdef GL_ES\nprecision highp float;\n#endif\n" + fs, vertexShader: vs };
        }

        var glsl = {
            load: function( name, req, onload, config ) {
                req( [ "./template!" + name ], function( text ) {

                    // todo: inline shader code if config.isBuild
                    if( config.isBuild )
                    {
                        onload();
                        return;
                    }

                    onload( parseGLSL( text ));

                });
            }
        }

        return glsl;

    }
);