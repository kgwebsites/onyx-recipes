import * as React from "react";

import Layout from "../../components/Layout";
import RecipeRoll from "../../components/RecipeRoll";

export default class RecipesIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/blog-index.jpg')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: "0.5rem 0 0 rgb(22 97 17), -0.5rem 0 0 rgb(22 97 17)",
              backgroundColor: "rgb(22 97 17)",
              color: "white",
              padding: "1rem",
            }}
          >
            Latest Recipes
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <RecipeRoll />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}
