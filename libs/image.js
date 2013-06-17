/** @license
 * RequireJS Image Plugin
 * Author: Miller Medeiros
 * Version: 0.2.2 (2013/02/08)
 * Released under the MIT license
 */
define(function(){

    var CACHE_BUST_QUERY_PARAM = 'bust',
        CACHE_BUST_FLAG = '!bust',
        RELATIVE_FLAG = '!rel';

    var tested = false,
        supportsWebP = false;

    function noop(){}

    function cacheBust(url){
        url = url.replace(CACHE_BUST_FLAG, '');
        url += (url.indexOf('?') < 0)? '?' : '&';
        return url + CACHE_BUST_QUERY_PARAM +'='+ Math.round(2147483647 * Math.random());
    }

    function checkWebP ( callback ){
        if( tested ){
            callback( supportsWebP );
            return;
        }
        var image = new Image();
        image.onload = function(){
            tested = true;
            callback( supportsWebP = true );
        }
        image.onerror = function(){
            tested = true;
            callback( supportsWebP = false );
        }
        image.src = 'data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAAAQAgCdASoEAAQAAAcIhYWIhYSIgIIADA1gAAUAAAEAAAEAAP7%2F2fIAAAAA';
    }

    return {
        load : function(name, req, onLoad, config){
            var img;
            if(config.isBuild){
                onLoad(null); //avoid errors on the optimizer since it can't inline image files
            }else{
                img = new Image();
                img.crossOrigin = "Anonymous";
                img.onerror = function (err) {
                    onLoad.error(err);
                };
                img.onload = function(evt){
                    onLoad(img);
                    try {
                        delete img.onload; //release memory - suggested by John Hann
                    } catch(err) {
                        img.onload = noop; // IE7 :(
                    }
                };

                var src = name.indexOf(RELATIVE_FLAG) !== -1 ? req.toUrl( name.replace(RELATIVE_FLAG, '') ) : req.toUrl( name );
                img.src = src;

            }
        },
        normalize : function (name, normalize) {
            //used normalize to avoid caching references to a "cache busted" request
            return (name.indexOf(CACHE_BUST_FLAG) === -1)? name : cacheBust(name);
        }
    };

});