pragma solidity ^0.5.0;

contract MemberAccess {
    function() {
        a.b.c.d;
        a.b().c.d;
        a.b.c.d();
        a.b().c().d();
        veryLongVariable.veryLongMember.veryLongMember.veryLongMember.veryLongMember.veryLongMember;
        veryLongVariable.veryLongCall(veryLongAttribute).veryLongMember.veryLongMember.veryLongMember;
        veryLongVariable.veryLongMember.veryLongCall(veryLongAttribute).veryLongMember.veryLongMember;
        veryLongVariable.veryLongMember.veryLongMember.veryLongMember.veryLongCall(veryLongAttribute);
        veryLongVariable.veryLongCall(veryLongAttribute).veryLongCall(veryLongAttribute).veryLongCall(veryLongAttribute);
    }
}
