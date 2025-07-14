import ChatBoticon from "./ChatBoticon"

const Chatmessage = ({chat}) => {
  return (

   !chat.hideInchat&& ( <div className={`message  ${chat.role==="model" ? 'bot' : 'user'}-message  ${chat.isError ? "error" : ""}`}>

        {chat.role==="model" && <ChatBoticon/>}  {/*adding the chatbot icon only if the chats role is model */}

            <p className="message-text  text-base font-normal">
                         {chat.text}
            </p>


    </div> 
   )
)
}

export default Chatmessage