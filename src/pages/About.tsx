import { Container } from "react-bootstrap"

interface AboutData {
  name: string;
  linkToGit: string;
  role: string;
  img: string;
  description: string;
}

const dataAboutUs: AboutData[] = [
  {
    name: 'Pavel',
    linkToGit: 'link',
    role: 'team',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTugu0kegXOT1Gh1sgDVHvYjkGW29w19Hl9gQ&s',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel iusto, aut quos sed nesciunt labore blanditiis aspernatur alias est non inventore velit, praesentium, laboriosam quas autem dicta sint ex itaque!',
  },
  {
    name: 'Vladyslava',
    linkToGit: 'link',
    role: 'team',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTugu0kegXOT1Gh1sgDVHvYjkGW29w19Hl9gQ&s',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel iusto, aut quos sed nesciunt labore blanditiis aspernatur alias est non inventore velit, praesentium, laboriosam quas autem dicta sint ex itaque!',
  },
  {
    name: 'Veronika',
    linkToGit: 'link',
    role: 'team',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTugu0kegXOT1Gh1sgDVHvYjkGW29w19Hl9gQ&s',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel iusto, aut quos sed nesciunt labore blanditiis aspernatur alias est non inventore velit, praesentium, laboriosam quas autem dicta sint ex itaque!',
  },
];

export default function About() {
  return (
    <>
      <h1>About Us</h1>
      <Container>
        {dataAboutUs.map((el) => (
          <div className="d-flex shadow-lg bg-light m-5 p-2" key={el.name}>
            <div>
              <img src={el.img} alt="foto" />
            </div>
            <div className="p-3">
              <div className="d-flex">
                <h2>{el.name}</h2>
                <a href={el.linkToGit}>
                  <img src="" alt="" />
                  link to github
                </a>
              </div>
              <h3>Role</h3>
              <p>{el.description}</p>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
}
