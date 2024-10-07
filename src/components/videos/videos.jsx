import { youtubeVideosData } from "@/data/youtubeVideosData";
import React from "react";
import VideoItem from "./VideoItem";
import Link from "next/link";

const Videos = () => {
  return (
    <div id="tech-posts" className="w-full">
      <div className="text-cyan-900 max-w-[1240px] mx-auto py-16 pz-2">
        <p className="text-xl tracking-widest uppercase pb-8 pl-2">
          Tech Videos
        </p>

        <p className="text-gray-500 text-sm tracking-widest pb-8 pl-2">
          Below are some of my YouTube Videos, If you enjoy the content,
          don&apos;t forget to subscribe, share, and leave a thumbs up! 👍
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {youtubeVideosData.map((element) => {
            return <VideoItem key={element.id} videoId={element.videoId} />;
          })}
        </div>
        <div className="my-10 mx-2">
          <Link
            href={"https://www.youtube.com/@king_rittik?sub_confirmation=1"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="shadow-lg shadow-red-400 mx-auto my-2 lg:my-2 md:my-2 uppercase p-1 px-4 text-center rounded-xl bg-red-600 text-white font-bold text-sm lg:text-lg md:text-lg cursor-pointer">
              More
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Videos;
