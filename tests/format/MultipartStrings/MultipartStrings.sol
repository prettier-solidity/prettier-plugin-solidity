contract MultipartStrings {
  bytes h1 = hex'beef';
  bytes h2 = hex"beef";
  bytes h3 = hex"beef" hex"c0ffee";
  bytes h4 = hex"beeeeeeeeeeeeeeeeeeeeeef" hex"c0000000000ffeeeeeeeeeeeeeeeeeee";

  string s1 = "foo";
  string s2 = "foo" "bar";
  string s3 = "foofoofoofooofoofoofofoooofofoo" "barbarbrabrbarbarbabrabrbabr";

  string u1 = unicode'hello 🦄';
  string u2 = unicode'hello 🦄' unicode' world 🦄';
  string u3 = unicode'hellohellohellohellohellohello 🦄' unicode' worldworldworldworldworldworld 🦄';

  function multilineString() public pure {
    bytes hex1 = hex'DeadBeef00' hex'DeadBeef01' hex'DeadBeef02' hex'DeadBeef03' hex'DeadBeef04' hex'DeadBeef05';
    hex1 = hex'DeadBeef0a' hex'DeadBeef0b' hex'DeadBeef0c' hex'DeadBeef0d' hex'DeadBeef0e' hex'DeadBeef0f';

    string str = 'DeadBeef00' 'DeadBeef01' 'DeadBeef02' 'DeadBeef03' 'DeadBeef04' 'DeadBeef05';
    str = 'DeadBeef0a' 'DeadBeef0b' 'DeadBeef0c' 'DeadBeef0d' 'DeadBeef0e' 'DeadBeef0f';

    string uni = unicode'DeadBeef00🦄' unicode'DeadBeef01🦄' unicode'DeadBeef02🦄' unicode'DeadBeef03🦄' unicode'DeadBeef04🦄' unicode'DeadBeef05🦄';
    uni = unicode'DeadBeef0a🦄' unicode'DeadBeef0b🦄' unicode'DeadBeef0c🦄' unicode'DeadBeef0d🦄' unicode'DeadBeef0e🦄' unicode'DeadBeef0f🦄';
  }
}
