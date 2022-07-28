import React, { useEffect, useState } from "react";
import { KeycloakProfile } from "keycloak-js";
import { FaUser } from "react-icons/fa";
import { useKeycloak } from "../../tools/auth/KeycloakContext";

export const UserStatus = () => {
    const { keycloak } = useKeycloak();
    const [userInfo, setUserInfo] = useState<KeycloakProfile>();

    useEffect(() => {
        if (keycloak !== undefined) {
            keycloak.loadUserProfile().then((res) => setUserInfo(res));
        }
    }, [keycloak, setUserInfo]);

    if (keycloak === undefined) {
        return <></>;
    }

    if (!keycloak.authenticated) {
        return <a href={keycloak.createLoginUrl()}>
            <div className={"flex border rounded-full space-x-2"}>
                <p>login</p>
                <div className={"p-1 border rounded-full"}><FaUser color={"black"} /></div>
            </div>
        </a>;
    }

    return <div className={"flex border rounded-full items-center"}>
        <p className={"my-1 mx-2 whitespace-nowrap"}>{`Hi, ${userInfo?.username}!` ?? "unknown"}</p>
        <div className={"p-1 border rounded-full"}><FaUser color={"black"} /></div>
    </div>;
};