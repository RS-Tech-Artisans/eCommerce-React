import React from 'react';
import { FaGithub, FaLaptop } from 'react-icons/fa';
import { AuthorCardProps } from '../utils/Interfaces';

const AuthorCard: React.FC<AuthorCardProps> = ({
  name,
  gitName,
  linkToGit,
  role,
  img,
  about,
  contribution,
}) => {
  return (
    <div
      className="container-author"
      style={{ background: '#FFF', color: '#000' }}
    >
      <div className="img-container">
        <img src={img} alt="foto" className="img-authors" />
      </div>
      <div className="p-3">
        <div className="d-flex">
          <h2 className="name-title">{name}</h2>
          <div>
            <a href={linkToGit} style={{ fontSize: '25px', color: 'black' }}>
              <FaGithub />
              <span>{gitName}</span>
            </a>
          </div>
        </div>
        <h3>
          <span className="fw-bold">Role:</span> {role} <FaLaptop />
        </h3>
        <p>
          <span className="fw-bold">About:</span> {about}
        </p>
        <p>
          <span className="fw-bold">Contribution:</span> {contribution}
        </p>
      </div>
    </div>
  );
};

export default AuthorCard;
