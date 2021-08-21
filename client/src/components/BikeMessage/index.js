import React from 'react';

const BikeMessage = ( {messages } ) => {

    return (
        <div className="container text-center">
            <div>
                {messages &&
                    messages.map(message => (
                        <p className="" key={message._id}>
                        {message.messageBody}
                        </p>
                    ))}
            </div>
        </div>
    )
}

export default BikeMessage;