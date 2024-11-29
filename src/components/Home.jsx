// import React, { useState } from "react";
// import { IoIosSend } from "react-icons/io";
// import {generateContent} from './Model'

// export default function Home() {
//     const [userInput , setUserInput] = useState('');
//     const [response , setResponse] = useState(''); // display response

//     const handleUserInput = (e) => {
//         setUserInput(e.target.value);
//     };

//     const handleClear = () => {
//         setUserInput('');
//         setResponse('');
//     }

//     const handleSubmit = async () => {
//         if(!userInput){ // validation for empty prompt
//             setResponse("Please enter a prompt..");
//             return;
//         }
//         try{
//             const res = await generateContent(userInput);
//             setResponse(res);
//         } catch(err){
//             setResponse("Failed to generate response")
//         }
//     }

//   return (
//     <div>
//         <button onClick={handleClear}>Clear</button>
//       <input 
//         type="text" 
//         value={userInput} 
//         onChange={handleUserInput}
//         placeholder="Type your message here.."
//         onKeyDown={handleSubmit}
//         />
//         <button onClick={handleSubmit}> <IoIosSend/> </button>
//         {/* display model response */}
//         {response && (
//             <div>
//                 <p>{response}</p>
//             </div>
//         )}
//     </div>
//   );
// }




import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { generateContent } from './Model';  // Import the generateContent function

export default function Home() {
    const [userInput, setUserInput] = useState('');  // State for user input
    const [response, setResponse] = useState('');    // State for storing AI response
    const [isLoading, setIsLoading] = useState(false); // State for showing loading indicator

    const handleUserInput = (e) => {
        setUserInput(e.target.value);  // Update user input as they type
    };

    const handleClear = () => {
        setUserInput('');
        setResponse('');
        setIsLoading(false); // Reset loading state when cleared
    };

    const handleSubmit = async () => {
        if (!userInput.trim()) {
            setResponse("Please enter a prompt..");
            return;
        }

        setIsLoading(true);  // Set loading state to true when submitting
        try {
            // Call the generateContent function with user input
            const res = await generateContent(userInput);
            setResponse(res);  // Update response with generated content
            setUserInput('');
        } catch (err) {
            setResponse("Failed to generate response");
            console.error("Error in generating response:", err);
        } finally {
            setIsLoading(false);  // Stop loading when finished
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {  // Check if the pressed key is Enter
            e.preventDefault();  // Prevent the default behavior (form submission)
            handleSubmit();       // Call handleSubmit to send the message
        }
    };

    return (
        <div>
            <button onClick={handleClear}>Clear</button>
            <input 
                type="text" 
                value={userInput} 
                onChange={handleUserInput}
                onKeyDown={handleKeyPress}  // Add the onKeyDown handler
                placeholder="Type your message here.."
            />
            <button onClick={handleSubmit}>
                <IoIosSend />
            </button>

            {/* Display loading state */}
            {isLoading && <p>Generating response...</p>}

            {/* Display model response */}
            {response && !isLoading && (
                <div>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
}
