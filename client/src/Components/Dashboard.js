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
import LockIcon from "@material-ui/icons/Lock";
import { getCertificate, verifyCertificate } from "../Utils/apiConnect";
import Loader from "./Loader";
import Certificate from "./Certificate";

const styles = theme => ({
  root: {
    minHeight: "91.5vh"
  },
  paper: {
    [theme.breakpoints.down("sm")]: {
      padding: `${theme.spacing.unit * 2}px`,
      margin: theme.spacing.unit * 2
    },
    minHeight: "75vh",
    maxWidth: "95%",
    margin: theme.spacing.unit * 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    pageLoad: true,
    info: {
      candidateName: "",
      orgName: "",
      courseName: "",
      assignDate: null,
      expirationDate: null
    },
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/FOSSASIA_Logo.svg/600px-FOSSASIA_Logo.svg.png"
  };

  verification = () => {
    this.setState({ loading: true });
    verifyCertificate(this.state.certificateId).then(success => {
      this.setState({ authorized: success, verified: true, loading: false });
    });
  };

  componentDidMount() {
    const certificateId = this.props.match.params.id;
    getCertificate(certificateId).then(data => {
      const {
        candidateName,
        orgName,
        courseName,
        assignDate,
        expirationDate
      } = data;
      this.setState(prev => {
        const temp = prev;
        temp.certificateId = certificateId;
        temp.pageLoad = false;
        temp.info = {
          candidateName,
          orgName,
          courseName,
          assignDate: new Date(assignDate).toString().slice(4, 15),
          expirationDate: new Date(expirationDate).toString().slice(4, 15)
        };
        return temp;
      });
    });
  }

  render() {
    const { classes } = this.props;
    const {
      authorized,
      verified,
      loading,
      pageLoad,
      certificateId,
      logo
    } = this.state;
    const {
      candidateName,
      orgName,
      courseName,
      assignDate,
      expirationDate
    } = this.state.info;
    const tooltipInfo = `This verifies whether the certification is secured and stored with correct information in the blockchain`;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            {pageLoad ? (
              <Loader SIZE={170} />
            ) : (
              <Certificate
                name={candidateName}
                title={courseName}
                date={assignDate}
                hash={certificateId}
                logo={logo}
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          {pageLoad ? (
            <Loader SIZE={70} />
          ) : (
            <Paper className={classes.rightpaper}>
              <div>
                <Typography variant="h5" color="inherit" noWrap>
                  {candidateName}
                </Typography>
                <Typography variant="h6" color="inherit" noWrap>
                  {courseName}
                </Typography>
                <Typography variant="h6" color="inherit" noWrap>
                  {orgName}
                </Typography>
                <Typography variant="caption" color="inherit" noWrap>
                  Assigned on: {assignDate}
                </Typography>
                <Typography variant="caption" color="inherit" noWrap>
                  Expires on: {expirationDate}
                </Typography>
              </div>
              <Grid container className={classes.verificationBox}>
                {!verified ? (
                  <div>
                    {!loading ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center"
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          style={{
                            width: "150px",
                            marginRight: "10px"
                          }}
                          onClick={this.verification}
                        >
                          <LockIcon
                            style={{ marginLeft: "-15px", marginRight: "5px" }}
                            fontSize="small"
                            className={classes.leftIcon}
                          />
                          Verify
                        </Button>
                        <Tooltip title={tooltipInfo}>
                          <HelpIcon style={{ fontSize: "1rem" }} />
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
                        <Typography
                          variant="subtitle1"
                          className={classes.textitems}
                        >
                          This certificate is Blockchain Verified
                        </Typography>
                      </div>
                    ) : (
                      <div>
                        <FailureBadge />
                        <Typography
                          variant="subtitle1"
                          className={classes.textitems}
                        >
                          There were some changes in the Certificate data
                        </Typography>
                      </div>
                    )}
                  </Grid>
                )}
              </Grid>
            </Paper>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Dashboard);
