import { useEffect, useState } from "react";

export const useGetData = <T, >(url: string) => {
    const [data, setData] = useState<T | undefined>();

    useEffect(() => {
        fetch(url, {
            method: "GET",
            mode: "cors"
        })
            .then(res => {
                if (res.ok) return res.json();
                else throw Error(`Network error ${res.statusText} (${res.status}) with ${res.type} request on ${res.url}.`);
            })
            .then(json => setData(json));
    }, []);

    return data;
};