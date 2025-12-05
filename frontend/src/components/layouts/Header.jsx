import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className="">
      <Link to="/">
        <FontAwesomeIcon icon={faHouse} />
      </Link>
    </div>
  );
}
