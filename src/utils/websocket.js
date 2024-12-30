import { Client } from "@stomp/stompjs"

const client = new Client({
    brokerURL: "ws://localhost:8080/ws-stomp",
})

client.onConnect = ()=> {
    console.log('Connected ...')

    client.subscribe('/topic/greetings', (message)=> {
        console.log(message.body)
    })
}

client.onWebSocketError = (error) => {
    console.error(error.message)
}

client.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

const connect = ()=> {
    client.activate()
}

const disconnect = ()=> {
    client.deactivate()
    console.log('Disconnected ...')
}

const chat = (message)=> {
    client.publish({
        destination: '/app/hello',
        body: JSON.stringify({ message})
    })
}

export {
    connect,
    disconnect,
    chat
}