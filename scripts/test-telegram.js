/* global process */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');

// Simple .env parser since we don't have dotenv
function loadEnv() {
  if (!fs.existsSync(envPath)) {
    console.error('.env file not found at', envPath);
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, 'utf8');
  const env = {};
  content.split('\n').forEach(line => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      env[match[1].trim()] = match[2].trim();
    }
  });
  return env;
}

async function testTelegram() {
  const env = loadEnv();
  const botToken = env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = env.VITE_TELEGRAM_CHAT_ID;

  if (!botToken) {
    console.error('VITE_TELEGRAM_BOT_TOKEN missing in .env');
    process.exit(1);
  }

  console.log('--- Telegram Bot Diagnosis ---');

  // 1. Verify Bot Token
  let meData;
  try {
    const meRes = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
    meData = await meRes.json();
    if (meData.ok) {
      console.log(`✅ Bot Token is VALID!`);
      console.log(`   Bot Name: ${meData.result.first_name}`);
      console.log(`   Username: @${meData.result.username}`);
    } else {
      console.error(`❌ Bot Token is INVALID!`);
      console.error(`   Error: ${meData.description}`);
      process.exit(1);
    }
  } catch (e) {
    console.error(`❌ Connection error: ${e.message}`);
    process.exit(1);
  }

  // 2. Report on Chat ID
  if (chatId) {
    let cleanChatId = chatId;
    if (chatId.startsWith('#')) {
      console.log('⚠️  Warning: Your Chat ID starts with "#". This is likely incorrect.');
      cleanChatId = chatId.substring(1);
    }

    console.log(`\nTesting Chat ID: ${cleanChatId}`);
    const testMessage = `🧪 *Telegram Integration Test*\n\n✅ If you see this message, your bot is correctly configured!\n\n*Time:* ${new Date().toLocaleString()}`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: cleanChatId,
          text: testMessage,
          parse_mode: 'Markdown'
        })
      });

      const result = await response.json();

      if (response.ok) {
        console.log('✅ SUCCESS! Message sent to Telegram.');
        return;
      } else {
        console.error('❌ FAILED to send message.');
        console.error(`   Telegram Error: ${result.description}`);
      }
    } catch (error) {
      console.error(`❌ Error sending message: ${error.message}`);
    }
  }

  // 3. Helper for finding Chat ID
  console.log('\n--- Help: Finding your Chat ID ---');
  console.log('1. Open Telegram and search for your bot: @' + (meData?.result?.username || 'your_bot_username'));
  console.log('2. Click START or send any message to the bot.');
  console.log('3. If it\'s a group, add the bot to the group and send a message there.');
  console.log('\nFetching recent updates...');

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates?offset=-1`);
    const result = await response.json();

    if (result.ok && result.result.length > 0) {
      console.log('✅ Found recent activity! Possible Chat IDs:');
      result.result.forEach(update => {
        const message = update.message || update.edited_message || update.callback_query?.message;
        if (message && message.chat) {
          const type = message.chat.type;
          const name = message.chat.title || message.chat.username || message.chat.first_name || 'Individual';
          console.log(`   - ID: ${message.chat.id} [${type}] Name: ${name}`);
        }
      });
      console.log('\n👉 Update your .env file with one of the IDs above (without the #).');
    } else {
      console.log('❌ No recent messages found.');
      console.log('   Wait a few seconds after sending the message and run this script again.');
    }
  } catch (error) {
    console.error(`❌ Error fetching updates: ${error.message}`);
  }
}

testTelegram();
