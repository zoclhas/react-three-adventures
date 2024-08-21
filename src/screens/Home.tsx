import { Link } from "react-router-dom";

export function Home() {
  const links: { href: string; label: string }[] = [
    {
      href: "/first-scene",
      label: "Line-Only Pyramid",
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
