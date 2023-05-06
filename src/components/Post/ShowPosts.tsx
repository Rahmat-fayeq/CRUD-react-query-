import { useMutation, useQuery, useQueryClient } from "react-query";
import { DeletePost, fetchPosts } from "../../api/post";
import Container from "../Container";
import { useNavigate } from "react-router-dom";

export interface IPost {
  id: string;
  title: string;
  description: string;
}

const ShowPosts = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // fetch posts
  const { data, isError, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  const posts = (data as IPost[]) ?? [];

  // handle delete post
  const { mutate } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: (id: string) => DeletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (err: any) => {
      console.log(err.message);
    },
  });

  const handleDelete = (id: string) => {
    mutate(id);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: Something is wrong</span>;
  }
  return (
    <Container>
      {posts.map((post: IPost) => (
        <div key={post.id} className="flex justify-center items-center">
          <div className="relative bg-gray-100 p-8 rounded-md mt-5 w-2/4">
            <div
              className="hover:cursor-pointer"
              onClick={() => navigate(`post/${post.id}`)}
            >
              <p className="font-semibold text-lg text-gray-600">
                {post.title}
              </p>
            </div>
            <div
              className="absolute top-[-7px] right-10 hover:cursor-pointer"
              onClick={() => navigate(`post/${post.id}/edit`)}
            >
              <p className="bg-sky-500 text-white rounded-full px-3 flex items-center justify-center text-lg">
                √
              </p>
            </div>
            <div
              className="absolute top-[-7px] right-[-5px] hover:cursor-pointer"
              onClick={() => handleDelete(post.id)}
            >
              <p className="bg-rose-500 text-white rounded-full px-3 flex items-center justify-center text-lg">
                x
              </p>
            </div>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default ShowPosts;
