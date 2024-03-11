const axios = require('axios');

const Prefixes = [
  'ai',
  'asta',
  'staria',
  'bot',
  'gpt',
  'gemini',
  'chatbot',
];

module.exports = {
  config: {
    name: 'ai',
    version: '2.6',
    author: 'JV Barcenas | Shikaki', // do not change
    role: 0,
    category: 'ai',
    shortDescription: {
      en: 'Asks gemini AI for an answer.',
    },
    longDescription: {
      en: 'Asks gemini AI for an answer based on the user prompt.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));

      if (!prefix) {
        return; 
      }

      const prompt = event.body.substring(prefix.length).trim();

      if (prompt === '') {
        await message.reply(
          "⚔🅰🆂🆃🅰 🅱🅾🆃⚔:\n\nHeyo,hope you have an insane amount of energy in the question you want to ask me?."
        );
        return;
      }

      api.setMessageReaction("⌛", event.messageID, () => { }, true);

      const response = await axios.get(`https://pi.aliestercrowley.com/api?prompt=${encodeURIComponent(prompt)}&uid=${event.senderID}`);

      if (response.status !== 200 || !response.data) {
        throw new Error('Invalid or missing response from API');
      }

      const messageText = response.data.response;

      await message.reply(messageText);

      console.log('Sent answer as a reply to user');
      api.setMessageReaction("♻", event.messageID, () => { }, true);
    } catch (error) {
      console.error(`Failed to get answer: ${error.message}`);
      api.sendMessage(
        `${error.message}.\n\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`,
        event.threadID
      );
    }
  },
}
