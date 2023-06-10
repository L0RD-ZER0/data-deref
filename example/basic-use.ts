import deref from 'data-deref';

deref('./example/basic-use/file.json').then(console.log);
// { sendTo: 'Sender', message: 'Hello, World!', localRef: 'Hello, World!' }
