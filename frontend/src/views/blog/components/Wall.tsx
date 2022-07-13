import React from "react";
import { useGetData } from "../../../hooks/useGetData";
import { Post, Posts } from "../models/Post";

type PostComponentProps = {
    post: Post
}

const PostComponent = ({ post }: PostComponentProps) => {
    return <div className={"flex flex-col w-1/2 p-2 justify-self-end rounded bg-indigo-500 text-white"}>
        <span className={"text-xl"}>{post.title}</span>
        <span className={"text-md"}>{post.body}</span>
    </div>;
};

export const Wall = () => {
    const posts = useGetData<Posts>("http://localhost:8080/api/posts");

    return <div className={"flex flex-col flex-wrap space-y-5"}>
        {posts &&
            posts.map((post) => {
                return <><PostComponent post={post} /><PostComponent post={post} /></>;
            })
        }
    </div>;
};