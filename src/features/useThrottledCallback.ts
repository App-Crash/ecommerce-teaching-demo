// features/useThrottledCallback.ts
import {useRef, useCallback} from 'react';

export function useThrottledCallback(
    callback: () => void,
    interval: number
) : () => void{
    const lastTimeRef = useRef(0);

    return useCallback(() =>
    {
        const now = Date.now();
        if(now - lastTimeRef.current > interval)
        {
            lastTimeRef.current = now;
            callback();
        }
    }, [callback, interval]);

}