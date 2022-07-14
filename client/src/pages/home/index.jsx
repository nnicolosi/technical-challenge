import './home.scss';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <div className="hero-body">
          <p className="title">Technical Challenge Implementation</p>
        </div>
      </div>
      <div className="container is-fullhd">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <Link className="tile is-child notification is-primary" to="/contacts">
              <article>
                <p className="title">Create</p>
                <p className="content">Make a new contact.</p>
              </article>
            </Link>
            <Link className="tile is-child notification is-primary" to="/contacts">
              <article>
                <p className="title">Read</p>
                <p className="content">View a list of all contacts.</p>
              </article>
            </Link>
            <Link className="tile is-child notification is-primary" to="/contacts">
              <article>
                <p className="title">Update</p>
                <p className="content">Modify an existing contact.</p>
              </article>
            </Link>
            <Link className="tile is-child notification is-primary" to="/contacts">
              <article>
                <p className="title">Delete</p>
                <p className="content">Remove an existing contact.</p>
              </article>
            </Link>
            <Link className="tile is-child notification is-primary" to="/call-list">
              <article>
                <p className="title">Call List</p>
                <p className="content">View contacts with home phone numbers.</p>
              </article>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
