const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");
const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  return await fs.readFile(contactsPath, "utf-8");
}

async function getContactById(contactId) {
  return JSON.parse(await fs.readFile(contactsPath, "utf-8")).filter(
    (el) => el.id === contactId
  );
}
// • fs.writeFileSync(<path>, <content>, <encoding>)
async function removeContact(contactId) {
  const filterArr = JSON.stringify(
    JSON.parse(await listContacts()).filter((el) => el.id !== contactId)
  );
  await fs.writeFile(contactsPath, filterArr, "utf-8");
}

async function addContact(name, email, phone) {
  await fs.writeFile(
    contactsPath,
    JSON.stringify([
      ...JSON.parse(await listContacts()),
      { id: uid(), name, email, phone },
    ]),
    "utf-8"
  );
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
