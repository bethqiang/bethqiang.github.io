import PropTypes from 'prop-types';

import { getAllPosts } from '../lib/api';
import { convertDate } from '../lib/utils';
import Layout from '../components/layout';

import styles from '../styles/pages/blog.module.scss';

export default function Blog({ allPosts }) {
  return (
    <Layout>
      <main className="mainContent">
        { allPosts.map((post) => (
          <div key={post.slug} className={styles.postContainer}>
            <a href={`/writing/${post.slug}`}>{post.title}</a>
            <h3>{post.subtitle}</h3>
            <h4>{convertDate(post.date)}</h4>
            <p>{post.excerpt}</p>
            <a href={`/writing/${post.slug}`} className={styles.continueReadingBtn}>continue reading</a>
          </div>
        ))}
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'subtitle',
    'excerpt',
  ]);
  return {
    props: { allPosts },
  };
}

Blog.propTypes = {
  allPosts: PropTypes.arrayOf(PropTypes.exact({
    date: PropTypes.string,
    excerpt: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
  })).isRequired,
};
