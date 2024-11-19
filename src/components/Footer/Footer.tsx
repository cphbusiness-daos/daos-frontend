import { Fragment } from "react/jsx-runtime";

import { DesktopFooter } from "./DesktopFooter";
import { MobileFooter } from "./MobileFooter";

export function Footer() {
  return (
    <Fragment>
      <DesktopFooter />
      <MobileFooter />
    </Fragment>
  );
}
