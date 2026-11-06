import { useCallback, useEffect } from 'react';
import { useThrottledCallback } from '../features/useThrottledCallback';


export function ScrollPositionManager() {
    const throttledScrollLog = useThrottledCallback(() => {
        console.log('Scroll position Y: ', window.scrollY);
    }, 400);

    const handleScroll = useCallback(() => {
        throttledScrollLog();
    },[throttledScrollLog]);

    useEffect(() =>
    {
        window.addEventListener("scroll", handleScroll);

        return(() => {window.removeEventListener("scroll", handleScroll)});
    }, [handleScroll]);
    return null;
}