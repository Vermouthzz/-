import React from 'react'

function withContext(Context, Render) {
    return Immutable(Context, '')

    function Immutable(Context, props) {
        return React.createElement(Context.Provider, { value }, React.createElement(Render, props))
    }
}


export {withContext}