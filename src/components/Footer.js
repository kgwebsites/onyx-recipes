import * as React from "react";
import { Link } from "gatsby";

import logo from "../img/logo.png";

const Footer = class extends React.Component {
  render() {
    return (
      <footer className="footer has-background-black has-text-white-ter columns">
        <div className="column is-6 columns">
          <div className="column is-4"></div>
          <div className="column">
            <div className="content has-text-centered is-flex is-flex-direction-column is-justify-content-center">
              <img src={logo} alt="Onyx Recipes" />
            </div>
          </div>
        </div>
        <div className="content has-text-centered has-background-black has-text-white-ter column is-6">
          <div className="container has-background-black has-text-white-ter">
            <div style={{ maxWidth: "100vw" }} className="columns">
              <div className="column is-2"></div>
              <div className="column is-4">
                <section className="menu">
                  <ul className="menu-list">
                    <li>
                      <Link to="/" className="navbar-item">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/recipes">
                        Recipes
                      </Link>
                    </li>
                    <li>
                      <Link className="navbar-item" to="/contact">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="column is-4 social">
                {/* <a title="instagram" href="https://instagram.com">
                  <img
                    src={instagram}
                    alt="Instagram"
                    style={{ width: "1em", height: "1em" }}
                  />
                </a> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
};

export default Footer;
