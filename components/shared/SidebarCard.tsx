"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
}
const SidebarCard = ({ id, name, username, imgUrl }: Props) => {
  const router = useRouter();
  return (
    <article className="user-card">
      <Link href={`/profile/${id}`}>
        <div className="user-card_avatar">
          <Image
            src={imgUrl}
            alt="profilePic"
            width={48}
            height={48}
            className="rounded-full"
          />

          <div className="flex-1 text-ellipsis">
            <h4 className="text-base-semibold text-light-1">{name}</h4>
            <p className="text-small-medium text-gray-1">@{username}</p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default SidebarCard;
