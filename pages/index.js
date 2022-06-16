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
            Hi, I&apos;m Beth!
          </p>
          <p>
            Senior Software Engineer and Tech/Team Lead by day.
            Lean front end and
            have an affinity for creating beautiful and functional user experiences.
          </p>
          <p>
            {'Based in the Denver metro area. Alumna of '}
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
            Rock climber, hiker, skier, general outdoor enthusiast,
            dog mom, shelter animal advocate in my free time.
          </p>
          <p>
            Seeking to make the world a more inclusive, accessible,
            representative, empowering, and compassionate place.
          </p>
          <p>
            I really love and care deeply about helping folks get into and stay in tech.
            If you&apos;re:
          </p>
          <ul>
            <li>from an underrepresented and/or marginalized group and</li>
            <li>an early-career engineer or a recent bootcamp grad and</li>
            <li>looking for mentorship, advice, project/resume/interview help</li>
          </ul>
          <p>
            Send me a message and let&apos;s chat!
          </p>
        </div>
      </main>
      <div className={styles.socialContainer}>
        <a href="mailto:bqiang08@gmail.com">
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
