interface WindowConfig {
  url: string;
  height: number;
  width: number;
  status: string;
  toolbar: string;
  menubar: string;
  location: string;
  resizable: string;
  scrollbars: string;
  titlebar: string;
}

const windowConfigDefault: WindowConfig = {
  url: "",
  height: 600,
  width: 800,
  status: "no",
  toolbar: "no",
  menubar: "no",
  location: "no",
  resizable: "yes",
  scrollbars: "yes",
  titlebar: "no"
};

const openWindow = (windowConfigCustomize: Partial<WindowConfig>) => {
  const isMobile = window.innerWidth <= 768; // Basic mobile device check
  const config: WindowConfig = {
    ...windowConfigDefault,
    ...windowConfigCustomize
  };

  if (!config.url) {
    throw new Error("[url] is not defined!");
  }

  const height = isMobile ? window.innerHeight : config.height;
  const width = isMobile ? window.innerWidth : config.width;
  const iTop = (window.screen.availHeight - height) / 2;
  const iLeft = (window.screen.availWidth - width) / 2;

  window.open(
    config.url,
    "_blank",
    `height=${height},innerHeight=${height},width=${width},innerWidth=${width},top=${iTop},left=${iLeft},status=${config.status},toolbar=${config.toolbar},menubar=${config.menubar},location=${config.location},resizable=${config.resizable},scrollbars=${config.scrollbars},titlebar=${config.titlebar}`
  );
};

const closeWindow = () => {
  window.close();
};

export { openWindow, closeWindow };
