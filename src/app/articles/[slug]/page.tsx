type SlugRouteProps = {
  params: {
    slug: string;
  };
};

const Article = ({ params }: SlugRouteProps) => {
  return <div>Article Title: {params.slug}</div>;
};

export default Article;
