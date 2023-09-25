import { Tag } from "components";

// user imports
import { notFound } from "next/navigation";
import { ClientResponseError } from "pocketbase";
import { ExpandCollection, convertPBDateToDate, getFirstListItem, getFullList, getUrl } from "pocketbase-lib";

/** A blog post. */
export interface PostDetails {
    /** The title of the post. */
    title: string;

    /** The description of the post. */
    description: string;

    /** The post image `src`. */
    image_src: string;

    /** The post image `alt` text. */
    image_alt: string;

    /** The post date. */
    date: string;

    /** The post tag(s). */
    tags: Tag[];

    /** The post slug. */
    slug: string;
}

export interface PostBody {
    /** The post body. */
    body: string;
}

export type Post = PostDetails & PostBody;

/** Gets a post by its `slug`. */
export async function getPost(slug: string): Promise<Post | null> {
    try {
        const post = await getFirstListItem("posts", `slug="${slug}"`, { expand: ["categories"] });
        return convertPBPostToPost(post);
    } catch (error) {
        handleError(error);
    }
    return null;
}

/** Gets all post details. */
export async function getPosts(): Promise<PostDetails[] | null> {
    try {
        const posts = await getFullList("posts", { sort: "-date", expand: ["categories"] });
        let res = [] as PostDetails[];
        posts.forEach((post) => res.push(convertPBPostToPostDetails(post)));
        return res;
    } catch (error) {
        handleError(error);
    }
    return null;
}

/** Gets all post tags. */
export async function getPostTags(): Promise<Tag[] | null> {
    try {
        const tags = await getFullList("post_categories", { sort: "+name" });
        let res = [] as Tag[];
        tags.forEach((tag) => res.push({ id: tag.id, name: tag.name }));
        return res;
    } catch (error) {
        handleError(error);
    }
    return null;
}

/** Handle errors. */
function handleError(error: any) {
    if (error instanceof ClientResponseError && error.status === 404) notFound();
}

/** Converts a PB Post to a `Post`. */
function convertPBPostToPost(post: ExpandCollection<"posts", { expand: ["categories"] }>) {
    return { ...convertPBPostToPostDetails(post), ...{ body: post.body } };
}

/** Converts a PB Post to a `PostDetails`. */
function convertPBPostToPostDetails(post: ExpandCollection<"posts", { expand: ["categories"] }>) {
    return {
        title: post.title,
        description: post.description,
        image_src: getUrl(post, post.image),
        image_alt: post.image_alt,
        date: convertPBDateToDate(post.date) ?? "",
        tags: post.expand.categories.map((category) => ({ id: category.id, name: category.name })),
        slug: post.slug,
    };
}