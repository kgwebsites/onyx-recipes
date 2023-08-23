import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

// eslint-disable-next-line
export const RecipesPageTemplate = ({ data }) => {
  console.log("template", data);
  const { edges: recipes } = data.allMarkdownRemark;

  return (
    <div className="columns is-multiline">
      {recipes &&
        recipes.map(({ node: recipe }) => (
          <div className="is-parent column is-6" key={recipe.id}>
            <article
              className={`blog-list-item tile is-child box notification ${
                recipe.frontmatter.featuredpost ? "is-featured" : ""
              }`}
            >
              <header>
                {recipe.frontmatter.image ? (
                  <div className="featured-thumbnail">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: recipe.frontmatter.image,
                        alt: `featured image thumbnail for post ${recipe.frontmatter.title}`,
                        width:
                          recipe.frontmatter.image.childImageSharp
                            .gatsbyImageData.width,
                        height:
                          recipe.frontmatter.image.childImageSharp
                            .gatsbyImageData.height,
                      }}
                    />
                  </div>
                ) : null}
                <p className="post-meta">
                  <Link
                    className="title has-text-primary is-size-4"
                    to={recipe.fields.slug}
                  >
                    {recipe.frontmatter.title}
                  </Link>
                  <span> &bull; </span>
                  <span className="subtitle is-size-5 is-block">
                    {recipe.frontmatter.date}
                  </span>
                </p>
              </header>
              <p>
                <Link className="button" to={recipe.fields.slug}>
                  See Recipe →
                </Link>
              </p>
            </article>
          </div>
        ))}
    </div>
  );
};

const RecipesPage = ({ data }) => {
  console.log("recipes page", data);
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
            <RecipesPageTemplate data={data} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

RecipesPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            excerpt: PropTypes.string,
            id: PropTypes.string,
            fields: PropTypes.shape({
              slug: PropTypes.string,
            }),
            frontmatter: PropTypes.shape({
              title: PropTypes.string,
              description: PropTypes.string,
            }),
          }),
        })
      ),
    }),
  }),
};

export default RecipesPage;

export const pageQuery = graphql`
  query RecipePageQuery($date: Date!) {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: { templateKey: { eq: "recipe-page" }, date: { lt: $date } }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            featuredpost
            image {
              childImageSharp {
                gatsbyImageData(width: 120, quality: 100, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;
