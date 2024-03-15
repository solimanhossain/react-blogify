import axios from "axios";
import { useAuth, useProfile } from "../hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogInfo from "../components/SingleBlog/BlogInfo";
import ShowComment from "../components/SingleBlog/ShowComment";
import FloatActions from "../components/SingleBlog/FloatActions";
import CommentEdit from "../components/SingleBlog/CommentEdit";
import ProfileAvatar from "../components/profile/ProfileAvatar";

export default function SingleBlog() {
    const parms = useParams();
    const [blog, setBlog] = useState({});
    const { state } = useProfile();
    const { auth } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/blogs/${parms.blogId}`
            );
            if (response.status === 200) {
                setBlog(response.data);
            }
        };

        fetchProfile();
    }, [parms, setBlog]);

    return (
        <>
            <main>
                <section>
                    <div className="container text-center py-8">
                        <h1 className="font-bold text-3xl md:text-5xl">
                            {blog?.title}
                        </h1>
                        <BlogInfo blog={blog} />
                        <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
                            {blog?.content}
                        </div>
                    </div>
                </section>

                <section id="comments">
                    <div className="mx-auto w-full md:w-10/12 container">
                        <h2 className="text-3xl font-bold my-8">
                            Comments ({blog?.comments?.length})
                        </h2>

                        {auth?.user?.id && (
                            <div className="flex items -center space-x-4">
                                <ProfileAvatar
                                    user={state?.user ?? auth?.user}
                                />
                                <CommentEdit blog={blog} setBlog={setBlog} />
                            </div>
                        )}

                        {blog?.comments?.length === 0 ? (
                            <p className="text-slate-300">No comments yet.</p>
                        ) : (
                            blog?.comments?.map((comment) => (
                                <ShowComment
                                    key={comment.id}
                                    comment={comment}
                                    blogId={blog?.id}
                                    del={auth?.user?.id === comment?.author?.id}
                                    setBlog={setBlog}
                                />
                            ))
                        )}
                    </div>
                </section>
            </main>

            <div className="floating-action">
                <FloatActions blog={blog} />
            </div>
        </>
    );
}
