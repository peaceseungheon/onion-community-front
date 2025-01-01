import { defineStore } from 'pinia'
import { Client } from "@stomp/stompjs"
import type { IChatMessage } from '@/interface/chat'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './auth'

export const useChatStore = defineStore('chat', () => {

    const router = useRouter()
    const authStore = useAuthStore()

    const client = new Client({
        brokerURL: "ws://localhost:8080/ws-stomp",
    })

    const messages = ref<IChatMessage[]>([]);
    
    client.onWebSocketError = (error) => {
        alert('로그인을 먼저 해주세요.')
        router.push('/login')
    }
    
    client.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };

    const connect = (chatRoomId: number) => {
        client.onConnect = ()=> {
            console.log('Connected ...')
        
            client.subscribe(`/sub/${chatRoomId}`, (message)=> {
                const newMessage = JSON.parse(message.body)
                if(authStore.user.userNo !== newMessage.userNo){
                    messages.value.push(newMessage)
                }
            })
        }
        client.activate()
    }

    const disconnect = () => {
        client.deactivate()
    }

    const chat = (message: IChatMessage) => {
        messages.value.push(message)
        client.publish({
            destination: '/pub/1',
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