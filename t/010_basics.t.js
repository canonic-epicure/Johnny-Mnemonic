StartTest(function(t) {
	
    t.plan(1)
    
    //==================================================================================================================================================================================
    t.diag("Starting test")
    
    
    var async1 = t.beginAsync(20000)
    
    
    var firstRun = true
    var continueFrom = null
    var currentMnemonic = null
    var testLocation = null
    var testHistory = null
    
    
    var testAction = function (params) {
        var action  = params.action
        var test    = params.test
        
        var response = function () {
            continueFrom = null
            
            test()
            
            
        }
        
        
        currentMnemonic.on('statechange', response, this, { single : true })
        continueFrom = response
        
        action()
        
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
                    
                    test : function (token, cont) {
                        t.ok(token == '20', 'Correctly recalled previous state - 20')
                        t.ok(testLocation.hash == '#20', " .. indeed")
                        
                        cont()
                    }
                })
                
                
                
                mnemonic.on('statechange', function (mnemonic, token) {
                    t.ok(token == '20', 'Correctly recalled previous state - 20')
                    t.ok(testLocation.hash == '#20', " .. indeed")

                    
                    mnemonic.on('statechange', function (mnemonic, token) {
                        t.ok(token == '10', 'Correctly recalled previous state - 10')
                        t.ok(testLocation.hash == '#10', " .. indeed")
    
                        
                        mnemonic.on('statechange', function (mnemonic, token) {
                            t.ok(token == '1', 'Correctly recalled initial state - 1')
                            t.ok(testLocation.hash == '', " .. and its hash is empty")
                        
                            
                            mnemonic.on('statechange', function (mnemonic, token) {
                                t.ok(token == '10', 'Correctly recalled next state - 10')
                                t.ok(testLocation.hash == '#10', " .. indeed")
        
                                
                                mnemonic.on('statechange', function (mnemonic, token) {
                                    t.ok(token == '20', 'Correctly recalled next state - 20')
                                    t.ok(testLocation.hash == '#20', " .. indeed")
                                    
                                    
                                    mnemonic.on('statechange', function (mnemonic, token) {
                                        t.ok(token == '30', 'Correctly recalled next state - 30')
                                        t.ok(testLocation.hash == '#30', " .. indeed")
                                        
                                        t.endAsync(async1)
                                        
                                    }, this, { single : true })
                                    
                                    testHistory.forward()
                                    
                                }, this, { single : true })
                                
                                testHistory.forward()
                                
                            }, this, { single : true })
                            
                            testHistory.forward()
                            
                        }, this, { single : true })
                        
                        testHistory.back()
                        
                    }, this, { single : true })
                    
                    testHistory.back()
                    
                }, this, { single : true })
                
                testHistory.back()
                
            }, this, { single : true })
                
        } else
            continueFrom()
    }
    
})