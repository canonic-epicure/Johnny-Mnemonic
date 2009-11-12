use inc::Module::JSAN::DSL;

name            Johnny.Mnemonic

version         0.01
author          'Nickolay (SamuraiJack) Platonov <root@symbie.org>'

abstract        'Yet another `ajax back button` implementation, on Joose3, with the test suite and no required page markup at this time'
license         lgpl


requires        Joose                           3.01
requires        JooseX.Namespace.Depended       0.01
requires        Task.ExtJS                      3.0.0
requires        JooseX.Bridge.Ext               0.01

test_requires   Test.Run                        0.01

docs_markup     mmd