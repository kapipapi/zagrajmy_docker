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

    const styles = {
        container: "flex bg-gray-200 items-center rounded-full space-x-2 p-1 group",
        text: "whitespace-nowrap pl-4 pr-3 text-md",
        icon: "h-full bg-white rounded-full p-1 h-10 w-10 overflow-hidden"
    };

    const UserIcon = () => {
        return <div className={styles.icon}>
            <FaUser color={"black"} className={"h-7 w-7 m-auto"} />
        </div>;
    };

    if (!keycloak.authenticated) {
        return <a href={keycloak.createLoginUrl()}>
            <div className={styles.container}>
                <p className={styles.text}>Login or sign up!</p>
                <UserIcon />
            </div>
        </a>;
    }

    return <div className={styles.container}>
        <p className={styles.text}>{`Hi, ${userInfo?.username}!` ?? "unknown"}</p>
        <div className={"flex-row hidden group-hover:flex space-x-4 pr-2"}>
            <a href={keycloak.createLogoutUrl()}><p>logout</p></a>
            <p>profile</p>
        </div>
        <UserIcon />
    </div>;
};