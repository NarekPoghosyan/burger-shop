// libraries
import React from 'react'
import { useHistory } from 'react-router'

// components
import { Button } from './index'

// assets
import hamburger from '../assets/img/hamburger.svg'

const Header = () => {
    const history = useHistory()

    return (
        <div className="header">
            <div className="container">
                <div className="header__logo" style={{ 'cursor': 'pointer' }} onClick={() => history.push('/')}>
                    <img width="38" src={hamburger} alt="Pizza logo" />
                    <div>
                        <h1>Burger Shop</h1>
                        <p>order a burger in a couple of clicks</p>
                    </div>
                </div>
                <Button />
            </div>
        </div>
    )
}

export default Header;