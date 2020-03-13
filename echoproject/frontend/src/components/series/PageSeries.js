import React, { Fragment } from "react";
import FormSeries from "./FormSeries";
import Tournaments from "./FormDropdownTournaments";

export default function SeriesPage() {
  return (
    <Fragment>
      <FormSeries />
      <Tournaments />
    </Fragment>
  );
}
