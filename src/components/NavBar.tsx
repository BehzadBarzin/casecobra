import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const NavBar = async () => {
  // ---------------------------------------------------------------------------
  // Authenticated user
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  // ---------------------------------------------------------------------------
  // Check if user is admin (only if the email is the same as the admin email)
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;
  // ---------------------------------------------------------------------------
  return (
    <nav className="sticky inset-x-0 top-0 z-[100] h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          {/* Logo---------------------------------------------------------- */}
          <Link href="/" className="z-40 flex font-semibold">
            case<span className="text-green-600">cobra</span>
          </Link>
          {/*  */}
          <div className="flex items-center space-x-4">
            {user ? (
              // If user is logged in:
              <>
                {/* Logout-------------------------------------------------- */}
                <Link
                  href="/api/auth/logout"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Logout
                </Link>
                {/* Dashboard----------------------------------------------- */}
                {/* Only if user is admin */}
                {isAdmin && (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Dashboard ✨
                  </Link>
                )}
                {/* Create Case--------------------------------------------- */}
                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden items-center gap-1 sm:flex",
                  })}
                >
                  Create Case
                  <ArrowRightIcon className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              // ---------------------------------------------------------------
              // If user is NOT logged in:
              <>
                {/* Register------------------------------------------------ */}
                <Link
                  href="/api/auth/register"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Register
                </Link>
                {/* Login--------------------------------------------------- */}
                <Link
                  href="/api/auth/login"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Login
                </Link>
                {/* Separator----------------------------------------------- */}
                <div className="hidden h-8 w-px bg-zinc-200 sm:block" />
                {/* Create Case--------------------------------------------- */}
                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden items-center gap-1 sm:flex",
                  })}
                >
                  Create Case
                  <ArrowRightIcon className="ml-1.5 h-5 w-5" />
                </Link>
              </>
              // ---------------------------------------------------------------
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default NavBar;
