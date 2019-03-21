import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import LayoutClouDoc from '../../components/common/LayoutClouDoc/LayoutClouDoc';
import CaseSubSidebar from '../../components/CaseSubSidebar';
import CaseDetail from '../../components/CaseDetail';
import CaseCreate from '../../components/CaseCreate/CaseCreate';

class Case extends Component {
    render() {
        const { match } = this.props;
        const type = this.props.location.pathname.split("/")[2];

        return (
            <Fragment>
                <LayoutClouDoc 
                    subSidebar={<CaseSubSidebar />}
                    create={ type === "create" ? true : false }
                >
                    <Route path={`${match.path}/create`} component={CaseCreate} />
                    <Route path={`${match.path}/detail/:id/:index/:dateIndex`} component={CaseDetail} />
                </LayoutClouDoc>
            </Fragment>
        );
    }
}

export default Case;