Name
====

Johnny.Mnemonic - Yet another `ajax back button` implementation, on Joose3, with the test suite and no required page markup at this time


SYNOPSIS
========

        var mnemonic = new Johnny.Mnemonic({
            defaultToken : '/'
        })
        
        mnemonic.on('statechange', function (mnemonic, token) {
            this.syncState(token)
        })
        
        mnemonic.setup()
        
        -or-

        var mnemonic = new Johnny.Mnemonic({
            defaultToken : '/'
        })
        
        mnemonic.setup(function () {
        
            ...
        
            mnemonic.on('statechange', function (mnemonic, token) {
                this.syncState(token)
            })
        })


DESCRIPTION
===========

Johnny.Mnemonic is a yet another `ajax back button` implementation, with the focus on maintainability. 

Its source code is relatively clean, and, (the most important) it has an automated test suite - this makes it different from others solutions in this area.

Another difference is that Mnemonic do not requires any additional page markup or assets - its a pure javascript solution. 

Currently works on everything except Opera (patches welcome).


PROPERTIES
==========

- `defaultToken`


WORKFLOW
========

Mnemonic has rather simple interface. Usual workflow will be as follows

- Instantiate mnemonic

- Subscribe on its `statechange` event

- Call `setup` method





GETTING HELP
============

This extension is supported via github issues tracker: [http://github.com/SamuraiJack/Johnny-Mnemonic/issues](http://github.com/SamuraiJack/Johnny-Mnemonic/issues)

For general Joose questions you can also visit #joose on irc.freenode.org. 


SEE ALSO
========

[Documentation for Joose](http://joose.github.com/Joose/doc/html/Joose.html)

[Documentation for Ext.util.Observable class of ExtJS library](http://www.extjs.com/deploy/dev/docs/?class=Ext.util.Observable)

[Bridge from ExtJS to Joose](http://github.com/SamuraiJack/joosex-bridge-ext/tree/master)

[Based on true story](http://project.cyberpunk.ru/lib/johnny_mnemonic/)



BUGS
====

Test suite can be ran under Chrome - seems it doesn't allow manipulations with window's history from another window.
With the manual pressing 'back/forward' buttons it works fine though.

All complex software has bugs lurking in it, and this module is no exception.

Please report any bugs through the web interface at [http://github.com/SamuraiJack/Johnny-Mnemonic/issues](http://github.com/SamuraiJack/Johnny-Mnemonic/issues)


AUTHORS
=======

Nickolay Platonov [nplatonov@cpan.org](mailto:nplatonov@cpan.org)



COPYRIGHT AND LICENSE
=====================

Copyright (c) 2009, Nickolay Platonov

All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of Nickolay Platonov nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
