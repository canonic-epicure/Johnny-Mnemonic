Name
====

Johnny.Mnemonic - Yet another `ajax back button` implementation, on Joose3, with the test suite and no required page markup at this time


SYNOPSIS
========

        Class('App.Router', {
            
            isa : 'Symbie.Router',
            
            routes : {
                
                home : {
                    mapTo : '/home',
                    
                    via : function (context, root) {
                        //root == this, btw
                        
                        var layout = root.findOrCreate('App.Layout.Site')
                        
                        layout.slot('header').findOrCreate('App.Widget.Header', {
                            headerPk : 1
                        })
                        
                        layout.slot('center').findOrCreate('App.Widget.Home')
                        
                        layout.slot('footer').findOrCreate('App.Widget.Footer', {
                            footerPk : 1
                        })
                    } 
                },
                
                
                index : {
                    mapTo : '/',
                    
                    via : function (context, root) {
                        root.collectFrom('home')
                    }
                }
            }
        })


DESCRIPTION
===========

Symbie is a framework for web 2.0 applications, which looks like web-sites.
 


GETTING HELP
============

This extension is supported via github issues tracker: [http://github.com/SamuraiJack/Symbie/issues](http://github.com/SamuraiJack/Symbie/issues)

For general Joose questions you can also visit #joose on irc.freenode.org. 


SEE ALSO
========

[http://joose.github.com/Joose/doc/html/Joose.html](http://joose.github.com/Joose/doc/html/Joose.html)

Documentation for Joose


BUGS
====

All complex software has bugs lurking in it, and this module is no exception.

Please report any bugs through the web interface at [http://github.com/SamuraiJack/Symbie/issues](http://github.com/SamuraiJack/Symbie/issues)



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