import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SubmitAnimation from "./SubmitAnimation";
import { generateCertificate } from "../Utils/apiConnect";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up("sm")]: { width: 250 },
    [theme.breakpoints.down("sm")]: { width: 200 }
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  paper: {
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing.unit,
      padding: `${theme.spacing.unit * 2}px`
    },
    minHeight: "75vh",
    maxWidth: "95%",
    margin: theme.spacing.unit * 5,
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 8}px ${theme
      .spacing.unit * 3}px`
  },
  rightpaper: {
    [theme.breakpoints.up("sm")]: {
      maxHeight: "75vh"
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "95%",
      margin: theme.spacing.unit * 2
    },
    maxWidth: "60%",
    minWidth: "60%",
    margin: theme.spacing.unit * 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  verificationBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
    height: "100%",
    marginTop: theme.spacing.unit * 3
  },
  courseField: {
    [theme.breakpoints.up("sm")]: {
      width: "60%"
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "80vw"
    }
  },
  submitBtn: {
    marginLeft: "50px"
  }
});

class GenerateForm extends React.Component {
  state = {
    firstname: "",
    lastname: "",
    organization: "FossAsia",
    orgLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/FOSSASIA_Logo.svg/600px-FOSSASIA_Logo.svg.png",
    coursename: "",
    assignedOn: null,
    duration: 0,
    currentState: "normal",
    emailId: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  submitData = event => {
    event.preventDefault();
    if (this.state.currentState === "validate") {
      return;
    }
    this.setState({ currentState: "load" });
    const {
      firstname,
      lastname,
      organization,
      coursename,
      assignedOn,
      duration,
      emailId
    } = this.state;
    let candidateName = `${firstname} ${lastname}`;
    let assignDate = new Date(assignedOn).getTime();
    generateCertificate(
      candidateName,
      coursename,
      organization,
      assignDate,
      parseInt(duration),
      emailId
    )
      .then(data => {
        if (data.data !== undefined)
          this.setState({
            currentState: "validate",
            certificateId: data.data.certificateId
          });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    const {
      firstname,
      lastname,
      organization,
      coursename,
      duration,
      currentState,
      orgLogo,
      emailId,
      certificateId
    } = this.state;
    return (
      <Grid container>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <Typography variant="h3" color="inherit">
              Certificate Generation Form
            </Typography>
            <form
              className={classes.container}
              autoComplete="off"
              onSubmit={this.submitData}
            >
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="firstname"
                  label="First Name"
                  className={classes.textField}
                  value={firstname}
                  onChange={this.handleChange("firstname")}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  required
                  id="lastname"
                  label="Last Name"
                  className={classes.textField}
                  value={lastname}
                  onChange={this.handleChange("lastname")}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="organization"
                  label="Organization"
                  className={classes.textField}
                  defaultValue={organization}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    readOnly: true
                  }}
                />
                <TextField
                  required
                  id="certified-for"
                  label="Certified For"
                  helperText="Any course name or skill for which the certificate is being given."
                  placeholder="Degree, skill or award.."
                  className={(classes.courseField, classes.textField)}
                  defaultValue={coursename}
                  onChange={this.handleChange("coursename")}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="assigned-date"
                  label="Assigned Date"
                  type="date"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange("assignedOn")}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  required
                  id="duration"
                  label="Duration"
                  helperText="Duration to be provided in years"
                  value={duration}
                  onChange={this.handleChange("duration")}
                  type="number"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="email"
                  label="Email"
                  className={classes.textField}
                  type="email"
                  name="email"
                  autoComplete="email"
                  margin="normal"
                  variant="outlined"
                  value={emailId}
                  onChange={this.handleChange("emailId")}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SubmitAnimation
                  currentState={currentState}
                  className={classes.submitBtn}
                />
                {currentState === "validate" && (
                  <Typography
                    variant="caption"
                    color="inherit"
                    className={classes.submitBtn}
                  >
                    Certificate genrated with id {certificateId}
                  </Typography>
                )}
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.rightpaper}>
            <div style={{ maxWidth: "90%" }}>
              <img src={orgLogo} alt="org-logo" style={{ maxWidth: "100%" }} />
            </div>
            <div>
              <Typography variant="h5" color="inherit" noWrap>
                {organization}
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

GenerateForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GenerateForm);
