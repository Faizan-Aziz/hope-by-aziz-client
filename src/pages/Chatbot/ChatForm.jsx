import React, { useRef } from 'react'


const ChatForm = ({chathistory, setchathistory , generateBotresponse}) => {

    const inputRef= useRef();

    const handleformSubmit = (e) => {
        e.preventDefault();
        const userMessage= inputRef.current.value.trim(); //getting the input value and  removes whitespace from both ends
        if(!userMessage){
           return
        }
        console.log(userMessage)
        inputRef.current.value="";  //clear the message input after getting the value

        //update the chathistory with user message
        setchathistory((history) => [...history, {role: "user" , text: userMessage}])


        //update the thinking... placeholder for the bots response
        setTimeout(() => {
            setchathistory((history) => [...history, {role: "model" , text: "Thinking..."}])

            //call the funtion to generate the bots response
            generateBotresponse([...chathistory , {role: "user" , text:`using the details above please address this query and give answer simple and short : ${userMessage}`}])


        }, 600);
       

        
    }

  return (

          <form action="#" className="chat-form " onSubmit={handleformSubmit}>

                <input ref={inputRef} type="text" placeholder="message..." className="message-input" required />

                     <button className="bg-gray-300 material-symbols-rounded">
                        keyboard_arrow_up
                     </button>

            </form>
  )
}

export default ChatForm