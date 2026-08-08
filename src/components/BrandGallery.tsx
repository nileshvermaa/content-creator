"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import bbluntImage from "../../public/bblunt hair package.jpeg";
import benticaImage from "../../public/bentica mask.jpeg";
import caredaleImage from "../../public/caredale.jpeg";
import deodapImage from "../../public/deodaprakhi.jpeg";
import dermacoImage from "../../public/dermaco body lotion sunscreen.jpeg";
import drShethImage from "../../public/dr.shethserum.jpeg";
import joyImage from "../../public/joy face care.jpeg";
import pilgrimImage from "../../public/pilgrim hair serum.jpeg";
import himalayanImage from "../../public/vlado himalyan organic lcartinine biotin.jpeg";
import wishcareImage from "../../public/Wishcare.jpeg";

type BrandStill = {
  brand: string;
  detail: string;
  alt: string;
  image: StaticImageData;
};

const brandStills: BrandStill[] = [
  {
    brand: "BBLUNT",
    detail: "Hair care package",
    alt: "BBLUNT hair care products arranged beside pink flowers",
    image: bbluntImage,
  },
  {
    brand: "Bentica",
    detail: "Matcha Mellow Mask",
    alt: "Two green Bentica Matcha Mellow Mask packages in a styled product scene",
    image: benticaImage,
  },
  {
    brand: "Caredale",
    detail: "Collaboration package",
    alt: "Caredale collaboration package photographed with leafy plants",
    image: caredaleImage,
  },
  {
    brand: "DeoDap",
    detail: "Lifestyle collection",
    alt: "DeoDap lifestyle products arranged with flowers and a framed print",
    image: deodapImage,
  },
  {
    brand: "The Derma Co",
    detail: "Body care and sunscreen",
    alt: "The Derma Co body lotion and sunscreen displayed in a bright product scene",
    image: dermacoImage,
  },
  {
    brand: "Dr. Sheth's",
    detail: "Skin care serum",
    alt: "Dr. Sheth's skin care serum box photographed beside pink flowers",
    image: drShethImage,
  },
  {
    brand: "Joy",
    detail: "Face care collection",
    alt: "Joy face care products arranged together in an open package",
    image: joyImage,
  },
  {
    brand: "Pilgrim",
    detail: "Hair growth serum",
    alt: "Pilgrim hair growth serum package styled with flowers",
    image: pilgrimImage,
  },
  {
    brand: "Himalayan Organics",
    detail: "L-carnitine and biotin",
    alt: "Himalayan Organics supplement bottles arranged in a campaign still",
    image: himalayanImage,
  },
  {
    brand: "WishCare",
    detail: "Hair growth concentrate",
    alt: "WishCare hair growth concentrate package in a pink floral product scene",
    image: wishcareImage,
  },
];

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-5">
      <path
        d={direction === "left" ? "M19 12H5m6-6-6 6 6 6" : "M5 12h14m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BrandGallery() {
  const railRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStill = brandStills[activeIndex];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!dialogRef.current?.open) return;
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) => (index - 1 + brandStills.length) % brandStills.length);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((index) => (index + 1) % brandStills.length);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const openStill = (index: number) => {
    setActiveIndex(index);
    dialogRef.current?.showModal();
  };

  const scrollRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({
      left: direction * Math.min(rail.clientWidth * 0.82, 620),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <>
      <div className="mt-8 flex items-end justify-between gap-5">
        <div>
          <h3 className="font-(family-name:--font-display) text-2xl font-bold md:text-3xl">
            The PR shelf
          </h3>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
            Campaign drops, product stories, and a very photogenic mailroom.
          </p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollRail(-1)}
            aria-label="Previous collaboration images"
            className="flex size-11 items-center justify-center rounded-full border-2 border-ink bg-paper transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollRail(1)}
            aria-label="Next collaboration images"
            className="flex size-11 items-center justify-center rounded-full border-2 border-ink bg-paper transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        role="region"
        aria-label="Brand collaboration image gallery"
        tabIndex={0}
        className="-mx-8 mt-7 flex snap-x snap-mandatory gap-5 overflow-x-auto px-8 pb-7 pt-2 md:-mx-10 md:px-10"
      >
        {brandStills.map((still, index) => (
          <button
            type="button"
            key={still.brand}
            onClick={() => openStill(index)}
            aria-label={`View ${still.brand} collaboration image`}
            className={`group w-[72vw] max-w-[17rem] shrink-0 snap-center text-left transition-transform duration-500 hover:rotate-0 hover:-translate-y-1 sm:w-[42vw] lg:w-[23vw] xl:w-[14.5rem] ${
              index % 2 === 0 ? "md:-rotate-[1.2deg]" : "md:rotate-[1.2deg]"
            }`}
          >
            <figure>
              <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border-[3px] border-ink bg-paper">
                <Image
                  src={still.image}
                  alt={still.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1280px) 232px, (min-width: 1024px) 23vw, (min-width: 640px) 42vw, 72vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                />
                <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-paper text-ink shadow-[3px_3px_0_0_rgba(22,18,15,0.9)] transition-colors duration-300 group-hover:bg-rose group-hover:text-paper">
                  +
                </span>
              </div>
              <figcaption className="mt-4 flex items-start justify-between gap-4 px-1">
                <span>
                  <span className="font-(family-name:--font-display) block text-lg font-bold">
                    {still.brand}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">{still.detail}</span>
                </span>
                <span className="pt-1 text-xs font-semibold text-rose-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          </button>
        ))}
      </div>
      <p className="text-xs text-muted sm:hidden">Swipe the shelf to see every campaign still.</p>

      <dialog
        ref={dialogRef}
        aria-label={`${activeStill.brand} collaboration image`}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto max-h-[94vh] max-w-[94vw] bg-transparent p-0 backdrop:bg-ink/85"
      >
        <div className="relative w-[min(88vw,32rem)] overflow-hidden rounded-2xl border-[3px] border-ink bg-paper shadow-[10px_12px_0_0_rgba(255,61,143,0.55)]">
          <div className="relative h-[72vh] min-h-[28rem] bg-paper-soft">
            <Image
              src={activeStill.image}
              alt={activeStill.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 640px) 512px, 88vw"
              className="object-contain"
            />
          </div>
          <div className="flex items-center justify-between gap-4 border-t-[3px] border-ink px-5 py-4">
            <div>
              <p className="font-(family-name:--font-display) text-xl font-bold">
                {activeStill.brand}
              </p>
              <p className="text-sm text-muted">{activeStill.detail}</p>
            </div>
            <p className="text-xs font-semibold text-rose-deep">
              {String(activeIndex + 1).padStart(2, "0")} / {brandStills.length}
            </p>
          </div>

          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close collaboration image"
            className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full bg-ink text-xl text-paper transition-colors duration-300 hover:bg-rose"
          >
            &times;
          </button>
          <button
            type="button"
            onClick={() =>
              setActiveIndex((index) => (index - 1 + brandStills.length) % brandStills.length)
            }
            aria-label="Previous collaboration image"
            className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-paper transition-colors duration-300 hover:bg-rose"
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((index) => (index + 1) % brandStills.length)}
            aria-label="Next collaboration image"
            className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-paper transition-colors duration-300 hover:bg-rose"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      </dialog>
    </>
  );
}
