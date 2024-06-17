import './About.css';
import { Container } from 'react-bootstrap';
import { FaGithub } from 'react-icons/fa';
import { FaLaptop } from 'react-icons/fa';
import autor1 from '../assets/Pavel.jpeg';
import autor2 from '../assets/Vlada.jpg';
import autor3 from '../assets/Veronika.jpeg';

interface AboutData {
  name: string;
  gitName: string;
  linkToGit: string;
  role: string;
  img: string;
  about: string;
  contribution: string;
}

const dataAboutUs: AboutData[] = [
  {
    name: 'Pavel',
    gitName: 'guz86',
    linkToGit: 'https://github.com/guz86',
    role: 'Team lead, scratch master and just developer.',
    img: autor1,
    about:
      'He began his career as a bank programmer, then transitioned into game ' +
      'development and website creation. Along the way, he worked on search ' +
      'engine optimization (SEO). Currently, he is a student learning frontend ' +
      'development.',
    contribution:
      'He organized the teams workflow, assisted with complex issues, maintained ' +
      'repository cleanliness, and addressed problems and questions during ' +
      'cross-check reviews. He handled integration with commercetools, project ' +
      'setup, catalog management, issue fixing post cross-checks, proposed ' +
      'implementation solutions for the team, and aimed to provide an understanding ' +
      'of real-world project work.',
  },
  {
    name: 'Vladyslava',
    gitName: 'vlaru',
    linkToGit: 'https://github.com/vlaru',
    role: 'Team-member.',
    img: autor2,
    about:
      'I am a self-taught programmer from scratch. Before I began my learning, ' +
      'I worked as a self-employed in the textile workshop field. Earlier, I ' +
      'had worked in a bank in the department "quality manager of customer".',
    contribution:
      'Actively participated in the site development process, worked with the ' +
      'products detail page, worked on the navigation bar and page routing, ' +
      'searching products bar, applying promocode for total price, project setup.',
  },
  {
    name: 'Veronika',
    gitName: 'ranika23',
    linkToGit: 'https://github.com/ranika23',
    role: 'Team-member.',
    img: autor3,
    about:
      'Main current area: technical support and support for clients in the banking ' +
      'sector in terms of resolving situations related to the unsuccessful completion ' +
      'of client transactions using bank payment cards. I am currently actively ' +
      'mastering web development, because I see this direction as very interesting ' +
      'for myself.',
    contribution:
      'Actively participated in the site development process, made a great ' +
      'contribution to the implementation of the login page and registration page, ' +
      'wrote and covered code tests on Jest.',
  },
];

export default function About() {
  return (
    <>
      <h1 className="about-title">About Us</h1>
      <Container>
        {dataAboutUs.map((el) => (
          <div
            className="container-author"
            key={el.name}
            style={{
              background: '#FFF',
              color: '#000',
            }}
          >
            <div className="img-container">
              <img src={el.img} alt="foto" className="img-authors" />
            </div>
            <div className="p-3">
              <div className="d-flex">
                <h2 className="name-title">{el.name}</h2>
                <div>
                  <a
                    href={el.linkToGit}
                    style={{ fontSize: '25px', color: 'black' }}
                  >
                    <FaGithub />
                    <span>{el.gitName}</span>
                  </a>
                </div>
              </div>
              <h3>
                <span className="fw-bold">Role:</span> {el.role} <FaLaptop />
              </h3>
              <p>
                <span className="fw-bold">About:</span> {el.about}
              </p>
              <p>
                <span className="fw-bold">Contribution:</span> {el.contribution}
              </p>
            </div>
          </div>
        ))}

        <h2>
          This team consists of people who are seriously pursuing their goal and
          are ready to go to the end. Excellent teamwork and the concept that
          everyone is responsible for the result are key to refining the
          creation of this site.
        </h2>

        <a
          href="https://rs.school/courses/javascript-ru"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="about-logo"></div>
        </a>
      </Container>
    </>
  );
}
