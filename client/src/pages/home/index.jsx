import './home.scss';

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
            <article className="tile is-child notification is-primary">
              <p className="title">Create</p>
              <p className="content">Make a new contact.</p>
            </article>
            <article className="tile is-child notification is-primary">
              <p className="title">Read</p>
              <p className="content">View a list of all contacts.</p>
            </article>
            <article className="tile is-child notification is-primary">
              <p className="title">Update</p>
              <p className="content">Modify an existing contact.</p>
            </article>
            <article className="tile is-child notification is-primary">
              <p className="title">Delete</p>
              <p className="content">Remove an existing contact.</p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
