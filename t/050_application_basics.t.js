StartTest(function(t) {
	
    t.plan(58)
    
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
        t.ok(root.ID, "Root widget has an ID")
        t.ok(root.router, "Root widget has a router")
        
        
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
            t.diag("Ext.Container hierarchy and DOM")
            
            //App.Site.Layout
            
            t.ok(root.items.getCount() == 1, "Items of 'root' have a single child container")
            
            var siteLayout = root.items.itemAt(0)
            
            t.ok(siteLayout && siteLayout instanceof App.Layout.Site, ".. which is a site layout")
            t.ok(siteLayout.rendered, ".. and which was rendered")
            
            
            t.ok(siteLayout.items.getCount() == 3, "Items of 'siteLayout' have a 3 child containers")
            
            
            //App.Widget.Header
            
            var header = siteLayout.slots.header.items.itemAt(0)
            
            t.ok(header && header instanceof App.Widget.Header, "Site layout have 'header' widget where expected")
            t.ok(!header.items || !header.items.getCount(), "Header have no child elements")
            t.ok(header.rendered, "Header was rendered")
            t.ok(header.ID, "Header has an ID")
            t.ok(header.getEl().dom, "Header has a DOM element")
            

            //App.Widget.Home
            
            var home = siteLayout.slots.center.items.itemAt(0)
            
            t.ok(home && home instanceof App.Widget.Home, "Site layout have 'home' widget where expected")
            t.ok(!home.items || !home.items.getCount(), "Home have no child elements")
            t.ok(home.rendered, "Home was rendered")
            t.ok(home.ID, "Home has an ID")
            t.ok(home.getEl().dom, "Home has a DOM element")
            
            t.ok(siteLayout.slots.center.getLayout().activeItem == home, "Active item in 'center' slot is Home widget")
            
            //App.Widget.Footer
            
            var footer = siteLayout.slots.footer.items.itemAt(0)
            
            t.ok(footer && footer instanceof App.Widget.Footer, "Site layout have 'footer' widget where expected")
            t.ok(!footer.items || !footer.items.getCount(), "Footer have no child elements")
            t.ok(footer.rendered, "Footer was rendered")
            t.ok(footer.ID, "Footer has an ID")
            t.ok(footer.getEl().dom, "Footer has a DOM element")
            
            //==================================================================================================================================================================================
            t.diag("Redispatch")
            
            
            root.dispatch('/').next(function (context1) {
                
                t.ok(context1 != context, 'Different context was instantiated')
                
                //==================================================================================================================================================================================
                t.diag("Ext.Container hierarchy after redispacth - no additional elements should appear")
                
                
                //App.Site.Layout

                t.ok(root.items.getCount() == 1, "Items of 'root' have a single child container")
                
                var siteLayout1 = root.items.itemAt(0)
                
                t.ok(siteLayout1 && siteLayout1 instanceof App.Layout.Site, ".. which is a site layout")
                t.ok(siteLayout1.rendered, ".. and which was rendered")
                
                
                t.ok(siteLayout1.items.getCount() == 3, "Items of 'siteLayout1' have a 3 child containers")
                
                
                //App.Widget.Header
                
                var header1 = siteLayout1.slots.header.items.itemAt(0)
                
                t.ok(header1 && header1 instanceof App.Widget.Header, "Site layout have 'header1' widget where expected")
                t.ok(!header1.items || !header1.items.getCount(), "Header have no child elements")
                
                t.ok(header1 == header, "Header is still the same object")
                t.ok(header1.getEl().dom == header.getEl().dom, "Header still has the same DOM element")
                
    
                //App.Widget.Home
                
                var home1 = siteLayout1.slots.center.items.itemAt(0)
                
                t.ok(home1 && home1 instanceof App.Widget.Home, "Site layout have 'home1' widget where expected")
                t.ok(!home1.items || !home1.items.getCount(), "Home have no child elements")
                
                t.ok(home1 == home, "Home is still the same object")
                t.ok(home1.getEl().dom == home.getEl().dom, "Home still has the same DOM element")
                
                
                //App.Widget.Footer
                
                var footer1 = siteLayout1.slots.footer.items.itemAt(0)
                
                t.ok(footer1 && footer1 instanceof App.Widget.Footer, "Site layout have 'footer1' widget where expected")
                t.ok(!footer1.items || !footer1.items.getCount(), "Footer have no child elements")
                
                t.ok(footer1 == footer, "Footer is still the same object")
                t.ok(footer1.getEl().dom == footer.getEl().dom, "Footer still has the same DOM element")
                
                
                t.endAsync(async1)
            })
        })
        
        t.endAsync(async0)
    })
    
})