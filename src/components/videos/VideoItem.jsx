import { React, Suspense } from "react";
import Link from "next/link";

const VideoItem = ({ videoId }) => {
  console.log(videoId);
  return (
    <div className="relative flex items-center justify-center h-96 w-full shadow-xl shadow-cyan-700 rounded-xl p-2 group hover:bg-linear-to-b from-cyan-300 to-cyan-700">
      <Suspense fallback={<p>Loading video...</p>}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
          frameBorder="0"
          className="w-full rounded-xl h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </Suspense>
    </div>
  );
};

export default VideoItem;
