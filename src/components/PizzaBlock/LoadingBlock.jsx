// libraries
import React from 'react'
import ContentLoader from 'react-content-loader'

function LoadingBlock() {
    return <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={460}
        viewBox="0 0 280 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="478" cy="-54" r="119" />
        <circle cx="413" cy="-49" r="115" />
        <circle cx="115" cy="115" r="115" />
        <rect x="0" y="253" rx="3" ry="3" width="280" height="27" />
        <rect x="0" y="290" rx="6" ry="6" width="280" height="87" />
        <rect x="132" y="388" rx="25" ry="25" width="149" height="47" />
        <rect x="0" y="402" rx="3" ry="3" width="89" height="30" />
    </ContentLoader>
}

export default LoadingBlock
