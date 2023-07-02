import css from "./Disclosure.module.scss";
import { Icon } from "../Icon/Icon";

export const Disclosure = ({
  title,
  module,
  isExpanded,
  loadedJs,
  onClick,
  children,
}) => {
  const DisclosureContainer = loadedJs ? "div" : "details";
  const DisclosureTitle = loadedJs ? "h3" : "summary";

  return (
    <DisclosureContainer class={`${css.disclosure} | cq-cont`}>
      <DisclosureTitle class={loadedJs ? "" : css["disclosure__button"]}>
        {loadedJs ? (
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
        ) : (
          title
        )}
      </DisclosureTitle>
      <div
        class={`${css["disclosure__content"]} | flow`}
        data-module={module}
        {...{ hidden: loadedJs ? !isExpanded : null }}
      >
        {children}
      </div>
    </DisclosureContainer>
  );
};
