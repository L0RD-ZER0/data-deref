import deref from 'data-deref';

deref('./example/basic-use/file.json#localref').then(console.log);
// { sendTo: 'Sender', message: 'Hello, World!', localref: 'Hello, World!' }
