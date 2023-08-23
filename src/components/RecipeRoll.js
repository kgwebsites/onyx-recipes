import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

export class RecipeRollTemplate extends React.Component {
  render() {
    const { data } = this.props;
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
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default function BlogRoll() {
  return (
    <StaticQuery
      query={graphql`
        query RecipeRollQuery {
          allMarkdownRemark(
            sort: { frontmatter: { date: DESC } }
            filter: { frontmatter: { templateKey: { eq: "recipe-page" } } }
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
                  description
                  templateKey
                  date(formatString: "MMMM DD, YYYY")
                  featuredpost
                  image {
                    childImageSharp {
                      gatsbyImageData(
                        width: 120
                        quality: 100
                        layout: CONSTRAINED
                      )
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data, count) => <RecipeRollTemplate data={data} count={count} />}
    />
  );
}
