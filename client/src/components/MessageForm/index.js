import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_MESSAGE } from '../../utils/mutations';
import { Redirect } from 'react-router-dom';
// useEffect

const MessageForm = () => {

    const [ messageBody, setMessageBody] = useState('');
    const [ addMessage, { error }] = useMutation(ADD_MESSAGE);
    // const [ bikeId, setBikeId ] = useState('');
    // const [ submitted, setSubmitted] = useState(false); 

    let currentIdUrl = window.location.hash.split('/').splice(2).toString();

    function handleChange(event) {
        setMessageBody(event.target.value);
        // setBikeId(currentIdUrl);
    }

    async function handleFormSubmit(event) {
        event.preventDefault();

        console.log("handleform");

        try {
            await addMessage({
                variables: { bikeId: currentIdUrl, messageBody }
            });

            // setMessageBody('');
            // setBikeId('');
            // setSubmitted(true);
        window.location.href = 'http://localhost:3000/#/Search'
        //find method which does not reload page
        }
        catch (e) {
            console.error(e);
        }

    };

        // if (submitted === true) {
        //     // alert("Your message has been sent!");
        //     console.log("hello!!!!")
        //     return <Redirect to="/Search" />
        // }


    return (
        <div className="flex justify-center p-20">
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleFormSubmit}>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">Let user know what you know!</label>
                    <textarea className="border rounded-md outline" rows="8" cols="30" placeholder="type your message here!" onChange={handleChange}></textarea>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default MessageForm;