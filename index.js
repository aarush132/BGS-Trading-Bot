const Discord = require('discord.js');
const bot = new Discord.Client();
const ms = require("ms");

const token = 'NjQ0NjAyMDMzOTc4MjEyMzUy.Xc79hQ.5Pkl4cS3O2iYIVSXM95Lp2Ym4Gs';

const PREFIX = '!';

bot.on('ready', () => {
    console.log('This bot is active!');
})

bot.on('message',message => { 

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'kick':

        // No author permissions
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ You do not have permissions to kick members. Please contact a staff member")
                .then(m => m.delete(5000));
        }
        const user = message.mentions.users.first();

        if(user){


          const member = message.guild.member(user);


          if(member){
              member.kick('You have been kicked from BGS Trading.').then(() =>{
                  message.reply(`The trader has been kicked. ${user.tag}`);
              }).catch(err =>{
                  message.reply('I was unable to kick the member');
                  console.log(err);
              });
          } else{
            message.reply("That user isn\'t in the this guild")
          } 
         } else{
           message.reply('That user isn\'t in the guild');
       } 
 break;
    }
});

bot.on('message',message => { 

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'ban':
           
        // No author permissions
            if (!message.member.hasPermission("BAN_MEMBERS")) {
                return message.reply("❌ You do not have permissions to ban members. Please contact a staff member")
                    .then(m => m.delete(5000));
            }

        const user = message.mentions.users.first();

        if (user) {
            const member = message.guild.member(user);

        if (member) {   
            member.ban({ression: 'You have been banned from BGS Trading.'}).then(() =>{
                message.reply('The trader had been banned. ${user.tag}')
            })
        } else {
            message.reply("That user isnt in the server.")
         }
        } else { 
            message.reply('You need to specify a person.')
        }

         break;
        }

    }); 

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'mute':
            var person  = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
            if(!person) return  message.reply("I can not find that user." + person)

            let mainrole = message.guild.roles.find(role => role.name === "Member");
            let role = message.guild.roles.find(role => role.name === "mute");
      
            // No author permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("❌ You do not have permissions to mute members. Please contact a staff member")
                .then(m => m.delete(5000));
        }

            if(!role) return message.reply("Couldn't find the mute role.")


            let time = args[2];
            if(!time){
                return message.reply("You didnt specify a time!");
            }

            person.removeRole(mainrole.id)
            person.addRole(role.id);


            message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)

            setTimeout(function(){

                person.addRole(mainrole.id)
                person.removeRole(role.id);
                console.log(role.id)
                message.channel.send(`@${person.user.tag} has been unmuted.`)
            }, ms(time));



        break;
    }
 })          
        
bot.login(token);
