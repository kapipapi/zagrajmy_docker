import React, { useEffect, useState } from "react";
import { KeycloakProfile } from "keycloak-js";
import { FaUser } from "react-icons/fa";
import { useKeycloak } from "../../tools/auth/KeycloakContext";

export const UserStatus = () => {
    const { keycloak } = useKeycloak();
    const [userInfo, setUserInfo] = useState<KeycloakProfile>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (keycloak !== undefined && keycloak.authenticated) {
            keycloak.loadUserProfile().then((res) => setUserInfo(res));
        }
    }, [keycloak, setUserInfo]);

    if (keycloak === undefined) {
        return <></>;
    }

    const styles = {
        container: "flex bg-gray-200 items-center rounded-full space-x-2 p-1",
        text: "whitespace-nowrap pl-4 pr-3 text-md font-bold",
        icon: "h-full bg-white rounded-full p-1 md:h-10 md:w-10 overflow-hidden"
    };

    const UserIcon = () => {
        return <div className={styles.icon}>
            <FaUser color={"black"} className={"h-5 w-5 md:h-7 md:w-7 m-auto"} />
        </div>;
    };

    if (!keycloak.authenticated) {
        return <a href={keycloak.createLoginUrl()}>
            <div className={styles.container}>
                <p className={styles.text}>Login <span className={"hidden md:inline"}>or sign up!</span></p>
                <UserIcon />
            </div>
        </a>;
    }

    return <div className={styles.container}>
        <p className={styles.text}>{`Hi, ${userInfo?.username}!` ?? "unknown"}</p>
        <div className={`flex-row overflow-hidden space-x-3 pr-3 ${isOpen ? "flex" : "hidden"}`}>
            <a href={keycloak.createLogoutUrl()}><p>logout</p></a>
            <p>profile</p>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}><UserIcon /></button>
    </div>;
};