'use client';

import React, {useEffect} from 'react';

type KeyBindListenerProps = {
    targetKey: string;
    callback: () => void;
};

const KeyBindListener: React.FC<KeyBindListenerProps> = ({targetKey, callback}) => {
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === targetKey) {
                event.preventDefault();
                callback();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [callback, targetKey]);

    return null;
};

export default KeyBindListener;
