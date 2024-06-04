import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonProductList = () => {
    return (
        <div className="skeleton-product m-3 p-2">
            <Skeleton height={200} />
            <Skeleton count={3} style={{ marginTop: '10px' }} />
        </div>
    );
};

export default SkeletonProductList;
