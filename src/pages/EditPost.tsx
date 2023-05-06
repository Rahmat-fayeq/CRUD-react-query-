import { FieldValues, useForm } from "react-hook-form";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { IPost } from "../components/Post/ShowPosts";
import { editPost, fetchPost } from "../api/post";
import Container from "../components/Container";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // update post
  const { mutate } = useMutation({
    mutationKey: ["updatePost"],
    mutationFn: editPost,
    onSuccess: () => {
      navigate("/");
    },
    onError: (err: any) => {
      console.log(err.message);
    },
  });

  // Get a post
  const { data, isError, isLoading } = useQuery({
    queryKey: ["post", id, "edit"],
    queryFn: () => fetchPost(id as string),
  });
  const post = (data as IPost) ?? {};
  // form hook
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: post.title,
      description: post.description,
    },
  });
  console.log(getValues());
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: Something is wrong</span>;
  }

  const onSubmit = (data: any) => {
    mutate({ ...data, id });
  };

  return (
    <Container>
      <button
        onClick={() => navigate("/")}
        className="bg-yellow-500 mt-10 text-white px-4 py-2 rounded-sm hover:bg-yellow-400 cursor-pointer"
      >
        Go back
      </button>
      <div className="flex justify-center">
        <div className="w-2/4 px-20 py-10 rounded-md border mt-2">
          <p className="font-semibold text-gray-400 my-1">Edit Post</p>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col  gap-4">
              <Input
                type="text"
                errors={errors}
                id="title"
                label="Title"
                register={register}
                disabled={false}
                required
              />
              <Input
                type="text"
                errors={errors}
                id="description"
                label="Description"
                register={register}
                disabled={false}
                required
              />
              <Button
                label="Update"
                onClick={handleSubmit(onSubmit)}
                disabled={false}
              />
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default EditPost;
