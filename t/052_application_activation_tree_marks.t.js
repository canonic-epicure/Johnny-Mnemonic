StartTest(function(t) {
	
    t.plan(37)
    
    var async0 = t.beginAsync()
    
    use([ 'App' ], function () {
        
        //==================================================================================================================================================================================
        t.diag("Sanity")
        
        t.ok(App.my, "App.my is here")
        

        //==================================================================================================================================================================================
        t.diag("Application setup")
        
        App.my.setup()
        
        var root = App.my.root
        
        t.ok(root, "Root widget was created")
        
        //==================================================================================================================================================================================
        t.diag("Application launch")
        
        var async1 = t.beginAsync()
        
        root.dispatch('/').next(function (context) {
            
            //==================================================================================================================================================================================
            t.diag("Steps tree structure")
            
            t.pass("'next' reached after dispatch")
            
            t.ok(context.stepsRoot.childSteps.length == 1, "Root step in '/' activation context has single child step - layout")
            
            
            var layout = context.stepsRoot.childSteps[0]
            
            t.ok(layout instanceof Symbie.Context.Step.Widget, 'And its a widget step')
            t.ok(layout.className == 'App.Layout.Site', '.. with the correct class')
            
            t.ok(layout.childSteps.length == 3, "Layout step in '/' activation context has 3 child steps - header/center/footer")
            
            Joose.A.each(layout.childSteps, function (step, index) {
                t.ok(step instanceof Symbie.Context.Step.Slot, 'All childs of layout step are slot steps #' + (index + 1))
                
                t.ok(step.childSteps.length == 1 && step.childSteps[0] instanceof Symbie.Context.Step.Widget, '.. they also have only a single child widget step #' + (index + 1))
            })
            
            t.ok(layout.childSteps[0].slotName == 'header', "1st child step of layout step is 'header' slot")
            t.ok(layout.childSteps[1].slotName == 'center', "2nd child step of layout step is 'center' slot")
            t.ok(layout.childSteps[2].slotName == 'footer', "3rd child step of layout step is 'footer' slot")
            
            
            t.ok(layout.childSteps[0].childSteps[0].className == 'App.Widget.Header', "1st leaf is an App.Widget.Header")
            t.ok(layout.childSteps[1].childSteps[0].className == 'App.Widget.Home', "2nd leaf is an App.Widget.Home")
            t.ok(layout.childSteps[2].childSteps[0].className == 'App.Widget.Footer', "3rd leaf is an App.Widget.Footer")

            
            //==================================================================================================================================================================================
            t.diag("Steps tree structure built with marks")
            
            root.dispatch('/home2').next(function (context2) {
                
                t.ok(context2 != context, 'Different context was instantiated')
                
                //==================================================================================================================================================================================
                t.diag("Steps tree structure")
                
                t.pass("'next' reached after dispatch")
                
                t.ok(context2.stepsRoot.childSteps.length == 1, "Root step in '/' activation context has single child step - layout")
                
                
                var layout = context2.stepsRoot.childSteps[0]
                
                t.ok(layout instanceof Symbie.Context.Step.Widget, 'And its a widget step')
                t.ok(layout.className == 'App.Layout.Site', '.. with the correct class')
                
                t.ok(layout.childSteps.length == 3, "Layout step in '/' activation context has 3 child steps - header/center/footer")
                
                Joose.A.each(layout.childSteps, function (step, index) {
                    t.ok(step instanceof Symbie.Context.Step.Slot, 'All childs of layout step are slot steps #' + (index + 1))
                    
                    t.ok(step.childSteps.length == 1 && step.childSteps[0] instanceof Symbie.Context.Step.Widget, '.. they also have only a single child widget step #' + (index + 1))
                })
                
                t.ok(layout.childSteps[0].slotName == 'header', "1st child step of layout step is 'header' slot")
                t.ok(layout.childSteps[1].slotName == 'center', "2nd child step of layout step is 'center' slot")
                t.ok(layout.childSteps[2].slotName == 'footer', "3rd child step of layout step is 'footer' slot")
                
                
                t.ok(layout.childSteps[0].childSteps[0].className == 'App.Widget.Header', "1st leaf is an App.Widget.Header")
                t.ok(layout.childSteps[1].childSteps[0].className == 'App.Widget.Home', "2nd leaf is an App.Widget.Home")
                t.ok(layout.childSteps[2].childSteps[0].className == 'App.Widget.Footer', "3rd leaf is an App.Widget.Footer")
                
                t.endAsync(async1)
            })
        
        
        })
        
        t.endAsync(async0)
    })
    
})