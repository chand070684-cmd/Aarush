const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const armorManager = require('mineflayer-armor-manager');

const BOT_USERNAME = process.env.BOT_USERNAME || 'OnlineBot';
const BOT_HOST = process.env.BOT_HOST || 'ValleyKingdom.aternos.me';
const BOT_PORT = parseInt(process.env.BOT_PORT) || 16940;
const BOT_VERSION = process.env.BOT_VERSION || false;
const OWNER = process.env.OWNER || 'Aarush2482';

function createBot() {
  const bot = mineflayer.createBot({
    host: BOT_HOST,
    port: BOT_PORT,
    username: BOT_USERNAME,
    version: BOT_VERSION
  });

  bot.loadPlugin(armorManager);
  bot.loadPlugin(pathfinder);

  let guardPos = null;

  function guardArea(pos) {
    guardPos = pos.clone();
    moveToGuardPos();
  }

  function stopGuarding() {
    guardPos = null;
    bot.pathfinder.setGoal(null);
  }

  function moveToGuardPos() {
    const mcData = require('minecraft-data')(bot.version);
    bot.pathfinder.setMovements(new Movements(bot, mcData));
    bot.pathfinder.setGoal(new goals.GoalBlock(guardPos.x, guardPos.y, guardPos.z));
  }

  bot.on('chat', (username, message) => {
    if (username !== OWNER) return;

    if (message === 'guard') {
      const player = bot.players[username];
      if (player) {
        bot.chat('I will guard!');
        guardArea(player.entity.position);
      }
    }

    if (message === 'stop') {
      bot.chat('Stopping!');
      stopGuarding();
    }
  });

  // Auto-reconnect if bot disconnects
  bot.on('end', () => {
    console.log('Bot disconnected, reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  bot.on('kicked', console.log);
  bot.on('error', console.log);
}

createBot();

