import React from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import VerifyBadge from "./VerifyBadge";
import FailureBadge from "./FailureBadge";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from "@material-ui/icons/Help";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";

const styles = theme => ({
  root: {
    minHeight: "91.5vh"
  },
  paper: {
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing.unit * 2
    },
    height: "75vh",
    maxWidth: "95%",
    margin: theme.spacing.unit * 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
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
  textitems: {
    margin: "20px 10px",
    textAlign: "center"
  }
});

class Dashboard extends React.Component {
  state = {
    verified: false,
    authorized: false,
    loading: false,
    info: {
      candidateName: "Saurabh Thakur",
      orgName: "Udacity",
      courseName: "Full Stack Nanodegree",
      assignedOn: new Date().toString().slice(4, 15),
      expiresOn: new Date().toString().slice(4, 15)
    }
  };

  verification = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ authorized: true, verified: true, loading: false });
    }, 2000);
  };

  render() {
    const { classes } = this.props;
    const { authorized, verified, loading } = this.state;
    const {
      candidateName,
      orgName,
      courseName,
      assignedOn,
      expiresOn
    } = this.state.info;
    const tooltipInfo = `This verifies whether the certification is secured and stored with correct information in the blockchain`;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.rightpaper}>
            <div className={classes.sep}>
              <Typography variant="h5" color="inherit" noWrap>
                {candidateName}
              </Typography>
              <Typography variant="h6" color="inherit" noWrap>
                {courseName}
              </Typography>
              <Typography variant="h6" color="inherit" noWrap>
                {orgName}
              </Typography>
              <Typography variant="p" color="inherit" noWrap>
                Assigned on: {assignedOn}
              </Typography>
              <Typography variant="p" color="inherit" noWrap>
                Expires on: {expiresOn}
              </Typography>
            </div>
            <Grid container className={classes.verificationBox}>
              {!verified ? (
                <div>
                  {!loading ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        style={{ width: "150px" }}
                        onClick={this.verification}
                      >
                        <LockIcon className={classes.leftIcon} />
                        Verify
                      </Button>
                      <Tooltip title={tooltipInfo}>
                        <IconButton aria-label="Delete">
                          <HelpIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  ) : (
                    <CircularProgress
                      className={classes.progress}
                      color="secondary"
                    />
                  )}
                </div>
              ) : (
                <Grid item sm={12}>
                  {authorized ? (
                    <div>
                      <VerifyBadge />
                      <Typography variant="p" className={classes.textitems}>
                        This certificate is Blockchain Verified
                      </Typography>
                    </div>
                  ) : (
                    <div>
                      <FailureBadge />
                      <Typography variant="p" className={classes.textitems}>
                        There were some changes in the Certificate data
                      </Typography>
                    </div>
                  )}
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Dashboard);
