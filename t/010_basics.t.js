StartTest(function(t) {
	
    t.plan(36)
    
    //==================================================================================================================================================================================
    t.diag("Starting test")
    
    var async1 = t.beginAsync(50000)
    
    
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
                t.diag("Remembering - moving forward")
                
                mnemonic.remember(10)
                t.ok(testLocation.hash == '#10', "Hash was correctly set after 'remember'")
                
                mnemonic.remember(20)
                t.ok(testLocation.hash == '#20', "Hash was correctly set after 'remember'")
                
                mnemonic.remember(30)
                t.ok(testLocation.hash == '#30', "Hash was correctly set after 'remember'")
    
                
                testAction({
                    action : function () {
                        //==================================================================================================================================================================================
                        t.diag("Recalling - moving back")
                        
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
                        //==================================================================================================================================================================================
                        t.diag("Recalling - moving forward again")
                        
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
                        //==================================================================================================================================================================================
                        t.diag("Leaving current page")
                        
                        testWindow.location.href = '/jsan/Test/Run/static/stub.html'
                        
                        setTimeout(function () {
                            
                            //==================================================================================================================================================================================
                            t.diag("On the outer page")
                        
                            testLocation = testWindow.location
                            testHistory  = testWindow.history
                            
                            t.ok(testLocation.hash == '', "Stub page was loaded - no hash on it")
                            t.ok(testLocation.href.indexOf('/jsan/Test/Run/static/stub.html') != -1, "Stub page was loaded - url is correct")
                            
                            testAction({
                                action : function () {
                                    //==================================================================================================================================================================================
                                    t.diag("On the outer page - go back")
                                    
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
                                    //==================================================================================================================================================================================
                                    t.diag("To the outer page again")
                                    
                                    testHistory.go(1)
                                    
                                    setTimeout(function () {
                                        
                                        testLocation = testWindow.location
                                        testHistory  = testWindow.history
                                        
                                        t.ok(testLocation.hash == '', "Stub page was loaded - no hash on it")
                                        t.ok(testLocation.href.indexOf('/jsan/Test/Run/static/stub.html') != -1, "Stub page was loaded - url is correct")
                                        
                                        //==================================================================================================================================================================================
                                        t.diag("Back from outer page again")
                                        
                                        testAction({
                                            action : function () {
                                                //==================================================================================================================================================================================
                                                t.diag("On the outer page - go back")
                                                
                                                testHistory.go(-1)
                                            },
                                            
                                            test : function (token) {
                                                t.ok(token == '30', 'Correctly recalled previous state - 30')
                                                t.ok(testLocation.hash == '#30', " .. indeed")
                                            }
                                        })
                                        
                                        
                                        testAction({
                                            action : function () {
                                                //==================================================================================================================================================================================
                                                t.diag("Manual entering URL")
                                                
                                                testWindow.location.hash = '100'
                                            },
                                            
                                            test : function (token) {
                                                t.ok(token == '100', 'Correctly moved to manually entered state - 100')
                                                t.ok(testLocation.hash == '#100', " .. indeed")
                                            }
                                        })
                                        
                                        
                                        testAction({
                                            action : function () {
                                                //==================================================================================================================================================================================
                                                t.diag("Back from manual entered URL")
                                                
                                                testHistory.go(-1)
                                            },
                                            
                                            test : function (token) {
                                                t.ok(token == '30', 'Correctly recalled previous state - 30')
                                                t.ok(testLocation.hash == '#30', " .. indeed")
                                            }
                                        })
                                        
                                        testAction({
                                            action : function () {
                                                //==================================================================================================================================================================================
                                                t.diag("Forward to manually entered URL")
                                                
                                                testHistory.go(1)
                                            },
                                            
                                            test : function (token) {
                                                t.ok(token == '100', 'Correctly moved to manually entered state - 100')
                                                t.ok(testLocation.hash == '#100', " .. indeed")
                                                
                                                t.endAsync(async1)
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