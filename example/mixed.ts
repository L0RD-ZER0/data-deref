import * as YAML from 'yaml';
import deref from 'data-deref';
import { addFileParser } from 'data-deref/config';

addFileParser('.yaml', YAML.parse);

deref('./example/mixed/file.json').then(console.log);
// {
//   data: {
//     numbers: { type: 'array', items: [Object], description: 'Basic Data Type.' },
//     strings: { type: 'array', items: [Object], description: 'Basic Data Type.' }
//   },
//   desc: 'Basic Data Type.'
// }
