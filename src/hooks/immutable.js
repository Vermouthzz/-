import React, { useMemo } from "react";

const Defaults = new WeakMap();

export function createContext(defaults) {
    const context = React.createContext([defaults, () => defaults]);    
    Defaults.set(context, defaults);
    return context;
}

export function useState(init) {
    const [state, setState] = React.useState(init);

    const dispatch = useMemo(() => {
        let current = state;
        function dispatch(spec) {
            // const next = spec ? update(current, spec) : current;
            setState(spec); // [[1]]
            return null;
        }
        return dispatch;
    }, []);

    return useMemo(() => [state, dispatch], [state, dispatch]);
}

export function useContext(context) {
    return React.useContext(context)[0];
}

export function useDispatch(context) {
    return React.useContext(context)[1];
}

// export function withContext(Context, Render) {
//     if (!Array.isArray(Context)) {
//         return function Immutable(props) {
//             const value = useState(Defaults.get(Context));
//             return React.createElement(
//                 Context.Provider,
//                 { value },
//                 React.createElement(Render, props)
//             );
//         };
//     }
//     return Context.reduce((Render, ctx) => withContext(ctx, Render), Render);
// }
export function withContext(Context, Render) {
    if (!Array.isArray(Context)) {
        return function ImmutableProvider(props) {
            // 使用封装的 useState 获取 [state, dispatch]
            const contextValue = useState(Defaults.get(Context));
            console.log(contextValue);

            return React.createElement(
                Context.Provider,
                { value: contextValue }, // 正确传递 [state, dispatch]
                React.createElement(Render, props)
            );
        };
    }
    return Context.reduce((Render, ctx) => withContext(ctx, Render), Render);
}

export default {
    useState,
    createContext,
    useContext,
    useDispatch,
    withContext,
};
