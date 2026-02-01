const mineflayer = require('mineflayer')

const BOT_USERNAME = 'OnlineBot'
const BOT_HOST = 'ValleyKingdom.aternos.me'
const BOT_PORT = 16940
const BOT_VERSION = '1.20.4'

function createBot () {
  const bot = mineflayer.createBot({
    host: BOT_HOST,
    port: BOT_PORT,
    username: BOT_USERNAME,
    version: BOT_VERSION
  })

  bot.once('spawn', () => {
    console.log('✅ Bot spawned and running 24/7')
    bot.chat('Bot is online!')
  })

  bot.on('chat', (username, message) => {
    if (message === 'ping') {
      bot.chat('pong')
    }
  })

  bot.on('end', () => {
    console.log('🔄 Disconnected, reconnecting in 5s...')
    setTimeout(createBot, 5000)
  })

  bot.on('kicked', r => console.log('Kicked:', r))
  bot.on('error', e => console.log('Error:', e))
}

createBot()
