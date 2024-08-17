export const animateCSS = (
    element: string,
    animation: string,
    prefix = "animate__"
) => {
    const animationName = `${prefix}${animation}`;
    const animationSpeed = `${prefix}fast`;
    const node = document.querySelector(element);

    if (node != null) {
        node.classList.add(`${prefix}animated`, animationName), animationSpeed;

        const handleAnimationEnd = (event: Event) => {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
        };

        node.addEventListener("animationend", handleAnimationEnd, {
            once: true,
        });
    }
};
