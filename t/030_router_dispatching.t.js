StartTest(function(t) {
	
    t.plan(16)
    
    var async1 = t.beginAsync()
    
    use('Symbie.Router', function () {
        
        //==================================================================================================================================================================================
        t.diag("Sanity")
        
        t.ok(Symbie.Router, "Symbie.Router is here")
        
        //==================================================================================================================================================================================
        t.diag("Class creation")
        
        
        Class('App.Router', {
            
            isa : 'Symbie.Router',
            
            
            routes : {
                
                home : {
                    mapTo : '/home',
                    
                    via : function (context) {
                        t.pass("'home' context was reached")
                    } 
                },
                
                
                allPictures : {
                    mapTo : '/pictures/all/:fromDate/:toDate',
                    
                    where : {
                        fromDate    : /\d\d-\d\d-\d{4}/,
                        toDate      : /.*/
                    },
                    
                    via : function (context) {
                        t.pass("'allPictures' context was reached")
                    }
                },
                
                
                picture : {
                    mapTo : '/pictures/:id',
                    
                    where : {
                        id    : /\d+/
                    },
                    
                    via : function (context) {
                    }
                },
                
                
                editPicture : {
                    mapTo : '/pictures/:id/edit',
                    
                    where : {
                        id    : /\d+/
                    },
                    
                    via : function (context) {
                    }
                },
                
                
                editWiki : {
                    mapTo : '/wiki/edit',
                    
                    via : function (context) {
                    }
                },
                
                
                wikiPage : {
                    mapTo : '/wiki/:page',
                    
                    where : {
                        page    : /\d+/
                    },
                    
                    via : function (context) {
                    }
                },
                
                
                wiki : {
                    mapTo : '/wiki/*',
                    
                    via : function (context) {
                    }
                },
                
                
                index : {
                    mapTo : '/',
                    
                    via : function (context) {
                    }
                }
                
            }
            //eof routes
        })
        
        t.ok(App.Router, "App.Router is here")
        
        
        //==================================================================================================================================================================================
        t.diag("Instantiation")
        
        var router = new App.Router({
            root : new Ext.Container()
        })
        
        t.ok(router, "'App.Router' was successfully instantiated")

        
        //==================================================================================================================================================================================
        t.diag("Dispatching with nested error")
        
        var async2 = t.beginAsync()
        
        router.dispatch('/foo/bar').then(function () {
            
            t.fail("'THEN' reached after exception")
        
        }).except(function (e) {
            
            t.pass("'CATCH' reached after wrong dispatch")
            
            t.like(e + '', 'mapped to abstract route', "Exception value is correct")
            
            t.endAsync(async2)
            
        }).now()
        
        
        //==================================================================================================================================================================================
        t.diag("Dispatching #1")
        
        var async3 = t.beginAsync()
        
        router.dispatch('/home').then(function (context) {
            
            t.pass("'then' after '/home' route was reached")
            
            t.ok(context instanceof Symbie.Context, "'then' received with the instance of context created")
            
            t.endAsync(async3)
            
        }).now()
        
        
        //==================================================================================================================================================================================
        t.diag("Dispatching with the following error")
        
        var async4 = t.beginAsync()
        
        router.dispatch('/home').then(function () {
            
            t.pass("'THEN' reached after exception")
            
            throw "error"
        
        }).except(function (e) {
            
            t.pass("'CATCH' reached after throwed exception")
            
            t.ok(e == 'error', "Exception value is correct")
            
            this.CONTINUE()
            
        }).ensure(function () {
            
            t.pass("'FINALLY' was reached after throwed exception")
            
            t.endAsync(async4)
            
        }).now()
        
        
        //==================================================================================================================================================================================
        t.diag("Dispatching #2")
        
        var async5 = t.beginAsync()
        
        router.dispatch('/pictures/all/12-34-1234/56-78-5678').then(function () {
            
            t.pass("'then' after '/pictures/all/12-34-1234/56-78-5678' route was reached")
            
            this.CONTINUE()
            
        }).ensure(function () {
            
            t.pass("'FINALLY' was reached without exceptions")
            
            t.endAsync(async5)
            
        }).now()
        
        
        t.endAsync(async1)
    })
    
})