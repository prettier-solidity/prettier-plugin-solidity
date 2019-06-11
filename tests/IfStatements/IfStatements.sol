contract IfStatements {
    function hi() public {
        if (simpleIf) return true;

        if (simpleIf) {
            return true;
        }

        if (simpleIf) { return true; }
        else {
            return false;
        }

        if (simpleIf) return true;
        else
            return false;

        if (simpleIf) {return true;}
        else
            return false;


        if (simpleIf) return true;
        else {
            return false;
        }

        if (thisIsAVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongCondition) return true;

        if (thisIsAVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongCondition) {
            return true;
        }

        if (thisIsAVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongCondition) return true;
        else {
            return false;
        }

        if (thisIsAVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongCondition) {return true;}
        else {
            return false;
        }

        if (thisIsAVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongCondition) {return true;}
        else
            return false;


            if (thisIsAVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongCondition) return true;
            else
                return false;

    }
}
