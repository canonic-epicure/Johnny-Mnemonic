StartTest(function(t) {
	
    t.plan(1)
    
    var async1 = t.beginAsync()
    
    use('Johnny.Mnemonic', function () {
        
        //==================================================================================================================================================================================
        t.diag("Sanity")
        
        t.ok(Johnny.Mnemonic, "Johnny.Mnemonic is here")
        
        
        //==================================================================================================================================================================================
        t.diag("Instantiation on simple route")
        
        var route = new Symbie.Meta.Route({
            mapTo : '/home'
        })
        
        t.ok(route, "'Symbie.Meta.Route' was successfully instantiated")
        
        t.ok(route.tokens.length == 2, "Route has 2 tokens")
        t.ok(route.tokens[0] instanceof Symbie.Meta.Route.Token.Root, "The 1st token is a root token")
        t.ok(route.tokens[1] instanceof Symbie.Meta.Route.Token.String, "The 2nd token is a string token")

        t.ok(route.tokens[0].token == '', "The value of the root token is empty string")
        t.ok(route.tokens[1].token == 'home', "The value of the 2nd token is correct")
        
        //==================================================================================================================================================================================
        t.diag("Index route")
        
        var index = new Symbie.Meta.Route({
            mapTo : '/'
        })
        
        t.ok(index, "'Symbie.Meta.Route' was successfully instantiated")
        
        t.ok(index.tokens.length == 2, "Route has 2 tokens")
        t.ok(index.tokens[0] instanceof Symbie.Meta.Route.Token.Root, "The 1st token is a root token")
        t.ok(index.tokens[1] instanceof Symbie.Meta.Route.Token.String, "The 2nd token is a string token")
        
        t.ok(index.tokens[0].token == '', "The value of the root token is empty string")
        t.ok(index.tokens[1].token == '', "The value of the 2nd token is empty string also")
        
        //==================================================================================================================================================================================
        t.diag("Route with parameter")
        
        var param = new Symbie.Meta.Route({
            mapTo : '/pictures/all/:fromDate/:toDate',
            
            where : {
                fromDate    : /\d\d-\d\d-\d{4}/
            }
        })
        
        t.ok(param, "'Symbie.Meta.Route' was successfully instantiated")
        
        t.ok(param.tokens.length == 5, "Route has 5 tokens")
        t.ok(param.tokens[0] instanceof Symbie.Meta.Route.Token.Root, "The 1st token is a root token")
        t.ok(param.tokens[1] instanceof Symbie.Meta.Route.Token.String, "The 2nd token is a string token")
        t.ok(param.tokens[2] instanceof Symbie.Meta.Route.Token.String, "The 3rd token is a string token")
        t.ok(param.tokens[3] instanceof Symbie.Meta.Route.Token.Parameter, "The 4th token is a parameter token")
        t.ok(param.tokens[4] instanceof Symbie.Meta.Route.Token.Parameter, "The 5th token is a parameter token")
        
        t.ok(param.tokens[3].token == ':fromDate', "The value of the 4th token is correct")
        t.ok(param.tokens[3].regex.source == '\\d\\d-\\d\\d-\\d{4}', "The value of the regex of the 4th token is correct")
        
        t.ok(param.tokens[4].token == ':toDate', "The value of the 5th token is correct")
        t.ok(param.tokens[4].regex.source == '(.*)', "The regex of the 5th has default value")
        
        t.endAsync(async1)
    })
    
})