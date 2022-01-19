const Discord = require('discord.js');
const config = require("./config.json");
const lang = require("./translation." + config.language + ".json");
//const bot = new Discord.Client();
const {Client,Intents} = require('discord.js');
const bot = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]});
//const bot = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]});
/*----------開始執行主程式(初始化)------------------------------------------*/
function info(str) {console.log('\x1b[36m%s\x1b[0m','[INFO] '+str);}
function prom(str) {console.log('\x1b[33m%s\x1b[0m','[PROM] '+str);}
function warn(str) {console.log('\x1b[31m%s\x1b[0m','[WARN] '+str);}
/*--------------------------------------------------------------------------*/
console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\n　'+lang.title+'\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
console.log(lang.version+' '+config.version+'｜By.'+config.author);
info('- ' + lang.info_info);
prom('- ' + lang.info_prom);
warn('- ' + lang.info_warn);
console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
prom(lang.ready1 + '...');
/*--------------------------------------------------------------------------*/
/*執行讀取unturned伺服器資訊由unturned-server.net and npm request*/
/*--------------------------------------------------------------------------*/
const unturned_serversAPIurl = 'https://unturned-servers.net/api/?object=servers&element=detail&key=';
var request = require('request');

function get_info(serverAPI) {
    return new Promise((resolve,reject) => {
        request(unturned_serversAPIurl + serverAPI,function(error,response,body){
        if(error){  
            reject(0);
        }else{
            let bot_gameplayers; 
            unturned_status = JSON.parse(body);
            bot_gameplayers = Number(unturned_status.players);
            resolve(bot_gameplayers);
        }});
    })
}
async function status_players(players){
    let bot_status = 'dnd';
    players <= 0 ? bot_status = 'dnd' : bot_status = 'online';
    bot.user.setStatus(bot_status);
    bot.user.setActivity(lang.activity + ": " + players, {type: "PLAYING"});
    info(lang.activity_log + ":"+players);
}
bot.on("ready", () => {
    setInterval(async function() {
        status_players(await get_info(config.servers));
    }, config.isonlineRefresh)
});
/*--------------------------------------------------------------------------*/
bot.on('ready', async () => {
    info(`${bot.user.tag} ` + lang.ready2 + '!');
    info(lang.refresh_time+':' + config.isonlineRefresh + lang.refresh_time2);
    status_players(await get_info(config.servers));
});
/*************************你已經來到~程式的底部******************************/
bot.login(config.token);
//END By.T3oSr