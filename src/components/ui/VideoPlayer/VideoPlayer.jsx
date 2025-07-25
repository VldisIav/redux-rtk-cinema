import React, { useEffect, useState } from "react";
import styles from "./VideoPlayer.module.css";
import classNames from "classnames"; // Правильный импорт

const VideoPlayer = () => {
  const [scriptHtml, setScriptHTML] = useState("");

  useEffect(() => {
    const dataUrl = window.location.href;

    fetch(
      '//pleer.videoplayers.club/get_player?w=610&h=370&type=widget&kp_id=&players=videocdn,hdvb,bazon,alloha,ustore,kodik,trailer&r_id=videoplayers&vni=VIDEOCDN&vti=&vdi=&hni=HDVB&hti=&hdi=&bni=BAZON&bti=&bdi=&alni=ALLOHATV&alti=&aldi=&usni=USTOREBZ&usti=&usdi=&koni=KODIK&koti=&kodi=&tti=&ru="' +
        dataUrl,
    )
      .then(res => res.text())
      .then(data => {
        const iframeMatch = data.match(/<iframe.*<\/iframe>/gm);
        if (iframeMatch) {
          setScriptHTML(iframeMatch[0]); // Теперь берем правильный индекс
        }
      });
  }, []);

  return (
    <div
      className={classNames("uitoolks", styles.video)} // Используем classNames
      id="videoplayers"
      dangerouslySetInnerHTML={{ __html: scriptHtml }}
    ></div>
  );
};

export default VideoPlayer;
