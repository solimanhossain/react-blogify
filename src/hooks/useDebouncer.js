import { useState, useEffect } from "react";

export default function useDebouncer(inputValue, delay) {
    const [debouncedValue, setDebouncedValue] = useState(inputValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, delay]);

    return debouncedValue;
}
