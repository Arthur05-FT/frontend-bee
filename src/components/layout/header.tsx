"use client";

import React from "react";
import { ModeToggle } from "../ui/mode-toggle";
import { usePathname } from "next/navigation";
// import Image from "next/image";

export function Header() {
  const pathname = usePathname();
  if (
    pathname === "/auth/sign-in" ||
    pathname === "/auth/sign-up" ||
    pathname === "/auth/access"
  )
    return null;
  return (
    <header className="flex justify-between px-10 py-5">
      {/* <Image src="/bee-dark.png" width={50} height={50} alt="Bee logo" /> */}
      <span>Bee</span>
      <ModeToggle />
    </header>
  );
}

export function HeaderSignInAndSignUp() {
  return (
    <header className="flex justify-between items-center px-10 py-5 w-full">
      {/* <Image src="/bee-light.png" width={50} height={50} alt="Bee logo" /> */}
      <span>Bee</span>
      <ModeToggle />
    </header>
  );
}
