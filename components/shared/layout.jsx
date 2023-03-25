import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
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
          // {
          //   href: "/adm/notifications",
          //   title: "Notifications",
          //   icon: "/icons/notifications.svg",
          // },
        ]);
        break;
    }
  }, [route]);

  return (
    <div className="min-h-screen w-screen bg-bg-color">
      <aside className="h-[calc(100%-32px)] bg-dark-grey rounded-2xl w-[250px] fixed top-4 left-4">
        <div className="flex justify-center items-center h-24 text-white gap-4 my-10">
          <div className="h-20 w-20 rounded-full overflow-hidden">
            <Image
              width={80}
              height={80}
              src="/placeholders/profile-picture.jpg"
              alt="profile picture"
            ></Image>
          </div>
          <div>
            <h2>ADM Name</h2>
            <p>ADM</p>
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
      <main className="flex-1 ml-[300px] w-[calc(100%-300px)]">{children}</main>
    </div>
  );
}
