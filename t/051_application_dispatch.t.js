StartTest(function(t) {
	
    t.plan(35)
    
    var async0 = t.beginAsync()
    
    use([ 'App' ], function () {
        
        //==================================================================================================================================================================================
        t.diag("Sanity")
        
        t.ok(App.my, "App.my is here")
        

        //==================================================================================================================================================================================
        t.diag("Application setup")
        
        App.my.setup()
        
        var root = App.my.root
        

        //==================================================================================================================================================================================
        t.diag("Application launch")
        
        var async1 = t.beginAsync()
        
        root.dispatch('/').next(function (context) {
            
            //==================================================================================================================================================================================
            t.diag("Ext.Container hierarchy after dispacth")
                
                
            t.ok(root.items.getCount() == 1, "Items of 'root' have a single child container")
            
            //App.Site.Layout
            
            var siteLayout = root.items.itemAt(0)
            
            t.ok(siteLayout && siteLayout instanceof App.Layout.Site, ".. which is a site layout")
            t.ok(siteLayout.items.getCount() == 3, "Items of 'siteLayout' have a 3 child containers")
            
            //App.Widget.Header
            
            var header = siteLayout.slots.header.items.itemAt(0)
            
            t.ok(header && header instanceof App.Widget.Header, "Site layout have 'header' widget where expected")
            t.ok(!header.items || !header.items.getCount(), "Header have no child elements")

            
            //App.Widget.Home
            
            var home = siteLayout.slots.center.items.itemAt(0)
            
            t.ok(home && home instanceof App.Widget.Home, "Site layout have 'home' widget where expected")
            t.ok(!home.items || !home.items.getCount(), "Home have no child elements")
            
            t.ok(siteLayout.slots.center.getLayout().activeItem == home, "Active item in 'center' slot is Home widget")
            
            
            //App.Widget.Footer
            
            var footer = siteLayout.slots.footer.items.itemAt(0)
            
            t.ok(footer && footer instanceof App.Widget.Footer, "Site layout have 'footer' widget where expected")
            t.ok(!footer.items || !footer.items.getCount(), "Footer have no child elements")

            
            
            //==================================================================================================================================================================================
            t.diag("Switching widget in center")
            
            root.dispatch('/sample').next(function (context) {
                
                //==================================================================================================================================================================================
                t.diag("Ext.Container hierarchy after switching")
            
                t.ok(root.items.getCount() == 1, "Items of 'root' have a single child container")
                
                var siteLayout1 = root.items.itemAt(0)
                
                t.ok(siteLayout1 == siteLayout, 'Site layout object is the same')
                t.ok(siteLayout1.items.getCount() == 3, "Items of 'siteLayout1' have a 3 child containers")

                
                //App.Widget.Header
                
                var header1 = siteLayout1.slots.header.items.itemAt(0)
                
                t.ok(header1 == header, 'Header widget object is the same')
                t.ok(!header1.items || !header1.items.getCount(), "Header have no child elements")
    
                
                //App.Widget.Home
                
                var home1 = siteLayout1.slots.center.items.itemAt(0)
                
                t.ok(home1 == home, 'Home widget object is the same')
                t.ok(!home1.items || !home.items.getCount(), "Home have no child elements")
                
                
                //App.Widget.Sample
                
                var sample = siteLayout1.slots.center.items.itemAt(1)
                
                t.ok(sample && sample instanceof App.Widget.Sample, "Site layout have 'sample' widget where expected")
                t.ok(!sample.items || !sample.items.getCount(), "Sample widget have no child elements")
                
                
                t.ok(siteLayout1.slots.center.getLayout().activeItem == sample, "Active item in 'center' slot is Sample widget")
                
                
                //App.Widget.Footer
                
                var footer1 = siteLayout1.slots.footer.items.itemAt(0)
                
                t.ok(footer1 == footer, 'Footer widget object is the same')
                t.ok(!footer1.items || !footer1.items.getCount(), "Footer have no child elements")
                
                
                
                //==================================================================================================================================================================================
                t.diag("Switching widget in center back")
                
                root.dispatch('/home').next(function (context) {
                    
                    //==================================================================================================================================================================================
                    t.diag("Ext.Container hierarchy after switching back")
                
                    t.ok(root.items.getCount() == 1, "Items of 'root' have a single child container")
                    
                    var siteLayout2 = root.items.itemAt(0)
                    
                    t.ok(siteLayout2 == siteLayout, 'Site layout object is the same')
                    t.ok(siteLayout2.items.getCount() == 3, "Items of 'siteLayout2' have a 3 child containers")
    
                    
                    //App.Widget.Header
                    
                    var header2 = siteLayout2.slots.header.items.itemAt(0)
                    
                    t.ok(header2 == header, 'Header widget object is the same')
                    t.ok(!header2.items || !header2.items.getCount(), "Header have no child elements")
        
                    
                    //App.Widget.Home
                    
                    var home2 = siteLayout2.slots.center.items.itemAt(0)
                    
                    t.ok(home2 == home, 'Home widget object is the same')
                    t.ok(!home2.items || !home.items.getCount(), "Home have no child elements")
                    
                    
                    //App.Widget.Sample
                    
                    var sample2 = siteLayout2.slots.center.items.itemAt(1)
                    
                    t.ok(sample2 == sample, 'Sample widget object is the same')
                    t.ok(!sample.items || !sample.items.getCount(), "Sample widget have no child elements")
                    
                    
                    t.ok(siteLayout2.slots.center.getLayout().activeItem == home, "Active item in 'center' slot is Home widget again")
                    
                    
                    //App.Widget.Footer
                    
                    var footer2 = siteLayout2.slots.footer.items.itemAt(0)
                    
                    t.ok(footer2 == footer, 'Footer widget object is the same')
                    t.ok(!footer2.items || !footer2.items.getCount(), "Footer have no child elements")
    
                    
                    t.endAsync(async1)
                })
                
            })
            
        })
        
        t.endAsync(async0)
    })
    
})