const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Sample contacts array (you can replace this with a database later)
let contacts = [
  {
    id: 1,
    firstName: 'Lex',
    lastName: 'Friedman',
    numberPhone: '123456789',
    address: '123 Los Angles'
  },
  {
    id: 2,
    firstName: 'Thomas',
    lastName: 'Row',
    numberPhone: '987654321',
    address: '456 Tangerang'
  }
];

// GET all contacts
app.get('/contacts', (req, res) => {
  res.json(contacts);
});

// GET a specific contact by ID
app.get('/contacts/:id', (req, res) => {
  const contact = contacts.find(c => c.id === parseInt(req.params.id));

  if (!contact) {
    res.status(404).send('Contact not found.');
  } else {
    res.json(contact);
  }
});

// CREATE a new contact
app.post('/contacts', (req, res) => {
  const newContact = {
    id: contacts.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    numberPhone: req.body.numberPhone,
    address: req.body.address
  };

  contacts.push(newContact);
  res.status(201).json(newContact);
});

// UPDATE a contact by ID
app.put('/contacts/:id', (req, res) => {
  const contact = contacts.find(c => c.id === parseInt(req.params.id));

  if (!contact) {
    res.status(404).send('Contact not found.');
  } else {
    contact.firstName = req.body.firstName;
    contact.lastName = req.body.lastName;
    contact.numberPhone = req.body.numberPhone;
    contact.address = req.body.address;

    res.json(contact);
  }
});

// DELETE a contact by ID
app.delete('/contacts/:id', (req, res) => {
  const index = contacts.findIndex(c => c.id === parseInt(req.params.id));

  if (index === -1) {
    res.status(404).send('Contact not found.');
  } else {
    contacts.splice(index, 1);
    res.sendStatus(204);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
