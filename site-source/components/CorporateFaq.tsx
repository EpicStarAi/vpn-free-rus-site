"use client";

import { useState } from "react";
import { corporateFaq } from "@/data/corporate";

export function CorporateFaq() {
  const [open, setOpen] = useState(0);

  return (
    <div className="corp-faq">
      {corporateFaq.map((item, index) => (
        <article className={open === index ? "is-open" : undefined} key={item.question}>
          <button
            type="button"
            aria-expanded={open === index}
            onClick={() => setOpen(open === index ? -1 : index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.question}</strong>
            <i aria-hidden="true">{open === index ? "−" : "+"}</i>
          </button>
          {open === index && <p>{item.answer}</p>}
        </article>
      ))}
    </div>
  );
}
