export type Post = {
    user_id: number
    id: number
    title: string
    body: string
}

export type Posts = Post[] | undefined;