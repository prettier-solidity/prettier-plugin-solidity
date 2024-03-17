import { util } from 'prettier';
import { getNextNonSpaceNonCommentCharacter } from '../../common/backward-compatibility.js';
import { locEnd } from '../../common/util.js';
import type { HandlerArguments } from './types';

const { addLeadingComment, addTrailingComment, addDanglingComment } = util;

export default function handleContractDefinitionComments({
  text,
  precedingNode,
  enclosingNode,
  followingNode,
  comment
}: HandlerArguments): boolean {
  if (!enclosingNode || enclosingNode.type !== 'ContractDefinition') {
    return false;
  }

  // We unfortunately have no way using the AST or location of nodes to know
  // if the comment is positioned before the Contract's body:
  //   contract a is abc /* comment */ {}
  // The only workaround I found is to look at the next character to see if
  // it is a {}.
  const nextCharacter = getNextNonSpaceNonCommentCharacter(
    text,
    comment,
    locEnd
  );

  // The comment is behind the start of the Block `{}` or behind a base contract
  if (followingNode?.type === 'InheritanceSpecifier' || nextCharacter === '{') {
    // In this scenario the comment belongs to a base contract.
    //   contract A is B, /* comment for B */ C /* comment for C */ {}
    if (precedingNode?.type === 'InheritanceSpecifier') {
      addTrailingComment(precedingNode, comment);
      return true;
    }

    // In this scenario the comment belongs to the contract's name.
    //   contract A /* comment for A */ is B, C {}
    // TODO: at the moment we prepended it but this should be kept after the name.
    addLeadingComment(enclosingNode, comment);
    return true;
  }

  // When the contract is empty and contain comments.
  // Most likely disabling a linter rule.
  if (enclosingNode.subNodes.length === 0) {
    addDanglingComment(enclosingNode, comment, false);
    return true;
  }

  return false;
}
