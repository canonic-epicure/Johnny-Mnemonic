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
            if ((token == null || token == this.defaultToken) && this.getHash() == null) return
            
            token = token || ''
            
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
