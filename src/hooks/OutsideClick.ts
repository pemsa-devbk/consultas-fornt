import { useEffect } from 'react';
// import { useModalStore } from './useModalStore';
export const useOutsideClick = (ref: React.RefObject<any>, classToggle: string) => {
    useEffect(() => {

        function handleClickOutside(event: MouseEvent) {
            //@ts-ignore
            if (ref.current && !ref.current.contains(event.target)) {
                ref.current.classList.remove(classToggle);
            }
        }
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref])

}

// export const useOutsideModal = (ref: React.RefObject<any>) => {
//     const { hideShade } = useModalStore();
//     useEffect(() => {

//         function handleClickOutside(event: MouseEvent) {
//             //@ts-ignore
//             if (ref.current && !ref.current.contains(event.target)) {
//                 hideShade();
//             }
//         }
//         document.addEventListener("mousedown", handleClickOutside)

//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside)
//         }
//     }, [ref])
    
// }