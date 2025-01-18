export default function ScrollingLogos({
  items = [],
  animationClass = "animate-scroll-right-full",
  containerClass = "overflow-hidden w-full",
  logoHeight = "5rem",
}) {
  return (
    <div className={containerClass}>
      <div className={`flex items-center gap-10 ${animationClass}`}>
        {items.concat(items).map((item, index) => (
          <img
            key={index}
            className={`h-[${logoHeight}] py-2`}
            src={item.src}
            alt={item.alt}
          />
        ))}
      </div>
    </div>
  );
}
