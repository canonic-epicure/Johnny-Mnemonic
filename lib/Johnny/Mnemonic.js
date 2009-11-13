Class('Johnny.Mnemonic', {
    
    meta : JooseX.Bridge.Ext,
    
    isa : Ext.util.Observable,
    
    
    has : {
        iframe                  : null,
        iframeInUse             : false,
        
        defaultToken            : null,
        currentToken            : null,
        currentTokenSet         : false,
        
        skipOnLoad              : null,
        
        hashRegex               : function () { 
            return /[^#]*(?:#(.*))?/ 
        },
        
        hashFrom                : 'top',
        
        readyFunc               : null,
        readyScope              : null,
        firstNotify             : true
    },
    
    
    after : {
        initialize : function () {
            this.addEvents('statechange')
        }
    },
    
    
    methods : {
        
        back : function () {
            window[this.hashFrom].history.back()
        },
        
        
        forward : function () {
            window[this.hashFrom].history.forward()
        },
        
        
        getHash : function () {
            return this.hashRegex.exec(window[this.hashFrom].location.href)[1] || null
        },
        
        
        checkHashUpdate : function () {
            var hash = this.getHash()
            
            var hashIsDifferent = (hash != this.currentToken) && !(hash == null && this.currentToken == this.defaultToken)
            
            if (!this.currentTokenSet || hashIsDifferent) this.setCurrentToken(hash)
        },
        
        
        setupIE : function () {
            this.iframeInUse = true
            
            var iframe = this.iframe = Ext.get(document.createElement('<iframe></iframe>'))
            
            iframe.applyStyles({
                display : 'none'
            })
            
            iframe.dom.src = "about:blank"
            
            iframe.dom.attachEvent('onload', this.onIframeLoad.createDelegate(this))
            
            Ext.getBody().appendChild(iframe)
        },
        
        
        setupNormalBrowser : function () {
            //some hack for Opera
            if (history.navigationMode) history.navigationMode = 'compatible'
            
            this.checkHashUpdate()
        },
        
        
        setup : function (readyFunc, readyScope) {
            this.readyFunc  = readyFunc
            this.readyScope = readyScope
            
            if (Ext.isIE) 
                this.setupIE()
            else
                this.setupNormalBrowser()
            
            if (Ext.isIE8)
                window[this.hashFrom].attachEvent('onhashchange', this.checkHashUpdate.createDelegate(this));
            else
                setInterval(this.checkHashUpdate.createDelegate(this), 50)
        },
        
        
        onIframeLoad : function () {
            
            if (this.skipOnLoad) {
                this.skipOnLoad = false
                
                return
            }
            
            var token = this.iframe.dom.contentWindow.document.body.innerText
            
            //initial frame load
            if (!token) {
                token = this.getHash()
                
                this.shallowTokenUpdate(token)
                this.updateIframe(token || this.defaultToken)
                this.notify()
                
                return
            }
            
            //frame load from history - no need to update the iframe            
            this.shallowTokenUpdate(token)
            this.notify()
        },
        
        
        updateIframe : function (token) {
            this.skipOnLoad = true
            
            var doc = this.iframe.dom.contentWindow.document
            
            doc.open()
            doc.write('<html><body>' + token + '</body></html>')
            doc.close()
        },
        
        
        shallowTokenUpdate : function (token) {
            this.currentToken       = token
            this.currentTokenSet    = true
            
            //only update hash if it make sense
            if (token == null && this.getHash() == null) return
            
            token = token || ''
            
            if (token == this.defaultToken) token = ''
            
            window[this.hashFrom].location.hash = token
        },
        
        
        remember : function (token) {
            this.shallowTokenUpdate(token)
            
            if (this.iframeInUse) this.updateIframe(token)
        },
        
        
        setCurrentToken : function (token) {
            this.remember(token)
            
            this.notify()
        },
        
        
        getCurrentToken : function () {
            return this.currentToken || this.defaultToken
        },
        
        
        notify : function () {
            if (this.firstNotify) {
                this.firstNotify = false
                
                if (this.readyFunc) this.readyFunc.call(this.readyScope || window, this)
            }
            
            this.fireEvent('statechange', this, this.getCurrentToken())
        }
    }

})


/**

Name
====

Johnny.Mnemonic - Yet another "ajax back button" implementation, written on Joose3, with the test suite and no required page markup at this time


SYNOPSIS
========


        var mnemonic = new Johnny.Mnemonic({
            defaultToken : '/',
            hashFrom : 'window'
        })
        
        mnemonic.on('statechange', function (mnemonic, token) {
            this.syncState(token)
        })
        
        mnemonic.setup()
        
        -or-

        var mnemonic = new Johnny.Mnemonic({
            defaultToken : '/'
        })
        
        mnemonic.setup(function () {
        
            ...
        
            mnemonic.on('statechange', function (mnemonic, token) {
                this.syncState(token)
            })
        })
        
        -later-
        
        mnemonic.remember(stateToken)
        
        mnemonic.back()
        mnemonic.forward()


DESCRIPTION
===========

Johnny.Mnemonic is a yet another "ajax back button" implementation, with the focus on maintainability. 

Its source code is relatively clean, and, (the most important) it has an automated test suite - this makes it different from others solutions in this area.

Another difference is that Mnemonic do not requires any additional page markup or assets - its a pure javascript solution. 

Currently works on everything except Opera (patches welcome).


IMPLEMENTATION DETAILS
======================

Mnemonic can remember arbitrary state tokens (strings), inserting them in the browser's history along the way.
Tokens are inserted in the hash part of current URL (after the `#` sign).

When user will press 'back/forward' button in the browser, mnemonic will "recall" in what state the application was at that step, and notify your application 
via its `statechange` event, on which you should listen. You then can synchronize the application state in the event handler.

About events: Johnny.Mnemonic is a subclass of Ext.util.Observable, please refer to its documentation (see below) for details.   


PROPERTIES
==========

- `defaultToken`

As a special case, the empty hash value is always treated as "default token" and the very initial state of the application. 

Note: You don't need to call the `remember` method with the initial state - instead, supply it with this property.

- `hashFrom`

The string, referencing the target window, which `location` object mnemonic should examine. Can be either `'window'` or `'top'`. Default value is `'top'`, what should enable
the usage from iframes.

 
METHODS
=======

- `setup([readyFunc], [readyScope])`

Should be called once to initialize the mnemonic instance. Accept the optional callback and its scope, which will be called after the initialization completion.

This callback is the last place to subscribe on the `statechange` event - immediately after it, will be fired the 1st event, with the initial state of the application.


- `remember(token)`

Saves the passed `token` in the browser's history, making its available for 'back/forward' buttons. Also displays the token in the hash part of URL.

Note: To avoid creation of extra history step, the hash will not be modified for the initial state, when application was loaded with empty hash.


- `back()`

Equivalent of pressing "back" button in browser. Will switch the history on one step back and fire the `statechange` event with the according token.
You can also call `back` method of `history` object directly.

- `forward()`

Equivalent of pressing "forward" button in browser. Will switch the history on one step forward and fire the `statechange` event with the according token.
You can also call `forward` method of `history` object directly.


EVENTS
======

- `statechange(mnemonic, token)`

Will be fired with 2 parameters above. Application should listen on this event and synchronize its state according to received state token.

Note: This event will be also fired for the initial state of the application. So, generally, you shouldn't treat the initial state specially, just
define a correct synchronization handler. 

The last place to subscribe on this event is the callback passed to `setup`. Immediately after that callback execution, will be fired the event with the initial state.  


GETTING HELP
============

This extension is supported via github issues tracker: [http://github.com/SamuraiJack/Johnny-Mnemonic/issues](http://github.com/SamuraiJack/Johnny-Mnemonic/issues)

For general Joose questions you can also visit #joose on irc.freenode.org. 


SEE ALSO
========

[Documentation for Joose](http://joose.github.com/Joose/doc/html/Joose.html)

[Documentation for Ext.util.Observable class of ExtJS library](http://www.extjs.com/deploy/dev/docs/?class=Ext.util.Observable)

[Bridge from ExtJS to Joose](http://github.com/SamuraiJack/joosex-bridge-ext/tree/master)

[Dedicated to William Gibson](http://project.cyberpunk.ru/lib/johnny_mnemonic/)



BUGS
====

Currently, test suite can't be ran under Chrome - seems it doesn't allow manipulations with window's history from another window.
While pressing the 'back/forward' buttons manually, it works fine though.

All complex software has bugs lurking in it, and this module is no exception.

Please report any bugs through the web interface at [http://github.com/SamuraiJack/Johnny-Mnemonic/issues](http://github.com/SamuraiJack/Johnny-Mnemonic/issues)


AUTHORS
=======

Nickolay Platonov [nplatonov@cpan.org](mailto:nplatonov@cpan.org)



COPYRIGHT AND LICENSE
=====================

Copyright (c) 2009, Nickolay Platonov

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Nickolay Platonov nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 


*/
