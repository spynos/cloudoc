import React from 'react';
import classNames from 'classnames/bind';
import styles from './VisualizedDataBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const VisualizedDataBar = ({ label = [0, 33, 66, 100], sectionLabel, refMax = 100, refMin = 0, optMax, optMin, currentPosition, state }) => {
    const renderSectionLabel = () => {
        const length = label.length - 1;
        return sectionLabel.map((sectionLabel, i) => {
            const position = ((i + 0.5) / length) * 100;
            return (
                <div 
                    key={i} 
                    className={cx('section-label')} 
                    style={{
                        left: position + '%'
                    }}
                >
                    {sectionLabel}
                </div>
            )
        })
    }

    const renderDivider = () => {
        const length = label.length - 1;
        return label.map((num, i) => {
            const position = (i / length) * 100;
            if (i === 0) {
                return (
                    <div 
                        key={i} 
                        className={cx('divider', 'first-divider')} 
                        style={{
                            left: position + '%'
                        }}
                    >
                        <div className={cx('divider-label')}>{num}</div>
                    </div>
                )
            }
            if (i === length) {
                return (
                    <div 
                        key={i} 
                        className={cx('divider', 'last-divider')} 
                        style={{
                            left: position + '%'
                        }}
                    >
                        <div className={cx('divider-label')}>{num}</div>
                    </div>
                )
            }
            return (
                <div 
                    key={i} 
                    className={cx('divider')} 
                    style={{
                        left: position + '%'
                    }}
                >
                    <div className={cx('divider-label')}>{num}</div>
                </div>
            )
            
            
        })
    }

    const renderCurrentPosition = (refMin, refMax, optMax, optMin) => {
        let relativePosition, totalRange, currentPositionPercentage;

        
        if (state === '최적') {
            relativePosition = currentPosition - optMin;
            totalRange = optMax - optMin;
            currentPositionPercentage = 33.3333 + (relativePosition / totalRange * 100) * 0.3333;

        } else if (state === '낮음') {
            relativePosition = currentPosition - refMin;
            totalRange = optMin - refMin;
            currentPositionPercentage = (relativePosition / totalRange * 100) * 0.3333;

        } else if (state === '높음') {
            relativePosition = currentPosition - optMax;
            totalRange = refMax - optMax;
            currentPositionPercentage = 66.6666 + (relativePosition / totalRange * 100) * 0.3333;

        } else if (state === '매우 낮음') {
            relativePosition = currentPosition - optMax;
            totalRange = refMax - optMax;
            currentPositionPercentage = 0;

        } else if (state === '매우 높음') {
            relativePosition = currentPosition - optMax;
            totalRange = refMax - optMax;
            currentPositionPercentage = 100;
        } else {
            currentPosition = 50;
        }
        
        return (
            <div 
                className={cx('currentPosition')}
                style={{
                        left: currentPositionPercentage + '%'
                    }}
            >
                {state === '-' || currentPosition === '' ? '' : <FontAwesomeIcon className={cx('icon', 'caretDown')} icon={faCaretDown} />}
            </div>
        )
    }

    return (
        <div className={cx('VisualizedDataBar')}>
            <div className={cx('container')}>
                <div className={cx('background')}>
                    {sectionLabel && renderSectionLabel()}
                    {renderDivider()}
                    {renderCurrentPosition(refMin, refMax, optMax, optMin)}
                </div>
            </div>
        </div>
    );
};

export default VisualizedDataBar;