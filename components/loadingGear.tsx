import React from "react";
import "../styles/loadingGear.css";

export default function LoadingGear() {
  return (
    <div className="relative w-48 h-24 flex justify-end ">
      {/* the big gear */}
      <div className="absolute w-14 h-14 left-14 top-5.25  rounded-full dark:bg-[#323232] bg-black box-border animate-rotationBack before:content-[''] before:absolute before:w-14 before:h-14 before:rounded-full dark:before:bg-[#323232] before:bg-black before:bg-[radial-gradient(circle_12px_at_27px_27px,var(--base-color)_100%,transparent_0),radial-gradient(circle_6px_at_27px_0px,var(--base-color)_100%,transparent_0),radial-gradient(circle_6px_at_0px_27px,var(--base-color)_100%,transparent_0),radial-gradient(circle_6px_at_54px_27px,var(--base-color)_100%,transparent_0),radial-gradient(circle_6px_at_27px_54px,var(--base-color)_100%,transparent_0),radial-gradient(circle_6px_at_45px_7.5px,var(--base-color)_100%,transparent_0),radial-gradient(circle_6px_at_45px_7.5px,var(--base-color)_100%,transparent_0),radial-gradient(circle_6px_at_45px_45px,var(--base-color)_100%,transparent_0),radial-gradient(circle_6px_at_7.5px_45px,var(--base-color)_100%,transparent_0),radial-gradient(circle_6px_at_7.5px_7.5px,var(--base-color)_100%,transparent_0)]"></div>
      {/* the small gear */}
      <div className="absolute left-28 top-5 w-9 h-9 rounded-full dark:bg-[#323232] bg-black box-border animate-rotationBackReverse before:content-[''] before:absolute before:w-9 before:h-9 before:rounded-full dark:before:bg-[#323232] before:bg-black before:bg-[radial-gradient(circle_7.5px_at_18px_18px,var(--base-color)_100%,transparent_0),radial-gradient(circle_3.75px_at_18px_0px,var(--base-color)_100%,transparent_0),radial-gradient(circle_3.75px_at_0px_18px,var(--base-color)_100%,transparent_0),radial-gradient(circle_3.75px_at_36px_18px,var(--base-color)_100%,transparent_0),radial-gradient(circle_3.75px_at_18px_36px,var(--base-color)_100%,transparent_0),radial-gradient(circle_3.75px_at_30px_4.5px,var(--base-color)_100%,transparent_0),radial-gradient(circle_3.75px_at_30px_4.5px,var(--base-color)_100%,transparent_0),radial-gradient(circle_3.75px_at_30px_30px,var(--base-color)_100%,transparent_0),radial-gradient(circle_3.75px_at_4.5px_30px,var(--base-color)_100%,transparent_0),radial-gradient(circle_3.75px_at_4.5px_4.5px,var(--base-color)_100%,transparent_0)]"></div>
    </div>
  );
}
