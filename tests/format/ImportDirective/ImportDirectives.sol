import "SomeFile.sol";
import "SomeFile.sol" as SomeOtherFile;
import * as SomeSymbol from "AnotherFile.sol";
import {symbol1 as alias1, symbol2} from "File.sol";
import {symbol1 as alias1, symbol2 as alias2, symbol3 as alias3, symbol4} from "File2.sol";
import {
    GovernorVotesSuperQuorumFraction
} from "../../../contracts/governance/extensions/GovernorVotesSuperQuorumFraction.sol";
import {
    IAccessControl
} from "@openzeppelin/contracts/access/IAccessControl.sol";
import {
    IERC7579Module,
    IERC7579Validator,
    IERC7579Execution,
    IERC7579AccountConfig,
    IERC7579ModuleConfig,
    MODULE_TYPE_VALIDATOR,
    MODULE_TYPE_EXECUTOR,
    MODULE_TYPE_FALLBACK
} from "../../interfaces/draft-IERC7579.sol";