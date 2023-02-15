const contacts = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const getContacts = await contacts.listContacts();
      console.table(getContacts);
      break;

    case 'get':
      const getById = await contacts.getContactById(id);
      console.table(getById);
      break;

    case 'add':
      const addContact = await contacts.addContact(name, email, phone);
      console.table(addContact);
      break;

    case 'remove':
      const deleteContact = await contacts.removeContact(id);
      console.table(deleteContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
