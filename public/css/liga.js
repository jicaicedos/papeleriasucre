/* A polyfill for browsers that don't support ligatures. */
/* The script tag referring to this file must be placed before the ending body tag. */

/* To provide support for elements dynamically added, this script adds
   method 'icomoonLiga' to the window object. You can pass element references to this method.
*/
(function () {
    'use strict';
    function supportsProperty(p) {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
            i,
            div = document.createElement('div'),
            ret = p in div.style;
        if (!ret) {
            p = p.charAt(0).toUpperCase() + p.substr(1);
            for (i = 0; i < prefixes.length; i += 1) {
                ret = prefixes[i] + p in div.style;
                if (ret) {
                    break;
                }
            }
        }
        return ret;
    }
    var icons;
    if (!supportsProperty('fontFeatureSettings')) {
        icons = {
            'pencil': '&#xe905;',
            'write': '&#xe905;',
            'pencil2': '&#xe906;',
            'write2': '&#xe906;',
            'file-text': '&#xe922;',
            'file': '&#xe922;',
            'profile': '&#xe923;',
            'file2': '&#xe923;',
            'file-text2': '&#xe926;',
            'file4': '&#xe926;',
            'stack': '&#xe92e;',
            'layers': '&#xe92e;',
            'download': '&#xe960;',
            'save': '&#xe960;',
            'spinner11': '&#xe984;',
            'loading12': '&#xe984;',
            'bin': '&#xe9ac;',
            'trashcan': '&#xe9ac;',
            'bin2': '&#xe9ad;',
            'trashcan2': '&#xe9ad;',
            'play2': '&#xea15;',
            'player': '&#xea15;',
            'play3': '&#xea1c;',
            'player8': '&#xea1c;',
            'terminal': '&#xea81;',
            'console': '&#xea81;',
            'file-pdf': '&#xeadf;',
            'file10': '&#xeadf;',
          '0': 0
        };
        delete icons['0'];
        window.icomoonLiga = function (els) {
            var classes,
                el,
                i,
                innerHTML,
                key;
            els = els || document.getElementsByTagName('*');
            if (!els.length) {
                els = [els];
            }
            for (i = 0; ; i += 1) {
                el = els[i];
                if (!el) {
                    break;
                }
                classes = el.className;
                if (/icon-/.test(classes)) {
                    innerHTML = el.innerHTML;
                    if (innerHTML && innerHTML.length > 1) {
                        for (key in icons) {
                            if (icons.hasOwnProperty(key)) {
                                innerHTML = innerHTML.replace(new RegExp(key, 'g'), icons[key]);
                            }
                        }
                        el.innerHTML = innerHTML;
                    }
                }
            }
        };
        window.icomoonLiga();
    }
}());
