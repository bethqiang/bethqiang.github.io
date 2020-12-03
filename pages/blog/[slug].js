import PropTypes from 'prop-types';

import { getPostBySlug, getAllPosts } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';
import { convertDate } from '../../lib/utils';
import Layout from '../../components/layout';

import styles from '../../styles/pages/[slug].module.scss';

export default function Post({ post }) {
  return (
    <Layout>
      <main className="mainContent">
        <div className={styles.postContainer}>
          <h1>{post.title}</h1>
          <h4>{convertDate(post.date)}</h4>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content',
  ]);
  const content = await markdownToHtml(post.content || '');
  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.string).isRequired,
};
