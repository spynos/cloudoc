import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import LayoutClouDoc from '../../components/common/LayoutClouDoc/LayoutClouDoc';
import ClinicalSubSidebar from '../../components/ClinicalSubSidebar';
import ClinicalMain from '../../components/ClinicalMain';
import ClinicalDetail from '../../components/ClinicalDetail';
import ClinicalCreate from '../../components/ClinicalCreate';

class ClinicalDB extends Component {
    render() {
        const { match } = this.props;
        return (
            <Fragment>
                <LayoutClouDoc 
                    subSidebar={<ClinicalSubSidebar />}
                >
                    <Switch>
                        <Route path={`${match.path}`} exact component={ClinicalMain} />
                        <Route path={`${match.path}/create`} exact component={ClinicalCreate} />
                        <Route path={`${match.path}/detail/:sectionName/:id`} exact component={ClinicalDetail} />
                        <Route path={`${match.path}/detail/:sectionName/link/:reference_id`} exact component={ClinicalDetail} />
                    </Switch>
                </LayoutClouDoc>
            </Fragment>
        );
    }
}

export default ClinicalDB;