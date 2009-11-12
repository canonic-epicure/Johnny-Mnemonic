Class('Johnny.Mnemonic', {
    
    meta : JooseX.Bridge.Ext,
    
    isa : Ext.util.Observable,
    
    
    has : {
        iframe                  : null,
        iframeInUse             : false,
        
        defaultToken            : null,
        currentToken            : null,
        
        firstPass               : true,
        skipOnLoad              : null,
        
        hashRegex               : function () { 
            return /[^#]*(?:#(.*))?/ 
        }
    },
    
    
    after : {
        initialize : function () {
            this.addEvents('statechange')
        }
    },
    
    
    methods : {
        
        getHash : function () {
            return this.hashRegex.exec(top.location.href)[1]
        },
        
        
        checkHashUpdate : function () {
            var hash = this.getHash()
            
            if (hash != this.currentToken || this.firstPass) this.setCurrentToken(hash)
            
            this.firstPass = false
        },
        
        
        setupIE : function () {
            this.iframeInUse = true
            this.firstPass = false
            
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
        
        
        setup : function () {
            if (Ext.isIE) 
                this.setupIE()
            else
                this.setupNormalBrowser()
            
            if (Ext.isIE8)
                window.attachEvent('onhashchange', this.checkHashUpdate.createDelegate(this));
            else
                setInterval(this.checkHashUpdate.createDelegate(this), 50)
        },
        
        
        onIframeLoad : function () {
            
            if (this.skipOnLoad) {
                this.skipOnLoad = false
                
                return
            }
            
            var token = this.iframe.dom.contentWindow.document.body.innerText
            
            var isFromHistory = true
            
            if (!token) {
                token = this.getHash() || this.defaultToken
                
                isFromHistory = false
            }
            
            this.setCurrentToken(token, isFromHistory)
        },
        
        
        updateIframe : function (token) {
            this.skipOnLoad = true
            
            var doc = this.iframe.dom.contentWindow.document
            
            doc.open()
            doc.write('<html><body>' + token + '</body></html>')
            doc.close()
        },
        
        
        
        remember : function (token, isFromHistory) {
            this.currentToken = token
            
            if (this.iframeInUse && !isFromHistory) this.updateIframe(token)
            
            if (!this.firstPass) location.hash = token == null ? '' : token
        },
        
        
        getCurrentToken : function () {
            return this.currentToken || this.defaultToken
        },
        
        
        setCurrentToken : function (token, isFromHistory) {
            this.remember(token, isFromHistory)
            
            this.fireEvent('statechange', this, this.getCurrentToken())
        }
    }

})
