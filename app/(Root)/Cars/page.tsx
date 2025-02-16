import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      <div> Cars page </div>
      <Link href="profile">go to profile</Link>
    </div>
  );
}
