import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  progressContainer: {
    height: "91.5vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

function CircularIndeterminate(props) {
  const { classes, SIZE } = props;
  return (
    <Grid item xs={12} sm={12} className={classes.progressContainer}>
      <CircularProgress
        size={SIZE}
        className={classes.progress}
        color="secondary"
      />
    </Grid>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CircularIndeterminate);
