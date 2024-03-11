const moment = require('moment');

module.exports = {
  config: {
    name: "stats",
    version: "1.0",
    author: "asta",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "sends the bot status"
    },
    longDescription: {
      en: "sends the bot status"
    },
    category: "utility",
    guide: {
      en: "{pn"
    },
    envConfig: {}
  },

  onStart: async function ({ message, prefix, arg }) {
    const OS = "Linux 6.2.0-1019-gcp";
    const Arch = "x64";
    const CPU = "Intel(R) Xeon(R) CPU @ 2.20GHz (8 cores)";
    const LoadAvg = "11.52%";
    const MemInfo = "19.83 GB / Total 32.78 GB";
    const disc = "44.56 GB / Total 1.60 TB";

    const now = moment();
    const date = now.format('MMMM Do YYYY');
    const time = now.format('h:mm:ss A');

    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

    const processMemory = "235.23 MB";
    const botPrefix = prefix;
    const authorName = "ASTA ICHIYUKIMØRI";

    const additionalText = "==Created 𝙗𝙮 ASTA ICHIYUKIMØRI㋡==";

    // Combine bot status and additional text in a single message
    message.reply(`======[⚡STATUS⚡]======
    ———————————————————————
    ⚙ SYSTEM INFORMATION ⚙:
    OS: ${OS}
    -----------------------
    Arch: ${Arch}
    -----------------------
    CPU: ${CPU}
    -----------------------
    Load Avg: ${LoadAvg}

    💾 MEMORY INFORMATION 💾:
    Memory Usage: ${MemInfo}
    -----------------------
    RAM usage: ${MemInfo}

    📀 DISC SPACE INFORMATION 📀:
    Disc space usage: ${disc}

    🤖 BOT UPTIME: ${uptimeString}
    Time: ${time}
    -----------------------
    📊 Process Memory Usage: ${processMemory}
    ———————————————————————
    ${additionalText}`);
  },
  
  onchat: async function ({ event, message, getLang, prefix }) {
    if (event.body && event.body.toLowerCase() === "info") {
      this.onStart({ message, prefix });
    }
  }
};
