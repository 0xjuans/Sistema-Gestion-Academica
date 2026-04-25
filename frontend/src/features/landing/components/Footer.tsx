import styles from "./Footer.module.css";

const columns = [
  {
    title: "Producto",
    links: ["Funcionalidades", "Precios", "Casos de Exito"],
  },
  {
    title: "Recursos",
    links: ["Soporte", "Documentacion", "Blog"],
  },
  {
    title: "Legal",
    links: ["Privacidad", "Terminos", "Cookies"],
  },
];

const socialLinks = [
  {
    name: "LinkedIn",
    url: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 0 0 3.3 4.97c0 1.08.86 1.97 1.95 1.97h.02c1.1 0 1.97-.89 1.97-1.97A1.97 1.97 0 0 0 5.25 3ZM20.7 13.4c0-3.12-1.67-4.57-3.89-4.57-1.8 0-2.6.99-3.04 1.69V8.5H10.4c.04 1.34 0 11.5 0 11.5h3.38v-6.42c0-.34.03-.68.12-.92.27-.67.87-1.36 1.88-1.36 1.32 0 1.84 1.01 1.84 2.49V20H21v-6.6Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 7.2A4.8 4.8 0 1 0 16.8 12 4.81 4.81 0 0 0 12 7.2Zm0 7.92A3.12 3.12 0 1 1 15.12 12 3.13 3.13 0 0 1 12 15.12ZM18.12 7a1.12 1.12 0 1 1-1.12-1.12A1.12 1.12 0 0 1 18.12 7Zm3.18 1.14a5.54 5.54 0 0 0-1.51-3.92A5.57 5.57 0 0 0 15.86 2.7C14.31 2.61 9.69 2.61 8.14 2.7A5.57 5.57 0 0 0 4.21 4.2a5.54 5.54 0 0 0-1.51 3.92C2.61 9.69 2.61 14.31 2.7 15.86a5.54 5.54 0 0 0 1.51 3.92 5.57 5.57 0 0 0 3.93 1.51c1.55.09 6.17.09 7.72 0a5.57 5.57 0 0 0 3.93-1.51 5.54 5.54 0 0 0 1.51-3.92c.09-1.55.09-6.17 0-7.72ZM19.3 17.5a3.83 3.83 0 0 1-2.15 2.15c-1.49.59-5.02.45-6.3.45s-4.81.14-6.3-.45A3.83 3.83 0 0 1 2.4 17.5c-.59-1.49-.45-5.02-.45-6.3s-.14-4.81.45-6.3A3.83 3.83 0 0 1 4.55 2.75c1.49-.59 5.02-.45 6.3-.45s4.81-.14 6.3.45A3.83 3.83 0 0 1 19.3 4.9c.59 1.49.45 5.02.45 6.3s.14 4.81-.45 6.3Z" />
      </svg>
    ),
  },
  {
    name: "X",
    url: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.9 3h2.9l-6.35 7.26L23 21h-5.95l-4.66-6.08L7.07 21H4.16l6.8-7.78L1 3h6.1l4.21 5.55L18.9 3Zm-1.03 16.24h1.61L6.22 4.67H4.5l13.37 14.57Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "#",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.5 7.2a3.01 3.01 0 0 0-2.12-2.13C19.5 4.5 12 4.5 12 4.5s-7.5 0-9.38.57A3.01 3.01 0 0 0 .5 7.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 4.8 3.01 3.01 0 0 0 2.12 2.13C4.5 19.5 12 19.5 12 19.5s7.5 0 9.38-.57a3.01 3.01 0 0 0 2.12-2.13A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-4.8ZM9.6 15.2V8.8l6.2 3.2-6.2 3.2Z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <strong>EduManage</strong>
          <p className={styles.brandBadge}>Plataforma SaaS para instituciones educativas</p>
          <p>Excelencia academica a traves de la tecnologia.</p>
          <div className={styles.social}>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                aria-label={social.name}
                className={styles.socialLink}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h4>{column.title}</h4>
            <ul>
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.bottomBar}>
        <p>Copyright 2026 EduManage. Todos los derechos reservados.</p>
        <p className={styles.bottomSupport}>soporte@edumanage.com</p>
      </div>
    </footer>
  );
}
