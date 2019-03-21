import React, { Component, Fragment } from 'react';
import LayoutClouDoc from '../../components/common/LayoutClouDoc/LayoutClouDoc';
import MainSubSidebar from '../../components/MainSubSidebar';
import MainCase from '../../components/MainCase';

class Main extends Component {
  render() {
    return (
      <Fragment>
        <LayoutClouDoc subSidebar={<MainSubSidebar />}>
          <MainCase />
        </LayoutClouDoc>
      </Fragment>
    );
  }
}

export default Main;