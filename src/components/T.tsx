import { Fragment } from "react";
import { en } from "@/i18n/en";
import { fr, type MessageKey } from "@/i18n/fr";

function Lines({ text }: { text: string }) {
  const lines = text.split("\n");
  return lines.map((line, index) => (
    <Fragment key={`${index}-${line}`}>
      {index > 0 ? <br /> : null}
      {line}
    </Fragment>
  ));
}

export function T({ k }: { k: MessageKey }) {
  return (
    <>
      <span className="only-fr">
        <Lines text={fr[k]} />
      </span>
      <span className="only-en">
        <Lines text={en[k]} />
      </span>
    </>
  );
}
