import { Container } from 'react-bootstrap';
import { FaGithub } from 'react-icons/fa';
import { FaLaptop } from 'react-icons/fa';
// import autor1 from '../assets/Pavel.jpeg';

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
    role: 'Team lead, scratch master and just developer',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTugu0kegXOT1Gh1sgDVHvYjkGW29w19Hl9gQ&s',
    about:
      'He began his career as a bank programmer, then transitioned into game development and website creation. Along the way, he worked on search engine optimization (SEO). Currently, he is a student learning frontend development.',
    contribution:
      'He organized the teams workflow, assisted with complex issues, maintained repository cleanliness, and addressed problems and questions during cross-check reviews. He handled integration with commercetools, project setup, catalog management, issue fixing post cross-checks, proposed implementation solutions for the team, and aimed to provide an understanding of real-world project work',
  },
  {
    name: 'Vladyslava',
    gitName: 'vlaru',
    linkToGit: 'https://github.com/vlaru',
    role: 'team-member',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTugu0kegXOT1Gh1sgDVHvYjkGW29w19Hl9gQ&s',
    about:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel iusto, aut quos sed nesciunt labore blanditiis aspernatur alias est non inventore velit, praesentium, laboriosam quas autem dicta sint ex itaque!',
    contribution: '',
  },
  {
    name: 'Veronika',
    gitName: 'ranika23',
    linkToGit: 'https://github.com/ranika23',
    role: 'team-member',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTugu0kegXOT1Gh1sgDVHvYjkGW29w19Hl9gQ&s',
    about:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel iusto, aut quos sed nesciunt labore blanditiis aspernatur alias est non inventore velit, praesentium, laboriosam quas autem dicta sint ex itaque!',
    contribution: '',
  },
];

export default function About() {
  return (
    <>
      <h1>About Us</h1>
      <Container>
        {dataAboutUs.map((el) => (
          <div
            className="d-flex shadow-lg m-5 p-2 rounded"
            key={el.name}
            style={{
              background: 'linear-gradient(0.25turn, #181b35, #b9f3ff)',
              color: '#000',
            }}
          >
            <div>
              <img src={el.img} alt="foto" />
            </div>
            <div className="p-3">
              <div className="d-flex">
                <h2 className="mr-5">{el.name}</h2>
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
      </Container>
    </>
  );
}
