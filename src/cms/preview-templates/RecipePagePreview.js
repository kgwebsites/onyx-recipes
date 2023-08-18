import React from "react";
import PropTypes from "prop-types";
import { RecipePageTemplate } from "../../templates/recipe-page";

const RecipePagePreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(["data", "tags"]);
  return (
    <RecipePageTemplate
      content={widgetFor("body")}
      description={entry.getIn(["data", "description"])}
      tags={tags && tags.toJS()}
      title={entry.getIn(["data", "title"])}
    />
  );
};

RecipePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default RecipePagePreview;
