// Copyright  ©, 2022, Lightspark Group, Inc. - All Rights Reserved
/** @jsxImportSource @emotion/react */
import type { CSSObject } from "@emotion/styled";
import styled from "@emotion/styled";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { StyledTooltip } from "../styles/common.js";
import { Icon } from "./Icon.js";
import { UnstyledButton } from "./UnstyledButton.js";

type Props = {
  children?: React.ReactNode;
  value: string;
  isSm?: boolean;
  tooltipContent?: string;
  buttonCSS?: CSSObject;
  ml?: number;
  place?: "top" | "bottom" | "left" | "right";
  icon?: string;
  id?: string;
};

// This is a button that copies the specified value to the clipboard.
const CopyToClipboardButton = (props: Props) => {
  const originalTooltipContent = props.tooltipContent || "Click to copy";
  const icon = props.icon || "Copy";
  // unique id needed when there are multiple instances:
  const id = `copy-node-name-${props.id ?? nanoid()}`;
  const [tooltipContent, setTooltipContent] = useState(originalTooltipContent);

  return (
    <>
      <Button
        type="button"
        onClick={() => {
          void (async () => {
            try {
              await navigator.clipboard.writeText(props.value);
              setTooltipContent("Copied!");
            } catch (err) {
              setTooltipContent("Unable to copy");
            }
            setTimeout(() => {
              setTooltipContent(originalTooltipContent);
            }, 2000);
          })();
        }}
        css={props.buttonCSS}
        ml={props.ml}
        data-tooltip-id={id}
      >
        {props.children ? <Children>{props.children}</Children> : null}
        <Icon name={icon} width={props.isSm ? 12 : 16} />
      </Button>
      <StyledTooltip id={id} place={props.place || "right"} variant="dark">
        {tooltipContent}
      </StyledTooltip>
    </>
  );
};

const Children = styled.span`
  margin-right: 4px;
`;

const Button = styled(UnstyledButton)<{
  ml?: number | undefined;
}>`
  background: rgba(0, 0, 0, 0);
  vertical-align: middle;
  ${({ ml }) => (ml ? `margin-left: ${ml}px` : "")};
`;

export { CopyToClipboardButton };
