var Harness
var isNode        = typeof process != 'undefined' && process.pid

if (isNode) {
    require('Task/Test/Run/NodeJSBundle')
    
    Harness = Test.Run.Harness.NodeJS
} else 
    Harness = Test.Run.Harness.Browser.ExtJS
        
    
var INC = (isNode ? require.paths : []).concat('../lib', '/jsan')


Harness.configure({
    title       : 'Johnny.Mnemonic Test Suite',
    
    runCore     : 'Sequential',
    keepResults : true,
    
    preload : [
        "jsan:Task.Joose.Core",
        "jsan:Task.JooseX.Namespace.Depended.Auto",
        {
            text : "JooseX.Namespace.Depended.Manager.my.INC = " + Harness.prepareINC(INC)
        },
        "jsan:Task.JooseX.CPS.All",
        'Johnny.Mnemonic'
    ]
})


Harness.start(
    '010_basics.t.js'
)