"use client";

import { useRef, useEffect, useState, use } from "react";
import Script from "next/script";

export default function Page() {
  const [loaded, setLoaded] = useState(false);
  const [online, setOnline] = useState(false);
  const [channel, setChannel] = useState("realhardstyle");

  const playerRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (!loaded) return;

    if (loaded) {
      // @ts-ignore
      playerRef.current = new Twitch.Player("twitch-player", {
        channel: "realhardstyle",
        width: 640,
        height: 360,
      });

      // @ts-ignore
      playerRef.current.addEventListener(Twitch.Player.ONLINE, () => {
        setOnline(true);
      });

      // @ts-ignore
      playerRef.current.addEventListener(Twitch.Player.OFFLINE, () => {
        console.log("player OFFLINE");
      });
    }
  }, [channel, loaded]);

  useEffect(() => {
    if (channel) {
      playerRef.current?.setChannel(channel);
    }
  }, [channel]);

  return (
    <div className="p-8">
      <div
        id="twitch-player"
        style={{
          display: online ? "block" : "none",
        }}
      ></div>

      {!online && <div>Player is offline, we hide the player</div>}

      <div className="mt-8 flex gap-4">
        <input
          type="text"
          className="text-base text-black p-2 rounded-md"
          placeholder="Channel name"
          ref={inputRef}
        />
        <button
          type="button"
          onClick={() => {
            setChannel(inputRef.current.value);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Set channel
        </button>
      </div>

      <Script
        src="https://player.twitch.tv/js/embed/v1.js"
        onReady={() => {
          setLoaded(true);
        }}
      />
    </div>
  );
}
