import React, { Component } from 'react';
import styles from './FilterButtonGroup.module.scss';
import classNames from 'classnames/bind';
import { 
    Button, 
    ButtonGroup,
    Row,
    Col
} from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

const cx = classNames.bind(styles);
const sections = [
    'all',
    'chart_id',
    'symptom',
    'condition',
    'drug'
];
const sectionsKR = [
    '전체',
    '차트번호',
    '증상',
    '진단',
    '처방'
];

@inject(
    'caseStore'
)
@observer
class FilterButtonGroup extends Component {
    componentDidMount() {
        this.props.caseStore.setFilterKeyword('all');
    }
    componentWillUnmount() {
        this.props.caseStore.clearFilterKeyword();
    }

    _handleClick = (e) => {
        const { name } = e.target;
        this.props.caseStore.setFilterKeyword(name);
    }

    _renderButtons = () => {
        const { _handleClick } = this;
        const { filterKeyword } = this.props.caseStore;

        return sections.map((section, i) => {
            return (
                <Button 
                    key={i}
                    className={cx({active: filterKeyword === section})} 
                    variant='secondary'
                    onClick={_handleClick}
                    name={section}
                >
                    {sectionsKR[i]}
                </Button>
            )
        })
    }

    render() {

        return (
            <div className={cx('FilterButtonGroup')}>
                <Row className={cx('filter-buttons-container')}>
                    <Col>
                        <ButtonGroup 
                            className={cx('buttons-wrapper')} 
                            aria-label="Filters for Case Search Bar"
                        >
                            {this._renderButtons()}
                        </ButtonGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default FilterButtonGroup;