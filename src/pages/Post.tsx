import { useNavigate, useParams } from "react-router-dom";
import Container from "../components/Container";
import { useMutation, useQuery } from "react-query";
import { DeletePost, fetchPost } from "../api/post";
import { IPost } from "../components/Post/ShowPosts";

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch the post
  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id as string),
  });
  const post = (data as IPost) ?? [];

  // Delete the post

  const { mutate } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: (id: string) => DeletePost(id),
    onSuccess: () => {
      navigate("/");
    },
    onError: (err: any) => {
      console.log(err.message);
    },
  });

  const handleDelete = (id: string) => {
    mutate(id);
  };

  if (isLoading) {
    return <span>Loading ...</span>;
  }
  if (isError) {
    return <span>Error: Something is wrong</span>;
  }

  return (
    <Container>
      <button
        onClick={() => navigate("/")}
        className="bg-yellow-500 mt-10 text-white px-4 py-2 rounded-sm hover:bg-yellow-400 cursor-pointer"
      >
        Go back
      </button>
      <div className="flex justify-center items-center mt-5">
        <div className="relative w-full">
          <div className="bg-gray-100 p-8 rounded-md mt-5">
            <p className="font-semibold text-lg text-gray-600">{post.title}</p>
            <hr className="my-4" />
            <p className="font-normal text-lg text-gray-500">
              {post.description}
            </p>
          </div>
          <div
            className="absolute top-0 right-0 hover:cursor-pointer"
            onClick={() => navigate(`/post/${post.id}/edit`)}
          >
            <p className="bg-sky-500 text-white rounded-full px-3 flex items-center justify-center text-lg">
              √
            </p>
          </div>
          <div
            className="absolute top-0 right-10 hover:cursor-pointer"
            onClick={() => handleDelete(id as string)}
          >
            <p className="bg-rose-500 text-white rounded-full px-3 flex items-center justify-center text-lg">
              x
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Post;
