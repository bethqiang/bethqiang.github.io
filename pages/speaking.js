import Layout from '../components/layout';

import styles from '../styles/pages/speaking.module.scss';

const talks = [{
  title: 'Unit Testing Vue Apps: Tips, Tricks, and Best Practices',
  date: 'June 2022',
  conference: 'VueConf.US',
  abstract: 'Unit testing is something you\'ve been told you should do, but have you ever wondered why? Or what you should test? Or how to test what you should test? In this talk, we\'ll break down the answers to all of these questions. We\'ll also talk about how to set up an easy-to-use framework for any Vue app so that your tests most accurately represent how a user would interact with your platform.',
  linkToSlides: 'https://docs.google.com/presentation/d/1qr0JXF78UbXPmp0thK2uqgxRwU0kXzE0zykAPC0rQsE/edit?usp=sharing',
  linkToDemoApp: 'https://vueconf-2022-demo-app.vercel.app/',
  linkToCode: 'https://github.com/bethqiang/vueconf-2022-demo-app',
  linkToRecording: 'https://www.vuemastery.com/conferences/vueconf-us-2022/unit-testing-vue-apps-tips-tricks-and-best-practices',
}, {
  title: 'How a Developer Can Break Your UI Component Library\'s Accessibility, and What to Do About It',
  date: 'March 2022',
  conference: 'axe-con',
  abstract: 'UI component libraries can speed up developers\' workflows significantly and unify branding across multiple projects. If your UI component library is accessible, that makes having an accessible website easier, but having accessible components doesn\'t also mean that your site is accessible. In this talk, we\'ll break down the decisions that library authors will have to make about what to include and enforce in their libraries, accessibility features that can be baked into libraries without compromising developer experience and component flexibility, and other considerations beyond the components themselves.',
  linkToSlides: 'https://docs.google.com/presentation/d/1JViPqg9eJJdOjrlLQyMOdTVDYbNubAJgP47AyTsr4n4/edit?usp=sharing',
  linkToDemoApp: 'https://axe-con-2022-demo.vercel.app/',
  linkToCode: 'https://github.com/bethqiang/axe-con-2022-demo',
  linkToRecording: 'https://www.deque.com/axe-con/sessions/how-a-developer-can-break-your-ui-component-librarys-accessibility-and-what-to-do-about-it/',
}];

export default function Speaking() {
  return (
    <Layout>
      <main className="mainContent">
        { talks.map((talk) => (
          <div key={talk.title} className={styles.talkContainer}>
            <h2>{talk.title}</h2>
            <p className={styles.subheading}>{`${talk.date} @ ${talk.conference}`}</p>
            <p>{talk.abstract}</p>
            <a href={talk.linkToSlides} className={styles.link}>slides</a>
            <a href={talk.linkToDemoApp} className={styles.link}>deployed demo app</a>
            <a href={talk.linkToCode} className={styles.link}>demo app code</a>
            {talk.linkToRecording
              && <a href={talk.linkToRecording} className={styles.link}>recording</a>}
          </div>
        ))}
      </main>
    </Layout>
  );
}
