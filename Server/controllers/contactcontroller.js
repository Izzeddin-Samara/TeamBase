const Contact = require("../models/Contact");



module.exports.addContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: "Failed to Add contact" });
  }
};
