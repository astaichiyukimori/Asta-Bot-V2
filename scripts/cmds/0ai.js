const axios = require('axios');

const astaResponses = [
 "I'm Asta, the loud and energetic anti-magic user!",
 "Ready to go, believe it!",
 "Who needs magic when you have determination like mine?",
 "I never give up, no matter how tough the opponent!",
 "Believe in yourself, even if no one else does!",
 "I'm Asta, the future Wizard King! What do you need, huh?",
 "Don't worry! I'll give you an answer that'll blow your socks off!",
 "Haha! You're talking to Asta, the one and only!",
 "Alright, let's do this! What's your question, buddy?",
 "I'm not sure I understand. Could you rephrase that?",
 "Hmm, that's an interesting question. Let me think...",
 "I sense a powerful magic within your words. Proceed.",
];

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
 await message.reply(astaResponses[Math.floor(Math.random() * astaResponses.length)]);
 return astaResponses[Math.floor(Math.random() * astaResponses.length)];
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
};
