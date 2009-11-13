StartTest(function(t) {
	
    t.plan(28)
    
    //==================================================================================================================================================================================
    t.diag("Starting test")
    
    var async1 = t.beginAsync(35000)
    
    
    var firstRun = true
    var testLocation = null
    var testHistory = null
    
    var doTestQueue = []
    
    var doTestAction = function () {
        var params = doTestQueue.shift()
        
        if (!params) return
        
        var action  = params.action
        var test    = params.test
        
        var response = function (mnemonic, token) {
            test(token)
            
            doTestAction()
        }
        
        onStateChange = response
        
        action()
    }
    
    var testAction = function (params) {
        doTestQueue.push(params)
    }
    
    
    run = function (mnemonic, testWindow) {
        testLocation = testWindow.location
        testHistory  = testWindow.history
            
        if (firstRun) {
            firstRun = false
            
            //==================================================================================================================================================================================
            t.diag("Initialization")
            
            
            t.pass("'setup' fired a callback")

            onStateChange = function (mnemonic, token) {
                
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
                        testHistory.go(-1)
                    },
                    
                    test : function (token) {
                        t.ok(token == '20', 'Correctly recalled previous state - 20')
                        t.ok(testLocation.hash == '#20', " .. indeed")
                    }
                })
                

                testAction({
                    action : function () {
                        testHistory.go(-1)
                    },
                    
                    test : function (token) {
                        t.ok(token == '10', 'Correctly recalled previous state - 10')
                        t.ok(testLocation.hash == '#10', " .. indeed")
                    }
                })
                
                
                testAction({
                    action : function () {
                        testHistory.go(-1)
                    },
                    
                    test : function (token) {
                        t.ok(token == '1', 'Correctly recalled previous state - 1')
                        
                        t.ok(testLocation.hash == '' || testLocation.hash == '#', " .. and its hash is empty")
                    }
                })
                
                
                testAction({
                    action : function () {
                        testHistory.go(1)
                    },
                    
                    test : function (token) {
                        t.ok(token == '10', 'Correctly recalled next state - 10')
                        t.ok(testLocation.hash == '#10', " .. indeed")
                    }
                })

                
                testAction({
                    action : function () {
                        testHistory.go(1)
                    },
                    
                    test : function (token) {
                        t.ok(token == '20', 'Correctly recalled next state - 20')
                        t.ok(testLocation.hash == '#20', " .. indeed")
                    }
                })

                
                testAction({
                    action : function () {
                        testHistory.go(1)
                    },
                    
                    test : function (token) {
                        t.ok(token == '30', 'Correctly recalled next state - 30')
                        t.ok(testLocation.hash == '#30', " .. indeed")
                    }
                })
                
                
                testAction({
                    action : function () {
                        testWindow.location.href = '/jsan/Test/Run/static/stub.html'
                        
                        setTimeout(function () {
                            
                            testLocation = testWindow.location
                            testHistory  = testWindow.history
                            
                            t.ok(testLocation.hash == '', "Stub page was loaded - no hash on it")
                            t.ok(testLocation.href.indexOf('/jsan/Test/Run/static/stub.html') != -1, "Stub page was loaded - url is correct")
                            
                            testAction({
                                action : function () {
                                    testHistory.go(-1)
                                },
                                
                                test : function (token) {
                                    t.ok(token == '30', 'Correctly recalled previous state - 30')
                                    t.ok(testLocation.hash == '#30', " .. indeed")
                                }
                            })
                            
                            testAction({
                                action : function () {
                                    testHistory.go(-1)
                                },
                                
                                test : function (token) {
                                    t.ok(token == '20', 'Correctly recalled previous state - 20')
                                    t.ok(testLocation.hash == '#20', " .. indeed")
                                }
                            })
                            
                            testAction({
                                action : function () {
                                    testHistory.go(1)
                                },
                                
                                test : function (token) {
                                    t.ok(token == '30', 'Correctly recalled next state - 30')
                                    t.ok(testLocation.hash == '#30', " .. indeed")
                                }
                            })

                            
                            testAction({
                                action : function () {
                                    testHistory.go(1)
                                    
                                    setTimeout(function () {
                                        
                                        testLocation = testWindow.location
                                        testHistory  = testWindow.history
                                        
                                        t.ok(testLocation.hash == '', "Stub page was loaded - no hash on it")
                                        t.ok(testLocation.href.indexOf('/jsan/Test/Run/static/stub.html') != -1, "Stub page was loaded - url is correct")
                                        
                                        t.endAsync(async1)
                                    }, 1000)
                                },
                                
                                test : function (token) {
                                    t.fail('Test action reach for outer page')
                                }
                            })
                            
                            
                            doTestAction()
                            
                        }, 1000)
                    },
                    
                    test : function (token) {
                        t.fail('Test action reach for outer page')
                    }
                })
                
                doTestAction()
                
            }
                
        }
    }
    
})