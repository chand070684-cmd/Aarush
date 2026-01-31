# Minecraft Bot 24/7

This bot is ready to run on **Railway**, **Render**, or other Node.js hosts.

## Environment Variables

Set these in your host:

| Variable      | Example Value                 |
|---------------|-------------------------------|
| BOT_USERNAME  | OnlineBot                     |
| BOT_HOST      | ValleyKingdom.aternos.me      |
| BOT_PORT      | 16940                         |
| BOT_VERSION   | false or 1.16.5               |
| OWNER         | Aarush2482                    |

## Deployment Steps (Railway Example)

1. Fork this repo to your GitHub account.
2. Go to [Railway](https://railway.app/) and login.
3. Create a new project → Deploy from GitHub → select your fork.
4. Set the environment variables listed above.
5. Click **Deploy**.
6. Check logs to see if bot joins the server.

The bot will auto-reconnect if disconnected.

## Commands (Owner Only)

- `guard` → Guard your current position
- `stop` → Stop guarding

Only **Aarush2482** can issue commands to the bot.
