const express = require('express');
const router = express.Router();
const venom = require('venom-bot');

// Initialiser le client Venom
venom.create().then(client => start(client)).catch(err => console.log(err));

function start(client) {
  // Route pour envoyer des messages WhatsApp
  router.post('/send-whatsapp', (req, res) => {
    const { phoneNumber, message } = req.body;

    client.sendText(`${phoneNumber}@c.us`, message).then(result => {
      res.status(200).json({ success: true, messageId: result.id });
    }).catch(error => {
      res.status(500).json({ success: false, error: error.message });
    });
  });
}

module.exports = router;
