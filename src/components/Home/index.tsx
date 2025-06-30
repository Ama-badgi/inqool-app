import { Outlet, Link } from "react-router-dom";
import NavCard from "../NavCard";
import { FaUser, FaDog } from "react-icons/fa";

import "./style.css";

function Home() {
  return (
    <>
      <div className="home">
        <h1>Home Page</h1>
        <nav>
          <ul className="list">
            <li>
              <Link to="/users" className="list-card card-link">
                <NavCard title="Users" icon={<FaUser size={50} />} />
              </Link>
            </li>
            <li>
              <Link to="/animals" className="list-card card-link">
                <NavCard title="Animals" icon={<FaDog size={50} />} />
              </Link>
            </li>
          </ul>
        </nav>

        <Outlet />
      </div>
    </>
  );
}

export default Home;
