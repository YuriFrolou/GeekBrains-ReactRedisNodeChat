import {WebSocketServer} from "ws";
import redis from "ioredis";

const PORT = 5000;
const redisPub = redis.createClient();
const redisSub=redis.createClient();

const wss = new WebSocketServer({port: PORT}, () => {
    console.log(`Server started on port ${PORT}`);
});

redisSub.on('message', (channel, message) => {
    console.log(`Received the following message from ${channel}: ${message}`);
});



wss.on('connection', (client) => {


    client.on('message', async (message) => {
        message = JSON.parse(message);
        console.log(message);
        switch (message.event) {
            case 'message':
                if(message.reverseChannel!==""){
                    await redisPub.rpush([`${message.channel}`, JSON.stringify(message)]);
                    await redisPub.rpush([`${message.reverseChannel}`, JSON.stringify(message)]);
                }
                else{
                    await redisPub.rpush([`${message.channel}`, JSON.stringify(message)]);
                }
                await redisPub.publish(`${message.channel}`,JSON.stringify(message));
                broadcastMessage(JSON.stringify(message), client.id,'message');
                break;
            case 'connection':
                client.id=message.channel?message.channel:message.group;
                redisSub.subscribe(client.id, (error, count) => {
                    if (error) {
                        throw new Error(error);
                    }
                    console.log(`Subscribed to ${count} channel. Listening for updates on the ${client.id} channel.`);
                });
                broadcastMessage(await redisPub.lrange(`${client.id}`, 0, -1), client.id,'connection');
                break;
        }
    });

});

function broadcastMessage(message,channel, flag) {

    console.log(  wss.clients.size)
    wss.clients.forEach(client => {

         if(channel===client.id||channel===client.id.split(':').reverse().join(':')){
            client.send(JSON.stringify({
                flag: flag,
                data: message
            }));
         }
    })
}



