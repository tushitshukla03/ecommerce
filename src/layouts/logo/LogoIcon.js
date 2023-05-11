import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import LogoDark from "public/logo.svg";

const LogoIcon = () => {
  return (
    <Link href="/">
      <Image src={LogoDark} alt={LogoDark}  height={30} width={60} className="m-auto"/>
    </Link>
  );
};

export default LogoIcon;
