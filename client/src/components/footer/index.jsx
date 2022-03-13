import bulmaLogo from '../../images/bulma-logo.png';
import flatIconLogo from '../../images/flaticon-logo.png';
import nestJsLogo from '../../images/nestjs-logo.png';
import nodeJsLogo from '../../images/nodejs-logo.png';
import postgreSqlLogo from '../../images/postgresql-logo.png';
import reactJsLogo from '../../images/reactjs-logo.png';
import './footer.scss';

const Footer = () => {
  return (
    <footer className="footer is-light">
      <div className="content has-text-centered">
        <div className="framework-logo">
          <img src={reactJsLogo} alt="React.js Logo" />
        </div>
        <div className="framework-logo">
          <img src={bulmaLogo} alt="Bulma Logo" />
        </div>
        <div className="framework-logo">
          <img src={nodeJsLogo} alt="Node.js Logo" />
        </div>
        <div className="framework-logo">
          <img src={nestJsLogo} alt="Nest.js Logo" />
        </div>
        <div className="framework-logo">
          <img src={postgreSqlLogo} alt="PostgreSQL Logo" />
        </div>
        <div className="framework-logo scale-down">
          <img src={flatIconLogo} alt="Flaticon Logo" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
