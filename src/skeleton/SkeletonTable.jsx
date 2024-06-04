import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonTable = ({ rows = 5, columns = 4 }) => {
    return (
        <tbody>
            {Array(rows).fill().map((_, rowIndex) => (
                <tr key={rowIndex}>
                    {Array(columns).fill().map((_, colIndex) => (
                        <td key={colIndex}>
                            <Skeleton height={20} />
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default SkeletonTable;
