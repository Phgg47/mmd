const Discord = require('discord.js')
const fs = require('fs')
const db = require("quick.db");

const { 
    token,
    prefix
 } = require('./config.json')

const app = new Discord.Client()

app.commands = new Discord.Collection();
app.aliases = new Discord.Collection();

app.on('ready', () => {
    console.log(`| ${app.user.tag} is online !!!`)

setInterval(function() {
    app.user.setActivity(`test`, { type: "WATCHING" })
  
},4000)
    
})

app.on("message", async (message) => {

  if (message.author.bot) return;

  if (message.content == "p/banner") {
      const bannerUrl = await getUserBannerUrl(message.author.id, { size: 4096 });
      if (bannerUrl) {
          const embed = new Discord.MessageEmbed()
              .setTitle(`${message.author.username}'بنر این داشمون`)
              .setDescription("بیا داش")
              .setImage(bannerUrl);
          message.channel.send(embed);
      } else {
          message.channel.send("نیترو نداره ک بنر داشته باشه کصخول");
      }
  }

});


      

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log("Couldn't find commands.");
      return;
    }
    
    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`| --------Commands-------- `);
      console.log(`| ✅ ${f} loaded! `);
      app.commands.set(props.help.name, props);
      props.help.aliases.forEach(alias => { 
        app.aliases.set(alias, props.help.name);
      });
    });
  })

  
  app.on("message", async message => {

    let messageArray = message.content.split(" ");
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let commandfile;
  
    if (app.commands.has(cmd)) {
      commandfile = app.commands.get(cmd);
  } else if (app.aliases.has(cmd)) {
    commandfile = app.commands.get(app.aliases.get(cmd));
  }
  
      if (!message.content.startsWith(prefix)) return;
  
          
  try {
    commandfile.run(app, message, args);
  
  } catch (e) {
  }}
  )

    
  
    

app.login(token)