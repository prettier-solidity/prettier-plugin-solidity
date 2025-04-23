contract ContractDefinition is Contract1, Contract2, Contract3, Contract4, Contract5 {
}

contract StorageLayoutSpecifier layout   at 123 {
}

contract StorageLayoutSpecifier1 layout   at 1234567890 * 1234567890 - 1234567890 / 1234567890 {
}

contract StorageLayoutSpecifier2 layout  at veryVeryLongFunction(12345678901234567890 * 12345678901234567890 - 12345678901234567890 / 12345678901234567890 + 12345678901234567890 - 12345678901234567890) {
}

contract StorageLayoutSpecifier3 is Contract1   layout   at 123 {
}

contract StorageLayoutSpecifier4 is Contract1, Contract2, Contract3, Contract4, Contract5 layout   at 123{
}

contract StorageLayoutSpecifier5 is Contract1, Contract2, Contract3, Contract4, Contract5 layout   at 1234567890 * 1234567890 - 1234567890 / 1234567890{
}

contract StorageLayoutSpecifier6 is Contract1, Contract2, Contract3, Contract4, Contract5 layout   at veryVeryLongFunction(12345678901234567890 * 12345678901234567890 - 12345678901234567890 / 12345678901234567890 + 12345678901234567890 - 12345678901234567890){
}

contract StorageLayoutSpecifier7 is Contract1, Contract2, Contract3, Contract4, Contract5, Contract6, Contract7 layout   at 123{
}

contract StorageLayoutSpecifier8 is Contract1, Contract2, Contract3, Contract4, Contract5, Contract6, Contract7 layout   at 1234567890 * 1234567890 - 1234567890 / 1234567890{
}

contract StorageLayoutSpecifier9 is Contract1, Contract2, Contract3, Contract4, Contract5, Contract6, Contract7 layout   at veryVeryLongFunction(12345678901234567890 * 12345678901234567890 - 12345678901234567890 / 12345678901234567890 + 12345678901234567890 - 12345678901234567890){
}

contract InheritanceSpecifier1 is SomeOtherContract(1234,false) {}

contract InheritanceSpecifier2 is SomeOtherContract(1234,false)  layout   at 123 {}

contract InheritanceSpecifier3 is SomeOtherContract(1234,false) layout   at 1234567890 * 1234567890 - 1234567890 / 1234567890 {}

contract InheritanceSpecifier4 is SomeOtherContract(1234,false) layout   at veryVeryLongFunction(12345678901234567890 * 12345678901234567890 - 12345678901234567890 / 12345678901234567890 + 12345678901234567890 - 12345678901234567890) {}

contract LongInheritanceSpecifier1 is SomeOtherContract(123467890,false,0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c) {}

contract LongInheritanceSpecifier2 is SomeOtherContract(123467890,false,0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c) layout   at 123 {}

contract LongInheritanceSpecifier3 is SomeOtherContract(123467890,false,0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c) layout   at 1234567890 * 1234567890 - 1234567890 / 1234567890 {}

contract LongInheritanceSpecifier4 is SomeOtherContract(123467890,false,0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c) layout   at veryVeryLongFunction(12345678901234567890 * 12345678901234567890 - 12345678901234567890 / 12345678901234567890 + 12345678901234567890 - 12345678901234567890){}
