StartTest(function(t) {
	
    t.plan(1)
    
    //==================================================================================================================================================================================
    t.diag("Starting test")
    
    
    var async1 = t.beginAsync()
    
    
    var firstRun = true
    
    run = function (mnemonic, window) {
        if (firstRun) {
            firstRun = false
            
            var location = window.location
            var history  = window.history
            
            t.pass("'setup' fired a callback")

            //==================================================================================================================================================================================
            t.diag("Remembering")
            
            mnemonic.remember(10)
            t.ok(location.hash == '#10', "Hash was correctly set after 'remember'")
            
            mnemonic.remember(20)
            t.ok(location.hash == '#20', "Hash was correctly set after 'remember'")
            
            mnemonic.remember(30)
            t.ok(location.hash == '#30', "Hash was correctly set after 'remember'")

            
            //==================================================================================================================================================================================
            t.diag("Recalling")
            
            history.back()
            
            mnemonic.on('statechange', function (mnemonic, token) {
                t.ok(token == '20', 'Correctly recalled previous state')
                t.ok(location.hash == '#20', " .. indeed")
                
                history.back()
                
                mnemonic.on('statechange', function (mnemonic, token) {
                    t.ok(token == '10', 'Correctly recalled previous state')
                    t.ok(location.hash == '#10', " .. indeed")

                    
                    history.forward()
                    
                    mnemonic.on('statechange', function (mnemonic, token) {
                        t.ok(token == '20', 'Correctly recalled next state')
                        t.ok(location.hash == '#20', " .. indeed")

                        
                        history.forward()
                        
                        mnemonic.on('statechange', function (mnemonic, token) {
                            t.ok(token == '30', 'Correctly recalled next state')
                            t.ok(location.hash == '#30', " .. indeed")
                            
                            t.endAsync(async1)
                            
                        }, this, { single : true })
                        
                    }, this, { single : true })
                    
                }, this, { single : true })
                
            }, this, { single : true })
        }
    }
    
    
    
//    var async1 = t.beginAsync()
//    
//    
//    use('Johnny.Mnemonic', function () {
//        
//        //==================================================================================================================================================================================
//        t.diag("Sanity")
//        
//        t.ok(Johnny.Mnemonic, "Johnny.Mnemonic is here")
//        
//        
//        //==================================================================================================================================================================================
//        t.diag("Instantiation")
//        
//        var mnemonic = new Johnny.Mnemonic({
//            hashFrom : 'window',
//            
//            defaultToken : '1'
//        })
//        
//        t.ok(mnemonic, "'Johnny.Mnemonic' was successfully instantiated")
//        
//        
//        //==================================================================================================================================================================================
//        t.diag("Setup")
//        
//        mnemonic.setup()
//        
//        t.endAsync(async1)
//    })
    
})