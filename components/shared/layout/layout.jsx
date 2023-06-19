"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  //const role = localStorage.getItem('role');
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  const router = useRouter();
  const route = router.pathname.split("/")[1];
  const subRoute = router.pathname.split("/")[2];
  const [menuItems, setMenuItems] = useState();

  useEffect(() => {
    switch (route) {
      case "adm":
        setMenuItems([
          {
            href: "/adm/dashboard",
            title: "Tableau de bord",
            icon: "/icons/dashboard.svg",
          },
          {
            href: "/adm/distributors",
            title: "Distributeurs",
            icon: "/icons/mug.svg",
          },
          {
            href: "/adm/finance",
            title: "Finance",
            icon: "/icons/finance.svg",
          },
          {
            href: "/adm/employees",
            title: "Employes",
            icon: "/icons/user.svg",
          },
        ]);
        break;
      case "ac":
        setMenuItems([
          {
            href: "/ac/profil",
            title: "Profil",
            icon: "/icons/user.svg",
          },
          {
            href: "/ac/reclamations",
            title: "Reclamations",
            icon: "/icons/reclamationIcon.svg",
          },
          {
            href: "/ac/boissons",
            title: "Boissons",
            icon: "/icons/mug.svg",
          },
          {
            href: "/ac/ads",
            title: "Annonces",
            icon: "/icons/adIcon.svg",
          },
          {
            href: "/ac/advertisers",
            title: "Annonceurs",
            icon: "/icons/adIcon.svg",
          },
        ]);
        break;
      case "sadm":
        setMenuItems([
          {
            href: "/sadm/distributeurs",
            title: "Distributeurs",
            icon: "/icons/mug.svg",
          },
          {
            href: "/sadm/clients",
            title: "Clients",
            icon: "/icons/user.svg",
          },
        ]);
        break;
      case "decideur":
        setMenuItems([
          {
            href: "/decideur/distributeurs",
            title: "Distributeurs",
            icon: "/icons/mug.svg",
          },
          {
            href: "/decideur/dashboard",
            title: "Tableau de bord",
            icon: "/icons/dashboard.svg",
          },
          {
            href: "/decideur/finance",
            title: "Finance",
            icon: "/icons/finance.svg",
          },
        ]);
        break;
    }
    !role && setRole(localStorage.getItem("role"));
    !username && setUsername(localStorage.getItem("name"));
  }, [route]);

  return (
    <div className="relative w-full min-h-screen">
      <aside className="h-[calc(100%-32px)] bg-dark-grey rounded-2xl w-[250px] fixed top-4 left-4">
        <div className="flex items-center justify-center h-24 gap-4 my-10 text-white">
          <div>
            <h2 className="font-bold text-[26px] -mt-8">
              {" " + username + " "}
            </h2>
            <p className="font-bold text-[20px]">{role}</p>
          </div>
        </div>

        <nav>
          <ul>
            {menuItems?.map(({ href, title, icon }) => (
              <li className="m-2" key={title}>
                <Link href={href}>
                  <span
                    className={`gap-4 flex p-4 bg-bg-grey rounded-xl hover:bg-white cursor-pointer ${
                      (router.asPath === href ||
                        router.pathname === href + "/[pid]") &&
                      "bg-white  "
                    }`}
                  >
                    <Image height={24} width={24} src={icon} alt="icon"></Image>
                    {title}
                  </span>
                </Link>
              </li>
            ))}
            <li
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/login");
              }}
              className="absolute flex justify-center w-full gap-4 text-white cursor-pointer bottom-12"
            >
              <Image
                width={24}
                height={24}
                src="/icons/logout.svg"
                alt="icon"
              ></Image>
              Se deconnecter
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 ml-[300px] w-[calc(100%-360px)] ">
        {children}
      </main>
    </div>
  );
}
