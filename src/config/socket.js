import { log } from "console";

const Clients = new Map();

export default function startSocket(io) {
    io.on("connect", socket => {
        let ClientsFriendsIds = socket.handshake.query.friendsIds || [];
        try {
            ClientsFriendsIds = JSON.parse(ClientsFriendsIds)
        } catch (error) { }

        Clients.set(socket.handshake.query.clientId, { id: socket.id, friendsIds: ClientsFriendsIds })

        if (Array.isArray(ClientsFriendsIds) && ClientsFriendsIds?.length > 0) {

            Promise.all(
                ClientsFriendsIds.map(async (f) => {
                    if (Clients.get(f)) {
                        socket.to(Clients.get(f).id).emit("friendConnected", socket.handshake.query.clientId)
                        socket.emit("friendConnected", f)
                    }
                }))
        }


        // --------------------------------------------
        socket.on("messageSent", (m, cl) => {
            try {
                if (Clients.get(m.SocketTO)) {
                    socket.to(Clients.get(m.SocketTO).id).emit("messageRecieved", m, () => {
                        cl({ recieved: true, what: "friend recived message sucessfyll ", recievedBy: [m.SocketTO] })
                    });

                } else {
                    cl({ recieved: false, what: "friend didn't  recived message yet ", message_id: m._id })
                }
            } catch (error) {
                log("Error sendind message =>", error)
            }


        })
        // --------------------------------------------
        socket.on('messageTyping', (m, cb) => {
            try {
                if (Clients.get(m.SocketTO)) {
                    socket.to(Clients.get(m.SocketTO).id).emit("friendsTyping", m.from)
                }
            } catch (error) { }

        })
        socket.on('StopmessageTyping', (m, cb) => {
            try {
                if (Clients.get(m.SocketTO)) {
                    socket.to(Clients.get(m.SocketTO).id).emit("friendsStopedTyping", m.from)
                }
            } catch (error) { }

        })
        // --------------------------------------------
        socket.on("messagesSeen", (m, cl) => {
            try {
                if (Clients.get(m.SocketTO)) {
                    socket.to(Clients.get(m.SocketTO).id).emit("myMessagesSeen", { chat_id: m.chat_id, reader: socket.handshake.query.clientId })
                }
            } catch (error) { }

        })


        socket.on("disconnect", () => {

            if (Array.isArray(ClientsFriendsIds) && ClientsFriendsIds?.length > 0) {
                Promise.all(
                    ClientsFriendsIds.map(async (f) => {
                        if (Clients.get(f)) {
                            await socket.to(Clients.get(f).id).emit("friendDisconnected", socket.handshake.query.clientId)
                        }
                    }))
            }

            Clients.delete(socket.handshake.query.clientId)
        })

    })
}

