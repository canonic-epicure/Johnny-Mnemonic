StartTest(function(t) {
	
    t.plan(18)
    
    //==================================================================================================================================================================================
    t.diag("Starting test")
    
    
    var async1 = t.beginAsync(20000)
    
    
    var firstRun = true
    var continueFrom = null
    var currentMnemonic = null
    var testLocation = null
    var testHistory = null
    
    var doTestQueue = []
    
    var doTestAction = function () {
        var params = doTestQueue.shift()
        
        if (!params) return
        
        var action  = params.action
        var test    = params.test
        
        var response = function (mnemonic, token) {
            continueFrom = null
            
            test(token)
            
            doTestAction()
        }
        
        
        currentMnemonic.on('statechange', response, this, { single : true })
        
        var mnemonicCopy = currentMnemonic
        continueFrom = function (mnemonic, token) {
            mnemonicCopy.un('statechange', response, this, { single : true })
            response(mnemonic, token)
        }
        
        action()
    }
    
    var testAction = function (params) {
        doTestQueue.push(params)
    }
    
    
    run = function (mnemonic, testWindow) {
        currentMnemonic = mnemonic
        
        testLocation = testWindow.location
        testHistory  = testWindow.history
            
        if (firstRun) {
            firstRun = false
            
            //==================================================================================================================================================================================
            t.diag("Initialization")
            
            
            t.pass("'setup' fired a callback")

            mnemonic.on('statechange', function (mnemonic, token) {
                
                t.ok(token == '1', "The very 1st 'statechange' event is with default token")
                
                t.diag(testLocation.hash)
                t.ok(testLocation.hash == '', " and hash is empty")
                
                //==================================================================================================================================================================================
                t.diag("Remembering")
                
                mnemonic.remember(10)
                t.ok(testLocation.hash == '#10', "Hash was correctly set after 'remember'")
                
                mnemonic.remember(20)
                t.ok(testLocation.hash == '#20', "Hash was correctly set after 'remember'")
                
                mnemonic.remember(30)
                t.ok(testLocation.hash == '#30', "Hash was correctly set after 'remember'")
    
                
                //==================================================================================================================================================================================
                t.diag("Recalling")
                
                testAction({
                    action : function () {
                        testHistory.back()
                    },
                    
                    test : function (token) {
                        t.ok(token == '20', 'Correctly recalled previous state - 20')
                        t.ok(testLocation.hash == '#20', " .. indeed")
                    }
                })
                

                testAction({
                    action : function () {
                        testHistory.back()
                    },
                    
                    test : function (token) {
                        t.ok(token == '10', 'Correctly recalled previous state - 10')
                        t.ok(testLocation.hash == '#10', " .. indeed")
                    }
                })
                
                
                testAction({
                    action : function () {
                        testHistory.back()
                    },
                    
                    test : function (token) {
                        t.ok(token == '1', 'Correctly recalled previous state - 1')
                        
                        t.ok(testLocation.hash == '' || testLocation.hash == '#', " .. and its hash is empty")
                    }
                })
                
                
                testAction({
                    action : function () {
                        testHistory.forward()
                    },
                    
                    test : function (token) {
                        t.ok(token == '10', 'Correctly recalled next state - 10')
                        t.ok(testLocation.hash == '#10', " .. indeed")
                    }
                })

                
                testAction({
                    action : function () {
                        testHistory.forward()
                    },
                    
                    test : function (token) {
                        t.ok(token == '20', 'Correctly recalled next state - 20')
                        t.ok(testLocation.hash == '#20', " .. indeed")
                    }
                })

                
                testAction({
                    action : function () {
                        testHistory.forward()
                    },
                    
                    test : function (token) {
                        t.ok(token == '30', 'Correctly recalled next state - 30')
                        t.ok(testLocation.hash == '#30', " .. indeed")
                        
                        t.endAsync(async1)
                    }
                })
                
                doTestAction()
                
            }, this, { single : true })
                
        } else
            continueFrom(mnemonic, mnemonic.getCurrentToken())
    }
    
})