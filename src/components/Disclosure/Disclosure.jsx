import css from "./Disclosure.module.scss";
import { Icon } from "../Icon/Icon";

export const Disclosure = ({
  title,
  module,
  isExpanded,
  onClick,
  children,
}) => {
  return (
    <div class={`${css.disclosure}| cq-cont`}>
      <h3>
        <button
          class={css["disclosure__button"]}
          type="button"
          aria-expanded={isExpanded}
          onClick={onClick}
        >
          {title}
          <Icon
            viewBox="0 -960 960 960"
            name="expand_more"
            width="48"
            height="48"
            className={`${css["disclosure__icon"]}`}
          />
        </button>
      </h3>
      <div
        class={`${css["disclosure__content"]} | flow`}
        data-module={module}
        {...{ hidden: !isExpanded }}
      >
        {children}
      </div>
    </div>
  );
};
