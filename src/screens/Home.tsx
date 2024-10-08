import { Link } from "react-router-dom";

export function Home() {
  const links: { href: string; label: string }[] = [
    {
      href: "/first-scene",
      label: "Line-Only Pyramid",
    },
    {
      href: "/cubes",
      label: "Cubes",
    },
    {
      href: "/animation",
      label: "Animation",
    },
    {
      href: "/debug-ui",
      label: "Debug UI",
    },
    {
      href: "/textures",
      label: "Textures",
    },
    {
      href: "/materials",
      label: "Materials",
    },
    {
      href: "/lights",
      label: "Lights",
    },
    {
      href: "/shadows",
      label: "Shadows",
    },
    {
      href: "/physics",
      label: "Physics",
    },
  ];

  return (
    <ul className="list-decimal p-4 pl-8">
      {links.map((link) => (
        <li key={link.href}>
          <Link to={link.href} className="text-blue-600 underline">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
