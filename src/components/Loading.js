import React from 'react';
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";

export function Loading() {
    return <Skeleton count={1} height={800} width={600} borderRadius={12} />;
}
