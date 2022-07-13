import React from "react";

export const sendData = <IN, OUT>(url: string, data: IN): Promise<OUT> => {
    return fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(res => {
        if (res.ok) return res.json();
        else throw Error(`Network error ${res.statusText} (${res.status}) with ${res.type} request on ${res.url}.`);
    });
};
