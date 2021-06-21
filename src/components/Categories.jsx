// libraries
import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'

const Categories = React.memo(function Categories({ activeCategory, items, onClickCategory }) {

    const [style, setStyle] = useState(false)

    return (
        <div className="categories">
            <div className={style ? 'burger-menu-none' : "burger-menu"} onClick={() => setStyle(!style)}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <ul className={style ? 'burger-ul' : 'burger-ul-none'}>
                <li className={activeCategory === null ? 'active' : ''} onClick={() => {
                    onClickCategory(null)
                    setStyle(!style)
                }}>All</li>
                {items && items.map((name, index) => {
                    return <li className={activeCategory === index ? 'active' : ''} key={`${name}_${index}`} onClick={() => {
                        onClickCategory(index)
                        setStyle(!style)
                    }}>{name}</li>
                })}
            </ul>
            <ul className="line_menu">
                <li className={activeCategory === null ? 'active' : ''} onClick={() => onClickCategory(null)}>All</li>
                {items && items.map((name, index) => {
                    return <li className={activeCategory === index ? 'active' : ''} key={`${name}_${index}`} onClick={() => onClickCategory(index)}>{name}</li>
                })}
            </ul>
        </div>
    )
})

Categories.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClickCategory: PropTypes.func
};

Categories.defaultProps = { activeCategory: null, items: [] }

export default Categories;