StartTest(function(t) {
	
    t.plan(12)
    
    //==================================================================================================================================================================================
    t.diag("Starting test")
    
    
    var async1 = t.beginAsync()
    
    
    var firstRun = true
    
    run = function (mnemonic, testWindow) {
        if (firstRun) {
            firstRun = false
            
            var testLocation = testWindow.location
            var testHistory  = testWindow.history
            
            t.pass("'setup' fired a callback")

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
            
            testHistory.back()
            
            mnemonic.on('statechange', function (mnemonic, token) {
                t.ok(token == '20', 'Correctly recalled previous state')
                t.ok(testLocation.hash == '#20', " .. indeed")
                
                testHistory.back()
                
                mnemonic.on('statechange', function (mnemonic, token) {
                    t.ok(token == '10', 'Correctly recalled previous state')
                    t.ok(testLocation.hash == '#10', " .. indeed")

                    
                    testHistory.forward()
                    
                    mnemonic.on('statechange', function (mnemonic, token) {
                        t.ok(token == '20', 'Correctly recalled next state')
                        t.ok(testLocation.hash == '#20', " .. indeed")

                        
                        testHistory.forward()
                        
                        mnemonic.on('statechange', function (mnemonic, token) {
                            t.ok(token == '30', 'Correctly recalled next state')
                            t.ok(testLocation.hash == '#30', " .. indeed")
                            
                            t.endAsync(async1)
                            
                        }, this, { single : true })
                        
                    }, this, { single : true })
                    
                }, this, { single : true })
                
            }, this, { single : true })
        }
    }
    
})