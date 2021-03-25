import React, { useState } from 'react'
import { Link } from "react-router-dom"
import './buttonStyle.css'

function Button(){

    return (
        <div className="row-btn">
            <Link className="btn-buy">
                Adicionar ao carrinho
            </Link>
        </div>
    )
}

export default Button