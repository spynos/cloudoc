import React, { Component } from 'react';
import styles from './SectionButtonGroup.module.scss';
import classNames from 'classnames/bind';
import { 
    Button, 
    ButtonGroup,
    Container
} from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

const cx = classNames.bind(styles);
const sections = [
    'symptom',
    'lab',
    'exam',
    'condition',
    'drug',
    'reference'
];
const sectionsKR = [
    '증상',
    '혈검',
    '진찰',
    '진단',
    '한약',
    '문헌'
];

@inject(
    'clinicalCreateStore'
)
@observer
class SectionButtonGroup extends Component {
    componentDidMount() {
        this.props.clinicalCreateStore.setSectionKeyword('symptom');
    }
    componentWillUnmount() {
        this.props.clinicalCreateStore.clearSectionKeyword();
    }

    _handleClick = (e) => {
        const { name } = e.target;
        this.props.clinicalCreateStore.setSectionKeyword(name);
    }

    _renderButtons = () => {
        const { _handleClick } = this;
        const { sectionKeyword } = this.props.clinicalCreateStore;

        return sections.map((section, i) => {
            return (
                <Button 
                    key={i}
                    className={cx({active: sectionKeyword === section})} 
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
            <Container className={cx('FilterButtonGroup')}>
                <div className={cx('filter-buttons-container')}>
                    <div>
                        <ButtonGroup 
                            className={cx('buttons-wrapper')} 
                            aria-label="Sections for clinicalDB Create"
                        >
                            {this._renderButtons()}
                        </ButtonGroup>
                    </div>
                </div>
            </Container>
        );
    }
}

export default SectionButtonGroup;