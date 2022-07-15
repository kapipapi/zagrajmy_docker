import React from "react";

type IN = string | FormData;

export const sendData = <OUT, >(url: string, data: IN, headers?: HeadersInit): Promise<OUT> => {
    return fetch(url, {
        method: "POST",
        mode: "cors",
        body: data,
        headers: headers
    }).then(res => {
        if (res.ok) return res.json();
        else throw Error(`Network error ${res.statusText} (${res.status}) with ${res.type} request on ${res.url}.`);
    });
};
