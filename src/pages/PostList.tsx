import Container from "../components/Container";
import AddPost from "../components/Post/AddPost";
import ShowPosts from "../components/Post/ShowPosts";

const PostList = () => {
  return (
    <Container>
      <AddPost />
      <hr className="my-2" />
      <ShowPosts />
    </Container>
  );
};

export default PostList;
