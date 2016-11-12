import React from 'react';
import cssModules from 'react-css-modules';
import styles from './AboutPage.scss';


// Pages map directly to Routes, i.e. one page equals on Route

const AboutPage = (props) => (
  <div className={styles.container}>
    Hello from AboutPage !
  </div>
);

export default cssModules(AboutPage, styles);
