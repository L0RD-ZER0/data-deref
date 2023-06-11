# Data-Deref
Simple utility to dereference ``$ref`` references in a data document. 


## Usage
Examples of usage can be found in the [examples] directory on the repository.


### Basic Usage

The module exports a ``deref`` function by default which takes a single argument, a path to the file which is to be 
parsed and dereferenced.

```ts
import deref from "data-deref";

deref('path/to/data.json#/path/to/reference').then(console.log);
```


### Using with a custom parser

You can use a custom parsing function which parses data based on the extension of file being referred to as resolved by 
'[path.extname(...)]' of the standard library.

This example uses [yaml] to parse the data from a ``.yaml`` file.

```ts
import deref, { config } from "data-deref";
import YAML from "yaml";

config.addFileParser(".yaml", YAML.parse);

deref('path/to/data.yaml#/path/to/reference').then(console.log);
```

By default, the module only uses [JSON.parse(...)] to parse ``.json`` files.


### Mixing references from different files

You can mix references from different files by using the ``$ref`` keyword in the data document.

```json5
// target.json
{
    "foo": {
        "$ref": "ref.yaml#/value/of/foo"
    }
}
```
```yaml
# ref.yaml
value:
  of:
    foo: "bar"
```

```ts
import deref from "data-deref";
import YAML from "yaml";

deref('path/to/target.json#/foo').then(console.log);
// Logs "bar" to the console
```

## Issues
If you find any issues with the module, please report them on the [issues] page of the repository.


## Contributing
If you would like to contribute to the project, go to the [GitHub Repository] to clone the project, and make a 
pull-request after making changes. All pull requests are welcomed, and subjected to a review before being merged.


## License
This project is licensed under the MIT License - see the [LICENSE] file for details.


[path.extname(...)]: https://nodejs.org/api/path.html#pathextnamepath
[JSON.parse(...)]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
[GitHub Repository]: https://GitHub.com/LORD-ZER0/data-deref
[examples]: https://GitHub.com/LORD-ZER0/data-deref/tree/master/examples
[issues]: https://GitHub.com/LORD-ZER0/data-deref/issues
[LICENSE]: ./LICENSE
[yaml]: https://www.npmjs.com/package/yaml
