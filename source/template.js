define( function() {

        /*
        * GLSL parser by Bartek Drozyz
        * Slightly modified to suit GLOW by Mikael Emtinger
        */

        function getTemplate( req, path, template ){

            var matches = template.match( /\{\{(.+?)\}\}/g );
            if( matches === null ) return null;

            var modules  = matches.slice(0),
                l        = modules.length,
                i        = 0;

            while( i < l )
            {
                modules[i] = "template!" + path + modules[i].replace(/\s/g, '').replace(/\{\{/g, '').replace(/\}\}/g, '' );

                i++;
            }

            return {
                modules: modules,
                matches: matches
            }
        }

        var glsl = {
            load: function( name, req, onload, config ) {
                req( [ "./text!" + name ], function( text ) {


                    if( config.isBuild )
                    {
                        onload();
                        return;
                    }

                    var path = name.split('/');
                    path = path.slice( 0, path.length - 1 ).join('/') + "/";

                    var templates = getTemplate( req, path, text );
                    if( !templates ){
                        onload( text );
                        return;
                    }

                    req( templates.modules, function(){

                        var i = templates.matches.length;
                        while( i-- > 0 ){
                            // console.log( text.indexOf( templates.matches[i] ) );
                            text = text.split( templates.matches[i] ).join( arguments[i] );
                        }


                        onload( text );
                    })

                });
            }
        }

        return glsl;

    }
);