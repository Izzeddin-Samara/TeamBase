const Contact = require("../models/Contact");
const Mailjet = require("node-mailjet");
require('dotenv').config();

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_SECRET_KEY
);

async function sendMailjetEmail(toEmail, toName, message) {
  try {
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "izzidinsamara@gmail.com",
            Name: "TeamBase",
          },
          To: [
            {
              Email: toEmail,
              Name: toName,
            },
          ],
          Subject: "Thanks for contacting us!",
          TextPart: `Hi ${toName},\n\nThis is TeamBase support Team, \n\nThank you for your message. We will get back to you shortly.\n\nTeamBase`,
        },
      ],
    });

    const result = await request;
    console.log(result.body);
  } catch (err) {
    console.error(err);
  }
}

module.exports.addContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      message,
    });

    await sendMailjetEmail(email, name, message);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: "Failed to Add contact" });
  }
};
