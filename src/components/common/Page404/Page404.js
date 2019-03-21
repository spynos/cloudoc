import React from 'react';

const Page404 = ({message = '404 에러, 존재하지 않는 요청주소 입니다.'}) => {
    return (
        <div>
            {message}
        </div>
    );
};

export default Page404;