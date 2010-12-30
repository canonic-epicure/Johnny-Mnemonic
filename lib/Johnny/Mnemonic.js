Class('Johnny.Mnemonic', {
    
    does : 'JooseX.Observable',
    
    
    has : {
        iframe                  : null,
        iframeInUse             : false,
        
        defaultToken            : null,
        currentToken            : null,
        currentTokenSet         : false,
        
        skipOnLoad              : null,
        
        hashRegex               : /[^#]*(?:#\!?(.*))?/, 
        
        hashFrom                : 'top',
        
        readyFunc               : null,
        readyScope              : null,
        firstNotify             : true,
        
        exclamation             : true
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
        
        
        createDelegate : function (func, scope) {
            return function () {
                return func.call(scope)
            }
        },
        
        
        setupIE : function () {
            this.iframeInUse = true
            
            var iframe = this.iframe = document.createElement('iframe')
            
            iframe.style.display = 'none'
            
            iframe.attachEvent('onload', this.createDelegate(this.onIframeLoad, this))
            
            iframe.src = "about:blank"
            
            document.body.appendChild(iframe)
        },
        
        
        setupNormalBrowser : function () {
            //some hack for Opera
            if (history.navigationMode) history.navigationMode = 'compatible'
            
            this.checkHashUpdate()
        },
        
        
        isIE8 : function () {
            var userAgent       = navigator.userAgent
            var documentMode    = document.documentMode
            
            return Joose.is_IE && /msie 8/.test(userAgent) && documentMode != 7
        },
        
        
        setup : function (readyFunc, readyScope) {
            if (readyFunc) this.on('ready', readyFunc, readyScope, { single : true })
            
            if (Joose.is_IE) 
                this.setupIE()
            else
                this.setupNormalBrowser()
            
            var hashUpdateHandler = this.createDelegate(this.checkHashUpdate, this)
            
            if (this.isIE8())
                window[this.hashFrom].attachEvent('onhashchange', hashUpdateHandler)
            else
                setInterval(hashUpdateHandler, 50)
        },
        
        
        onIframeLoad : function () {
            
            if (this.skipOnLoad) {
                this.skipOnLoad = false
                
                return
            }
            
            var token = this.iframe.contentWindow.document.body.innerText
            
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
            
            var doc = this.iframe.contentWindow.document
            
            doc.open()
            doc.write('<html><body>' + token + '</body></html>')
            doc.close()
        },
        
        
        shallowTokenUpdate : function (token) {
            this.currentToken       = token
            this.currentTokenSet    = true
            
            //only update hash if it make sense
            if ((token == null || token == this.defaultToken) && this.getHash() == null) return
            
            window[this.hashFrom].location.hash = (this.exclamation ? '!' : '') + (token || '')
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
                
                this.fireEvent('ready')
            }
            
            this.fireEvent('statechange', this.getCurrentToken())
        }
    }

})
