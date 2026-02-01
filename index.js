const mineflayer = require('mineflayer')

const BOT_USERNAME = 'OnlineBot'
const BOT_HOST = 'ValleyKingdom.aternos.me'
const BOT_PORT = 16940
const BOT_VERSION = '1.20.4'
const OWNER = 'Aarush2482'

function createBot () {
  const bot = mineflayer.createBot({
    host: BOT_HOST,
    port: BOT_PORT,
    username: BOT_USERNAME,
    version: BOT_VERSION
  })

  bot.once('spawn', () => {
    console.log('Bot spawned successfully')

    const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
    const armorManager = require('mineflayer-armor-manager')
    const mcData = require('minecraft-data')(bot.version)

    bot.loadPlugin(pathfinder)
    bot.loadPlugin(armorManager)

    const movements = new Movements(bot, mcData)
    bot.pathfinder.setMovements(movements)

    bot.on('chat', (username, message) => {
      if (username !== OWNER) return

      if (message === 'come') {
        const player = bot.players[username]
        if (!player) return
        bot.pathfinder.setGoal(
          new goals.GoalNear(
            player.entity.position.x,
            player.entity.position.y,
            player.entity.position.z,
            1
          )
        )
      }
    })
  })

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 5s...')
    setTimeout(createBot, 5000)
  })

  bot.on('error', err => console.log('Error:', err))
  bot.on('kicked', reason => console.log('Kicked:', reason))
}

createBot()


