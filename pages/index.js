import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithubSquare,
  faInstagramSquare,
  faLinkedin,
  faTwitterSquare,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/layout';
import styles from '../styles/pages/home.module.scss';

export default function Home() {
  return (
    <Layout>
      <main className={`mainContent ${styles.aboutContainer}`}>
        <img
          src="/images/me-with-ginny.jpg"
          alt="Beth Qiang with her dog, Ginny"
          className={styles.mainImg}
        />
        <div className={styles.aboutTextContainer}>
          <p>
            Hi, I’m Beth!
          </p>
          <p>
            {'Currently based in Durham, NC, via Austin, Houston, and Cleveland. Alumna of '}
            <a
              href="https://www.rice.edu/"
              target="_blank"
              rel="noreferrer"
            >
              Rice University
            </a>
            {', '}
            <a
              href="https://www.fullstackacademy.com/"
              target="_blank"
              rel="noreferrer"
            >
              Fullstack Academy
            </a>
            {', and '}
            <a
              href="https://www.compassfellowships.org/"
              target="_blank"
              rel="noreferrer"
            >
              the Compass Fellowship
            </a>
            .
          </p>
          <p>
            Software engineer dabbling in design by day.
          </p>
          <p>
            Powerlifter, rock climber, outdoor enthusiast, dog mom,
            and shelter animal advocate otherwise.
          </p>
          <p>
            Intrigued by nature, photography, art, and making and eating good food.
          </p>
          <p>
            Seeking to make the world a more inclusive, accessible,
            representative, empowering, and compassionate place.
          </p>
        </div>
      </main>
      <div className={styles.socialContainer}>
        <a href="mailto:beth@bethqiang.com">
          <FontAwesomeIcon
            icon={faEnvelopeSquare}
            className={styles.socialIcon}
          />
        </a>
        <a href="https://github.com/bethqiang" target="_blank" rel="noreferrer">
          <FontAwesomeIcon
            icon={faGithubSquare}
            className={styles.socialIcon}
          />
        </a>
        <a href="https://www.linkedin.com/in/bethqiang08/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon
            icon={faLinkedin}
            className={styles.socialIcon}
          />
        </a>
        <a href="https://twitter.com/beth_qiang" target="_blank" rel="noreferrer">
          <FontAwesomeIcon
            icon={faTwitterSquare}
            className={styles.socialIcon}
          />
        </a>
        <a href="https://www.instagram.com/babsy.23/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon
            icon={faInstagramSquare}
            className={styles.socialIcon}
          />
        </a>
      </div>
    </Layout>
  );
}
