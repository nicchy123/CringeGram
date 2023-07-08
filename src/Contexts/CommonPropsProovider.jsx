import React, { createContext, useState } from 'react';
export const PropsProvider = createContext()
const CommonPropsProovider = ({children}) => {
const [loader, setLoader] = useState(false)
const [liked, setLiked] = useState(false);

    const props = {setLoader, loader,liked, setLiked}
    return (
        <div>
            <PropsProvider.Provider value={props}>{children}</PropsProvider.Provider>
        </div>
    );
};

export default CommonPropsProovider;