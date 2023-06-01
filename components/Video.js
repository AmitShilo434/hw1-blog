import { useRouter } from 'next/router';

const VideoComp = ({ item }) => {
  const router = useRouter();
  const { itemId } = router.query;

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{item.title}</h2>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { itemId } = context.query;
  const res = await fetch(`/api/items/${itemId}`);
  const data = await res.json();

  return {
    props: {
      item: data,
    },
  };
}

export default VideoComp;