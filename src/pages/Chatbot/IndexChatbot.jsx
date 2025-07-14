import { useState} from "react";
import { useRef } from "react";
import { useEffect } from "react";
import ChatBoticon from "./ChatBoticon"
import ChatForm from "./ChatForm"
import Chatmessage from "./Chatmessage"
import { Flex } from "antd";
import { useLocation } from 'react-router-dom';
import { companyInfo } from "./company";



const IndexChatbot = () => {

    const [chathistory, setchathistory] = useState([{
        hideInchat: true, //hideInchat property is used to prevent the data from being display in the chat
        role:"model",
        text:companyInfo
    }])
    const [showchatbot, setshowchatbot] = useState(false)

    //this is used for the special body sytle add on that page only 
    const location = useLocation();
  
    //auto scoller
    const chatBodyref = useRef()

    const generateBotresponse = async (history)=>{

        //helper funtion to update the API request and remove thinkink and keep all others
        const updateHistory = (apitext , isError= false )=>{
           setchathistory(prev => [...prev.filter(msg => msg.text!== "Thinking...") , {role:"model" , text:apitext , isError}])
        }

        //Transform history to Gemini format
        const transformedHistory = history.map(({ role, text }) => ({
            role,   
            parts: [{ text }]
        }));
        // [   if we have this history item this will add the part with it and make it in that format so that gemini api can accept as you see also in the gemini document
        //     { role: 'user', parts: [{ text: 'kiya haal hai bhai jan' }] },
        // ]

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(({contents: transformedHistory}))
        }
    // console.log(history)

    try {

        //make the Api call to get the bots response 
        const response= await fetch(import.meta.env.VITE_API_URL, requestOptions)
        const data = await response.json();
        if(!response.ok) throw new Error(data.error.message || alert("something went wrong!"))
        console.log(data)
        
        //clean and update the chat history with bots response
        const apiresponseText = data.candidates[0].content.parts[0].text .replace(/\*\*(.*?)\*\*/g, '$1') // Remove **bold** markers
        .trim(); // Clean whitespace from start and end

        updateHistory(apiresponseText)

    } catch (error) {
        updateHistory(error.message,true)  //if the error occur update the last thinking message to the error message
    }
    }

    useEffect(() => {

       //auto scroller whenever chat history update
       chatBodyref.current.scrollTo({top:chatBodyref.current.scrollHeight, behavior: "smooth"})
    }, [chathistory])


    //unmount the style special body and we do that we dont want that style will apply to other pages also
    useEffect(() => {
        
        if (location.pathname === '/chatbot') {
            document.body.classList.add('specialBody'); // Using CSS module class
        } 
        // cleanup funtion when component unmounts beacuse we dont wnat this style will conflict with other pages body beacuse it apply on the body
        return () => {
            document.body.classList.remove('specialBody');
        };
    }, [location.pathname]); 
    
      
 return(
    <div className={`container ${showchatbot ? "show-chatbot" : ""}`}> {/*show-chatbot is in the css for toggle*/}

     <button id="chatbot-toggler" onClick={()=>setshowchatbot(prev =>!prev)}>
        <span className="material-symbols-rounded">comment</span>
        <span className="material-symbols-rounded">close</span>
     </button>

        <div className={`chatbot-popup ${showchatbot ? "show-chatbot" : ""}`}>

            {/* chatbot header */}
            <div className="chat-header">
                <div className="header-info">
                    <ChatBoticon/>
                    <h1 className="logo-text ">Chatbot</h1>
                </div>
                       
                        <button className="bg-gray-300 material-symbols-outlined" 
                        onClick={()=>setshowchatbot(prev =>!prev)} >
                             keyboard_arrow_down
                        </button>
            </div>

            {/* chatbot body */}

                        <div ref={chatBodyref} className="chat-body bg-[#f0f4f8]">

                           <div className="message bot-message">
                            <ChatBoticon/>
                            <p className="message-text text-base font-normal">
                                hey there ✨<br />how can i help you today? 
                            </p>
                           </div>
  
                         {/* render the chat history dynamically   */}
                 {chathistory.map((chat, index) => {
                     return <Chatmessage key={index} chat={chat} />
                 })}

                </div>

           {/* chatbot footer */}
           <div className="chat-footer ">
            <ChatForm  chathistory={chathistory} setchathistory={setchathistory} generateBotresponse={generateBotresponse}/>
           </div>
            
        </div>
    </div>
 )
}

export default IndexChatbot



//toogler work in my code
// User sees closed chatbot (only button visible)
// Clicks button → showchatbot becomes true
// React re-renders component
// Chatbot popup appears (because showchatbot is true)
// User clicks again → showchatbot becomes false
// React re-renders again