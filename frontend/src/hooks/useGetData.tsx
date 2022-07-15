import { useEffect, useMemo, useState } from "react";

export const useGetData = <T, >(url: string, query?: URLSearchParams) => {
    const [data, setData] = useState<T | undefined>();
    const urlWithQuery = useMemo(() => query ? url + "?" + query.toString() : url, [query, url]);

    useEffect(() => {
        fetch(urlWithQuery, {
            method: "GET",
            mode: "cors"
        })
            .then(res => {
                if (res.ok) return res.json();
                else throw Error(`Network error ${res.statusText} (${res.status}) with ${res.type} request on ${res.url}.`);
            })
            .then(json => setData(json));
    }, [url, urlWithQuery]);

    return data;
};