import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetchApi(url) {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(url);
                if (response.status === 200) {
                    setData(response.data);
                }
            } catch (err) {
                setError(err);
                setIsPending(false);
                throw err;
            }
        }
        fetchData();
        return () => {};
    }, [url]);

    return { data, isPending, error };
}
