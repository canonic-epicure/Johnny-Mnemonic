StartTest(function(t) {
	
    t.plan(1)
    
    var async1 = t.beginAsync()
    
    
    onStateChange = function (token) {
        t.pass('onstate reached')
        
        t.endAsync(async1)
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