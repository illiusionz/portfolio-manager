export function loadScript(src, onLoad, id) {
  const existingScript = document.getElementById(id);
  if (existingScript) {
    onLoad();
    return;
  }

  const script = document.createElement('script');
  if (id) {
    script.id = id;
  }
  script.src = src;
  script.type = 'text/javascript';
  script.async = true;

  script.onload = onLoad;
  script.onerror = () => {
    console.error(`Error loading script: ${src}`);
  };

  document.body.appendChild(script);
}
