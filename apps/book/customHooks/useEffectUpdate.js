const { useEffect, useRef } = React

export function useEffectUpdate(func, deps) {

    const isFirstRenderRef = useRef(true)

    useEffect(() => {
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false
            return
        }
        func()
    }, deps)

}