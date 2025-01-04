"use client";

import { Button } from "@/components/ui/button";
import { ApiRoutes, ApplicationRoutes } from "@/const/routes";
import { cn } from "@/utils/cn";
import { Menu, ScanEye } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef, useId, useState } from "react";

type NavLink = { label: string; href: string; isPrivate: boolean };

const links: NavLink[] = [
  { label: "Home", href: ApplicationRoutes.landing.home, isPrivate: false },
  {
    label: "Dashboard",
    href: ApplicationRoutes.application.dashboard,
    isPrivate: true,
  },
  { label: "About", href: ApplicationRoutes.landing.about, isPrivate: false },
  {
    label: "Contact",
    href: ApplicationRoutes.landing.contact,
    isPrivate: false,
  },
  { label: "Admin", href: ApplicationRoutes.landing.admin, isPrivate: true },
  {
    label: "Customer",
    href: ApplicationRoutes.landing.customer,
    isPrivate: true,
  },
  {
    label: "Protected",
    href: ApplicationRoutes.landing.protected,
    isPrivate: true,
  },
  { label: "Terms", href: ApplicationRoutes.landing.terms, isPrivate: false },
];

type NavbarProps = ComponentPropsWithoutRef<"header"> & {
  // TODO: add correct props when action (get current user data) will be created
  isUserAuthenticated: boolean;
};

export const Navbar = (props: NavbarProps) => {
  const { isUserAuthenticated, className, ...rest } = props;
  const pathname = usePathname();
  const menuId = useId();

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const filteredLinks = isUserAuthenticated
    ? links
    : links.filter((l) => !l.isPrivate);

  return (
    <header {...rest} className={cn(className)}>
      <nav className="bg-white border-gray-200 px-4 xl:px-6 py-2.5 flex gap-2 flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link
          href={ApplicationRoutes.landing.home}
          className="flex items-center gap-2 text-muted-foreground"
        >
          <ScanEye className="w-12 h-12" />
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            With auth
          </span>
        </Link>

        <div className="flex items-center xl:order-2 gap-2">
          {!isUserAuthenticated && (
            <>
              <Button asChild>
                <Link href={ApplicationRoutes.auth.login}>Log in</Link>
              </Button>
              <Button asChild variant={"secondary"}>
                <Link href={ApplicationRoutes.auth.registration}>
                  Get started
                </Link>
              </Button>{" "}
            </>
          )}

          {isUserAuthenticated && (
            <Button asChild>
              <a href={ApiRoutes.auth.logout}>Log Out</a>
            </Button>
          )}

          <Button
            data-collapse-toggle={menuId}
            type="button"
            size={"icon"}
            variant={"secondary"}
            aria-controls={menuId}
            aria-expanded={isMenuOpened}
            onClick={() => setIsMenuOpened((prev) => !prev)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="w-5 h-5" />
          </Button>
        </div>
        <div
          className={cn(
            "justify-between items-center w-full xl:flex xl:w-auto xl:order-1",
            !isMenuOpened && "hidden xl:flex"
          )}
          id={menuId}
        >
          <ul className="flex flex-col mt-4 font-medium xl:flex-row xl:space-x-8 xl:mt-0">
            {filteredLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block py-2 pr-4 pl-3",
                    pathname === link.href
                      ? "text-white rounded bg-primary xl:bg-transparent xl:text-primary xl:p-0"
                      : "text-gray-700 border-b border-gray-100 hover:bg-gray-50 xl:hover:bg-transparent xl:border-0 xl:hover:text-primary-700 xl:p-0"
                  )}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};
