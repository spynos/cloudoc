import React, { Component } from 'react';
import styles from './BloodTest.module.scss';
import classNames from 'classnames/bind';
import { Container, Row, Button } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { observer, inject } from 'mobx-react';
import BloodTestRowForm from './components/BloodTestRowForm/BloodTestRowForm';
import items from '../../../../constant/bloodTestItem';

const cx = classNames.bind(styles);

@inject('bloodTestStore')
@observer
class BloodTest extends Component {
    componentDidMount() {
        this._initilize();
    }

    _initilize = () => {
        return items.forEach((item) => {
            this.props.bloodTestStore.pushEditableData(
                {
                    category: item.category,
                    name: item.name,
                    value: '',
                    unit: item.unit,
                    state: '-'
                }
            )
        })
    }

    componentWillUnmount() {
        this.props.bloodTestStore.clear();
    }

    _handleClick = () => {
        this.props.bloodTestStore.deleteAllInputValue();
    }

    render() {
        const { open } = this.props;
        const bloodTest = this.props.bloodTestStore.JSONeditableData;

        return (
            <div id='Lab-Create' className={cx('BloodTest')}>
                <Collapsible transitionTime={150} open={open} trigger="혈액검사">
                    <Container fluid>
                        <Row className={cx('upload-delete-save-button', 'top')}>
                            <div className={cx('left')}>
                                <Button className={cx('upload-button')}>엑셀파일 올리기</Button>
                            </div>
                        </Row>
                        <Row className={cx('table-container')}>
                            <table className={cx('input-form-table')}>
                                <thead className={cx('table-header')}>
                                    <tr>
                                        <th><div className={cx('label')}>구분</div></th>
                                        <th><div className={cx('label')}>검사항목</div></th>
                                        <th><div className={cx('label')}>결과값</div></th>
                                        <th><div className={cx('label')}>단위</div></th>
                                        <th><div className={cx('label')}>판정</div></th>
                                        <th><div className={cx('label')}></div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <BloodTestRowForm bloodTest={bloodTest} />
                                </tbody>
                            </table>
                        </Row>
                        <Row className={cx('upload-delete-save-button')}>
                            <div className={cx('left')}>
                                <Button className={cx('upload-button')}>엑셀파일 올리기</Button>
                            </div>
                            <div className={cx('right')}>
                                <Button variant="secondary" onClick={this._handleClick}>기록삭제</Button>
                            </div>
                        </Row>
                    </Container>
                </Collapsible>
            </div>
        );
    }
}

export default BloodTest;