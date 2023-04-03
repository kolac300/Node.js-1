const path = require("path");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require(path.resolve("contacts.js"));

async function invokeAction({ action, id, name, email, phone }) {
  console.log("action", action);
  switch (action) {
    case "list":
      console.table(JSON.parse(await listContacts()));
      break;
    case "get":
      console.table(await getContactById(id));
      break;

    case "add":
      await addContact(name, email, phone);
      console.table(JSON.parse(await listContacts()));
      break;

    case "remove":
      await removeContact(id);
      console.table(JSON.parse(await listContacts()));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);
