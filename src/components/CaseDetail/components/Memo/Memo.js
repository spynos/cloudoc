import React, { Component } from 'react';
import styles from './Memo.module.scss';
import classNames from 'classnames/bind';
import { Container, Row, Button } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { observer, inject } from 'mobx-react';

const cx = classNames.bind(styles);

@inject('memoStore')
@observer
class Memo extends Component {
    componentDidMount() {
        this.props.memoStore.initilize(this.props.memo);
    }

    componentWillUnmount() {
        this.props.memoStore.clear()
    }

    _handleChange = (e) => {
        const { value } = e.target;
        this.props.memoStore.changeMemo(value);
    }

    _handleClick = () => {
        this.props.memoStore.deleteAllInputValue();
    }

    render() {
        const { open, isEditing } = this.props;
        const { editableData } = this.props.memoStore;

        return (
            <div id='Memo-Case' className={cx('Memo')}>
                <Collapsible transitionTime={150} open={open} trigger="메모">
                    <Container fluid>
                        {
                            isEditing
                            ? <Row>
                                <div className={cx('input-container', 'memo')}>
                                    <textarea 
                                        name='memo'
                                        rows='6' 
                                        placeholder='그 외 등등...'
                                        value={editableData.memo}
                                        onChange={this._handleChange}
                                    />
                                </div>
                            </Row>
                            : <Row>
                                <div className={cx('input-container', 'memo')}>
                                    {editableData.memo}
                                </div>
                            </Row>
                        }
                        {
                            isEditing
                            && <Row className={cx('content-container-row', 'delete-save-button')}>
                                <Button variant="secondary" onClick={this._handleClick}>기록삭제</Button>
                            </Row>
                        }
                    </Container>
                </Collapsible>
            </div>
        );
    }
}

export default Memo;