import React from "react";
import PropTypes from "prop-types";
import { RecipePageTemplate } from "../../templates/recipe-page";

const RecipePagePreview = ({ entry, widgetFor }) => {
  let ingredients = [];
  let steps = [];
  try {
    ingredients = JSON.parse(
      JSON.stringify(entry.getIn(["data", "ingredients"]))
    ) || []
    steps = JSON.parse(JSON.stringify(entry.getIn(["data", "steps"]))) || []
  } catch (e) {
    //
  }
  return (
    <RecipePageTemplate
      description={entry.getIn(["data", "description"])}
      tags={entry.getIn(["data", "tags"])}
      title={entry.getIn(["data", "title"])}
      date={entry.getIn(["data", "date"])?.toDateString()}
      ingredients={ingredients}
      steps={steps}
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
