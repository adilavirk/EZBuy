import Container from "@/components/Container";
import Title from "@/components/Title";
import Wishlist from "@/components/Wishlist";

const page = () => {
  return (
    <Container>
      <Title title="Your Wishlist" />
      <Wishlist />
    </Container>
  );
};

export default page;
