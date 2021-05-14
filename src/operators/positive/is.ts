import { recursiveMatch } from '../../util';
import { Operator } from '../types';
import { diffString } from 'json-diff';


const op: Operator = {
  arity: 'binary',
  description: `checks that 'a' deep equals 'b'`,
  exec: (actual, expected) => {
    if (expected === 'null' && actual === null) return undefined;
    const isUndef = expected === 'undefined';
    const expectedJson = isUndef
      ? undefined
      : JSON.parse(expected);
    const errorPath = recursiveMatch(actual, expectedJson);
    const diff = (diffString(actual, expectedJson, {color: false}));
    return errorPath === undefined
      ? undefined
      : {
        assertEquals: true,
        error: `is not`,
        expected: expectedJson,
        path: errorPath,
        diff,
      };
  },
  name: 'is',
};

export default op;
