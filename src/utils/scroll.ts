export const scrollToNextSection = () => {
  const height = window.innerHeight || document.documentElement.clientHeight;

  window.scrollBy({
    top: height,
    behavior: "smooth",
  });
};
