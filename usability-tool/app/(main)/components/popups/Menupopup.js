import "@/styles/menupopup.scss";
import Link from "next/link";

export default function Menupopup({ id, active }) {
  return (
    <div className="menu-popup" role="menu" id={id} style={{maxHeight: active ? "100vh" : "0px"}}>
      <Link href="/main" className="menu-popup-list-item-link">
        Home
      </Link>
      {new Array(10).fill(0).map((_, i) => (
        <Link
          href={`/lessons/${i + 1}`}
          className="menu-popup-list-item-link"
          key={i}
        >
          Heuristic {i + 1}
        </Link>
      ))}
    </div>
  );
}
