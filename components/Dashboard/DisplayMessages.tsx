"use client";
  
//{ userId, recipientId, receiversId, onMessageId }: { userId: string|number, recipientId: string|number, receiversId:any[], onMessageId: (messageId: string ) => void, messages:any[]}
const ChatBox=({userId, messages, recipientId, onMessageId }: { userId: string|number, messages:any[], recipientId: string|number,  onMessageId: (messageId: string ) => void}) =>{ 
 
  return (
    <div className="bg-white p-4 rounded shadow overflow-y-auto">
      <h2 className="text-lg font-bold text-teal-700 mb-2">Messages</h2>
      <div className="space-y-2 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded max-w-sm hover:bg-gray-200 ${
              msg.sender_id === userId ? "bg-teal-100 ml-auto" : "bg-orange-100 mr-auto"
            }`}
          >
         {!recipientId&& <p className="text-sm text-gray-700 cursor-pointer py-1" onClick={()=>onMessageId(msg.id)}>{msg.full_name}</p>}  
             {recipientId&& <p className="text-sm text-gray-700 py-1">{msg.message}</p>}
            <p className="text-xs text-gray-500 text-right">
              {new Date(msg.created_at).toLocaleTimeString()}
            </p> 
            
          </div>
        ))}
      </div>
 
    </div>
  );
}
export default ChatBox