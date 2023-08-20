import React from "react";
import PropTypes from "prop-types";
import { RecipePageTemplate } from "../../templates/recipe-page";
import showdown from 'showdown';

const converter = new showdown.Converter();

const RecipePagePreview = ({ entry }) => {
  return (
    <RecipePageTemplate
      description={entry.getIn(["data", "description"])}
      tags={entry.getIn(["data", "tags"])}
      title={entry.getIn(["data", "title"])}
      date={entry.getIn(["data", "date"])?.toDateString()}
      body={converter.makeHtml(entry.getIn(["data", "body"]))}
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
