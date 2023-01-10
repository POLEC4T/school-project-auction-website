import React from 'react';


function Separator(props) {

    return (
        <div className='flex flex-row justify-around gap-4'>
            <div className="h-0.5 w-48 bg-black rounded-md grow"></div>
            <p className='-translate-y-3 font-gochi'>{props.content}</p>
            <div className="h-0.5 w-48 bg-black rounded-md grow"></div>
        </div>
    );
}

export default Separator;