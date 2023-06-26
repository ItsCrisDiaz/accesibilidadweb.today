import css from "./Icon.module.scss";

export function Icon({ className = "", width, height, viewBox, name }) {
  return (
    <svg
      class={`${css.icon} ${className ? className : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      aria-hidden="true"
    >
      <use href={`/assets/icons/${name}.svg#${name}`} />
    </svg>
  );
}
