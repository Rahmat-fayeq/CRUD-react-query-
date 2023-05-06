import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";
import { useMutation, useQueryClient } from "react-query";
import { addPost } from "../../api/post";

const AddPost = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["addPost"],
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (err: any) => {
      console.log(err.message);
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    mutate(data as any);
    reset();
  };

  return (
    <div className="flex justify-center">
      <div className="w-2/5 px-20 py-10 rounded-md border mt-2">
        <p className="font-semibold text-gray-400 my-1">Add New Post</p>
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
              label="Submit"
              onClick={handleSubmit(onSubmit)}
              disabled={false}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
