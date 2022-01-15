# long-mix-generator
This API searches for music, compiles the found songs, and returns the file to the requester. It is meant to replace using livestreams and other high bandwidth options in order to listen to music of a specific genre for an extended period of time.

The API endpoint can be called directly. Alternatively it can be triggered by its associated discord bot. This bot is not open-sourced but can be invited to your server from [this link](https://discord.com/api/oauth2/authorize?client_id=931312897886408716&permissions=8&scope=bot).

# Usage
1. Clone this repo
2. `cd` into the project folder and `node server.js`
3. The app currently runs on localhost:3000/generate. Modify the endpoint if deploying to your own domain. 
4. If using the discord bot, invite the bot to your server.
5. Using your own account, join a voice channel.
6. In any text channel, type `!generate` and wait for the bot to confirm that the audio file has been created.
7. On confirmation, type `!play`. the bot should join the voice channel you are currently in and begin playing the compiled music file.
8. To regenerate the file, simply run `!generate` again.
