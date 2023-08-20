import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Helmet } from "react-helmet";
import { kebabCase } from "lodash";
import Layout from "../components/Layout";

// eslint-disable-next-line
export const RecipePageTemplate = ({
  title,
  date,
  image,
  description,
  helmet,
  body,
  tags,
}) => {
  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <GatsbyImage
              image={getImage(image)}
              alt={title}
              formats={["auto", "webp", "avif"]}
            />
            <p>{date}</p>
            <p>{description}</p>
            {body ? (
              <>
                <div dangerouslySetInnerHTML={{ __html:body }} />
              </>
            ) : null}
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

RecipePageTemplate.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  body: PropTypes.string,
  image: PropTypes.object,
};

const RecipePage = ({ data }) => {
  const { markdownRemark: recipe } = data;

  return (
    <Layout>
      <RecipePageTemplate
        description={recipe.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${recipe.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${recipe.frontmatter.description}`}
            />
          </Helmet>
        }
        body={recipe.html}
        tags={recipe.frontmatter.tags}
        title={recipe.frontmatter.title}
        image={recipe.frontmatter.image}
      />
    </Layout>
  );
};

RecipePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default RecipePage;

export const pageQuery = graphql`
  query RecipePageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
      }
      html
    }
  }
`;
