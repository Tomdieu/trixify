"use client"

import MessageItem from "@/components/chats/Message/MessageItem";

export default function ChatContainer(){
    const messages = [
        { message: "Message 1", isMine: false, sender: "ivantom", timestamp: "2023-11-20T08:00:00Z" },
        { message: "Message 2", isMine: true, sender: "tester", timestamp: "2023-11-20T10:30:00Z" },
        { message: "Message 3", isMine: false, sender: "ivantom", timestamp: "2023-11-21T12:45:00Z" },

        { message: "Message 4", isMine: true, sender: "ivantom", timestamp: new Date().toLocaleDateString() },
        { message: "Message 5", isMine: true, sender: "ivantom", timestamp: new Date().toLocaleDateString() },
    ];

    // Function to format timestamp into a more human-readable format
    const formatTimestamp = (timestamp) => {
        const messageDate = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (messageDate.toDateString() === today.toDateString()) {
            return "Today";
        } else if (messageDate.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
        } else if (messageDate >= yesterday && messageDate.getDay() >= today.getDay() - 6) {
            return messageDate.toLocaleDateString(undefined, { weekday: "long" });
        } else {
            return messageDate.toLocaleDateString();
        }
    };

    // Group messages by formatted day
    const groupedMessages = messages.reduce((acc, message) => {
        const day = formatTimestamp(message.timestamp);
        acc[day] = acc[day] || [];
        acc[day].push(message);
        return acc;
    }, {});

    return (
        <div className={"w-full h-full flex-1 flex flex-col px-2 py-3 overflow-y-auto custom-scrollbar"}>
            <MessageItem message={"You can use the rounded and rounded-[specific direction] utility classes in Tailwind CSS to achieve rounded corners. In your case, you want all corners rounded except for the top-left. Here's how you can do it:"} isMine={false} sender={"ivantom"}/>
            <MessageItem message={"In your case, you want all corners rounded except for the top-left. Here's how you can do it:"} isMine={true} sender={"tester"}/>

            {Object.entries(groupedMessages).map(([day, messagesInDay]) => (
                <div key={day} className="mb-4">
                    <div className={"flex items-center gap-4"}>
                        <div className={"w-full border"}></div>

                        <h3 className="text-center mb-2 py-0.5 text-xs bg-[#EEF1F5] text-[#BABBBD] rounded-xl border px-3">{day}</h3>
                        <div className={"w-full border"}></div>
                    </div>
                    {messagesInDay.map((msg, index) => (
                        <MessageItem
                            key={index}
                            message={msg.message}
                            isMine={msg.isMine}
                            sender={msg.sender}
                            timestamp={msg.timestamp}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}