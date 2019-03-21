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
    'symptom',
    'lab',
    'exam',
    'condition',
    'drug',
    'reference'
];
const sectionsKR = [
    '전체',
    '증상',
    '혈검',
    '진찰',
    '진단',
    '한약',
    '문헌'
];

@inject(
    'clinicaldbStore'
)
@observer
class FilterButtonGroup extends Component {
    componentDidMount() {
        this.props.clinicaldbStore.setFilterKeyword('all');
    }
    componentWillUnmount() {
        this.props.clinicaldbStore.clearFilterKeyword();
    }

    _handleClick = (e) => {
        const { name } = e.target;
        this.props.clinicaldbStore.setFilterKeyword(name);
    }

    _renderButtons = () => {
        const { _handleClick } = this;
        const { filterKeyword } = this.props.clinicaldbStore;

        return sections.map((section, i) => {
            return (
                <Button 
                    key={i}
                    className={cx('filter-button', {active: filterKeyword === section})} 
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
                    <Col className={cx('filter-button-col')}>
                        <ButtonGroup 
                            className={cx('buttons-wrapper')} 
                            aria-label="Filters for clinicalDB Search Bar"
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