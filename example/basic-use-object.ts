import { derefObject } from "data-deref";

const obj = {
  "MessageArray": [
    { $ref: "./example/basic-use/message.json#/message/ENG" },  // Gets replaced with 'Hello, World!'
    { $ref: "./example/basic-use/message.json#message/FR" },  // Gets replaced with 'Bonjour, le monde!'
    { $ref: "./example/basic-use/message.json#message/GER" },  // Gets replaced with 'Hallo, Welt!'
    { $ref: "./example/basic-use/message.json#/message/IT" },  // Gets replaced with 'Ciao, mondo!'
    { $ref: "./example/basic-use/message.json#message/JP" },  // Gets replaced with 'こんにちは、世界！'
  ],
  localRef: { $ref: "#MessageArray/0" }  // Gets replaced with 'Hello, World!'
}

derefObject(obj).then(console.log);
// {
//   MessageArray: [
//     'Hello World',
//     'Bonjour le monde',
//     'Hallo Welt',
//     'Ciao mondo',
//     'こんにちは世界'
//   ],
//   localRef: 'Hello World'
// }
