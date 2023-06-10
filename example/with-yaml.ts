import YAML from 'yaml';
import deref from 'data-deref';
import { addFileParser } from 'data-deref/config';

addFileParser('.yaml', YAML.parse);

deref('./example/with-yaml/file.yaml').then(console.log);
// {
//   species: {
//     cat: { scientific_name: 'Felis catus', description: 'Domestic cat' },
//     dog: {
//       scientific_name: 'Canis lupus familiaris',
//       description: 'Domestic dog'
//     },
//     fish: { scientific_name: 'Carassius auratus', description: 'Goldfish' }
//   }
// }
