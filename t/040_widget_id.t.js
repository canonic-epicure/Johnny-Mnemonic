StartTest(function(t) {
	
    t.plan(7)
    
    var async1 = t.beginAsync()
    
    use([ 'App.Widget.Sample', 'App.Widget.Header' ], function () {
        
        //==================================================================================================================================================================================
        t.diag("Sanity")
        
        t.ok(App.Widget.Sample, "App.Widget.Sample is here")
        
        t.ok(App.Widget.Sample.meta.hasAttribute('pkField') && App.Widget.Sample.meta.getAttribute('pkField').required, "App.Widget.Sample has a required 'pkField' attribute")
        
        
        //==================================================================================================================================================================================
        t.diag("'ID' computation - same host, different PK")
        
        var sampleMeta = App.Widget.Sample.meta
        var headerMeta = App.Widget.Header.meta
        
        var sampleID1 = sampleMeta.computeID('host1', {
            pkField : 1
        })
        
        var sampleID2 = sampleMeta.computeID('host1', {
            pkField : 2
        })
        
        t.ok(sampleID1 != sampleID2, 'Generated ID are different for the different "primary keys" attributes')
        
        
        //==================================================================================================================================================================================
        t.diag("'ID' computation - different host, same PK")
        
        var sampleID1 = sampleMeta.computeID('host1', {
            pkField : 1
        })
        
        var sampleID2 = sampleMeta.computeID('host2', {
            pkField : 1
        })
        
        t.ok(sampleID1 != sampleID2, 'Generated ID are different for the different hosts, even that "primary keys" attributes are the same')
        

        //==================================================================================================================================================================================
        t.diag("'ID' computation - same host, same PK, different meta")
        
        var sampleID1 = sampleMeta.computeID('host1', {
            pkField : 1
        })
        
        var sampleID2 = headerMeta.computeID('host1', {
            pkField : 1
        })
        
        t.ok(sampleID1 != sampleID2, 'Generated ID are different for the different metas, even that "primary keys" and hosts are the same')
        
        
        //==================================================================================================================================================================================
        t.diag("Instantiation")
        
        var sample = new App.Widget.Sample({
            pkField : 1
        })
        
        t.ok(sample, "'App.Widget.Sample' was successfully instantiated")

        
        //==================================================================================================================================================================================
        t.diag("Checking ID during instantiation")
        
        t.throws_ok(function() {
            new App.Widget.Sample({
            })
        }, "Required attribute", 'Missing parts of ID are detecting')
        
        t.endAsync(async1)
    })
    
})