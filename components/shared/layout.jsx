import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const username ="nom d'utilisateur"
  const role ="role"
  const profile = "/placeholders/profile-picture.jpg"
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
    }
  }, [route]);

  return (
    <div className="min-h-screen w-screen bg--bg-color overflow-hidden">
      <aside className="h-[calc(100%-32px)] bg-dark-grey rounded-2xl w-[250px] fixed top-4 left-4">
        <div className="flex justify-center items-center h-24 text-white gap-4 my-10">
          <div className="h-20 w-20 rounded-lg overflow-hidden">
            <Image
              width={80}
              height={80}
              src={profile}
              alt="profile picture"
            ></Image>
          </div>
          <div>
            <h2>{username}</h2>
            <hr className="border-[#D15205] border-1"></hr>
            <p>{role}</p>
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
                      "bg-white"
                    }`}
                  >
                    <Image height={24} width={24} src={icon} alt="icon"></Image>
                    {title}
                  </span>
                </Link>
              </li>
            ))}
            <li className="text-white w-full  flex gap-4 justify-center absolute bottom-12">
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
      <main className="flex-1 ml-[316px] w-[calc(100%-316px)] overflow-hidden">{children}</main>
    </div>
  );
}
