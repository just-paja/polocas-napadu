import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import GameSelectForm from '../containers/GameSelectForm';
import InspirationForm from '../containers/InspirationForm';
import InspirationGenerator from '../containers/InspirationGenerator';

import { Classes } from '../../proptypes';

const styles = theme => ({
  bg: {
    maxWidth: 500,
    margin: '0 auto',
  },
  form: {
    background: theme.palette.background.default,
    margin: '0 auto',
    marginTop: 2 * theme.spacing.unit,
    padding: 4 * theme.spacing.unit,
  },
  stageControl: {
    padding: '0 2rem 1rem',
  },
});

class GameSelection extends Component {
  constructor() {
    super();
    this.state = { activeTab: 0 };
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(event, value) {
    this.setState({ activeTab: value });
  }

  render() {
    const { classes, currentGame, isVisible } = this.props;
    const { activeTab } = this.state;
    if (!isVisible) {
      return null;
    }
    return (
      <div className={classes.bg}>
        <div className={classes.form}>
          <Typography variant="display1">Game selection</Typography>
          <GameSelectForm />
          {currentGame ? (
            <div>
              <hr />
              <Typography variant="display1">Inspiration</Typography>
              <Tabs value={this.state.activeTab} onChange={this.handleTabChange}>
                <Tab label="Generate" />
                <Tab label="Manual" />
              </Tabs>
              {activeTab === 0 && <InspirationGenerator />}
              {activeTab === 1 && <InspirationForm />}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
};

GameSelection.propTypes = {
  classes: Classes.isRequired,
  currentGame: PropTypes.object,
  isVisible: PropTypes.bool,
};

GameSelection.defaultProps = {
  isVisible: false,
};

export default withStyles(styles)(GameSelection);
