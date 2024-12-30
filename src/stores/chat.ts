import { defineStore } from 'pinia'
import { Client } from "@stomp/stompjs"
import type { IChatMessage } from '@/interface/chat'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useChatStore = defineStore('chat', () => {

    const router = useRouter()

    const client = new Client({
        brokerURL: "ws://localhost:8080/ws-stomp",
    })

    const messages = ref<IChatMessage[]>([]);
    
    client.onConnect = ()=> {
        console.log('Connected ...')
    
        client.subscribe('/topic/greetings', (message)=> {
            messages.value.push(JSON.parse(message.body))
        })
    }
    
    client.onWebSocketError = (error) => {
        alert('로그인을 먼저 해주세요.')
        router.push('/login')
    }
    
    client.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };

    const connect = () => {
        client.activate()
    }

    const disconnect = () => {
        client.deactivate()
    }

    const chat = (message: IChatMessage) => {
        messages.value.push(message)
        client.publish({
            destination: '/app/hello',
            body: JSON.stringify(message)
        })
    }

    return {
        messages,
        connect,
        disconnect,
        chat
    }
})