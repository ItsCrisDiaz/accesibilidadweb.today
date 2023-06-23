import { useState, useEffect } from "preact/hooks";
import { AnimatedSvg } from "./AnimatedSvg";
import { Disclosure } from "../Disclosure/Disclosure";
import { Icon } from "../Icon/Icon";

import { gsap } from "gsap";
import css from "./Modules.module.scss";
import disclosure from "../Disclosure/Disclosure.module.scss";

const MODULE_VIEWBOX = {
  default: "0 0 890 894",
  module1: "223 -30 450 452",
  module2: "460 20 450 452",
  module3: "470 220 450 452",
  module4: "460 462 450 452",
  module5: "223 472 450 452",
  module6: "-20 462 450 452",
  module7: "-30 220 450 452",
  module8: "-20 -20 450 452",
};

export default function Modules({ moduleContent }) {
  const [loadedJs, setLoadedJs] = useState(false);

  const [expanded, setExpanded] = useState({
    module1: false,
    module2: false,
    module3: false,
    module4: false,
    module5: false,
    module6: false,
    module7: false,
    module8: false,
  });

  const [test, setTest] = useState(false);

  const testClick = (text) => {
    setTest(!test);
    window.alert(text);
  };

  const [moduleViewBox, setModuleViewBox] = useState(MODULE_VIEWBOX.default);

  const [activeModule, setActiveModule] = useState(0);

  const handleExpandedDisclosure = (module) => {
    let nextExpanded = { ...expanded };

    const currentDisclosureState = nextExpanded[`module${module}`];

    const isADisclosureOpen = (element) => element === true;

    if (
      Object.values(nextExpanded).some(isADisclosureOpen) &&
      !currentDisclosureState
    ) {
      nextExpanded = {
        module1: false,
        module2: false,
        module3: false,
        module4: false,
        module5: false,
        module6: false,
        module7: false,
        module8: false,
      };
    }

    nextExpanded[`module${module}`] = !nextExpanded[`module${module}`];
    setExpanded(nextExpanded);

    const areAllDisclosureClosed = (element) => element === false;

    if (Object.values(nextExpanded).every(areAllDisclosureClosed)) {
      setModuleViewBox(MODULE_VIEWBOX.default);
      setActiveModule(0);
      set;
    } else {
      setModuleViewBox(MODULE_VIEWBOX[`module${module}`]);
      setActiveModule(module);
    }
  };

  const handleClick = (module) => {
    handleExpandedDisclosure(module);
    // handleModuleViewBow(module);
  };

  useEffect(() => {
    setLoadedJs(true);
  }, []);

  useEffect(() => {
    const areAnimationsDisabled = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (areAnimationsDisabled) {
      gsap.set("#accordion-svg", {
        duration: 1,
        attr: {
          viewBox: moduleViewBox,
        },
      });
    } else {
      gsap.to("#accordion-svg", {
        duration: 1,
        attr: {
          viewBox: moduleViewBox,
        },
        ease: "power3.inOut",
      });
    }
  }, [moduleViewBox]);

  if (loadedJs) {
    return (
      <div class={`columns ${css.modules}`} data-breakpoint="md">
        <div class={css["svg-col"]}>
          <AnimatedSvg activeModule={activeModule} />
        </div>
        <div class={`flow | ${css["acc-col"]}`}>
          {moduleContent.map((element) => {
            return (
              <Disclosure
                title={element.data.title}
                module={element.data.module}
                isExpanded={expanded[`module${element.data.module}`]}
                onClick={() => handleClick(element.data.module)}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: element.body,
                  }}
                />
                <p class="text-color-title">
                  {" "}
                  <strong>
                    {element.data.availableLessons} de{" "}
                    {element.data.totalLessons} disponibles.{" "}
                  </strong>{" "}
                </p>
                <p class="fs-400 text-center">
                  <a
                    className={`has-icon ${disclosure["disclosure__module-link"]}`}
                    href={`/modulos/modulo-${element.data.module}/`}
                  >
                    <Icon
                      name={`module_${element.data.module}`}
                      width="100"
                      height="100"
                      viewBox="0 0 100 100"
                    />
                    <span>Ver lecciones del módulo {element.data.module}</span>
                  </a>
                </p>
              </Disclosure>
            );
          })}
        </div>
      </div>
    );
  }
}
