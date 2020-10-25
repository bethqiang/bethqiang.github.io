/* eslint-disable react/no-danger */

import Layout from '../components/layout';

import styles from '../styles/pages/work.module.scss';

const projects = [
  {
    title: 'organizing @ nextgen\u00A0america',
    img: '/images/organizing.png',
    altText: 'Screenshot of organizing.nextgenamerica.org, which is where volunteers onboard with the NextGen America Distributed Organizing Team',
    description: '<p>An offshoot from NextGen America’s main site, NextGen needed a place where volunteers could go to get started with volunteering.</p><p>The site houses instructions for getting started with both phonebanking and textbanking, an overview of Slack, and links out to NextGen’s Mobilize page so that volunteers can sign up for shifts.</p><p>All content & layout is editable by non-technical folks.</p>',
    link: 'https://organizing.nextgenamerica.org',
    roles: ['design', 'web development'],
    technologies: ['sketch', 'wordpress', 'mobilize api'],
  },
  {
    title: 'vote right now @ nextgen\u00A0america',
    img: '/images/voterightnow.png',
    altText: 'Screenshot of voterightnow.com, a site that allows people to check their voter registration status and receive information about their state-specific voting options',
    description: '<p>Distributed widely by social media influencers and NextGen\'s social media team, this site\'s goal was to empower people to register and vote as early as they possibly could.</p><p>This site enables people to check their voter registration status as well as receive information about their state-specific voting options, deadlines, and Board of Elections contact information.</p>',
    link: 'https://voterightnow.com',
    roles: ['web development'],
    technologies: ['html', 'css', 'javascript', 'jquery', 'phone2action civic action center'],
  },
  {
    title: 'other nextgen america\u00A0projects',
    img: '/images/insider.png',
    altText: 'Screenshot of page of numbers and statistics for national and state-level breakdowns of the number of people that NextGen America reached during the 2020 election cycle',
    description: '<ul><li><a href="https://nextgenamerica.org/insider/" target="_blank" rel="noreferral">Redesigned/updated Insider page</a>, which displays totals and breakdowns for the number of people NextGen America reached throughout the election cycle.</li><li><a href="https://nextgenamerica.org/voter-guide-directory/" target="_blank" rel="noreferral">Voter guides</a>, to inform voters of their state candidates and ballot measures.</li><li><a href="https://nextgenamerica.org/make-a-plan-to-vote/" target="_blank" rel="noreferral">Make a plan to vote guide</a>, to give voters all of the information they need to figure out how to request/return their mail-in ballots or vote in person.</li><li><a href="https://nextgenamerica.org/vote/" target="_blank" rel="noreferrer">NextGen America\'s election hub</a>, where people can check their voter registration status as well as receive information about their state-specific voting options, deadlines, Board of Elections contact information, and candidates. Integrated with Phone2Action\'s Civic Action Center and customized entirely for NextGen.</li></ul>',
    roles: ['design', 'web development'],
    technologies: ['sketch', 'wordpress', 'integrations with google sheet & phone2action civic action center'],
  },
];

export default function Work() {
  return (
    <Layout>
      <main className={`mainContent ${styles.workContainer}`}>
        { projects.map((project) => (
          <div className={styles.projectContainer}>
            <div className={styles.imgContainer}>
              <img
                src={project.img}
                alt={project.altText}
              />
            </div>
            <div className={styles.textContainer}>
              <h2>{project.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: project.description }} />
              {project.link && <a href={project.link}>link to project</a>}
              <p className={styles.subHeading}>roles</p>
              <p className={styles.text}>{project.roles.join(' | ')}</p>
              <p className={styles.subHeading}>technologies</p>
              <p className={styles.text}>{project.technologies.join(', ')}</p>
            </div>
          </div>
        ))}
      </main>
    </Layout>
  );
}
