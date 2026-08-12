const navbar = document.getElementById("navbar");
const navLinks = document.getElementById("navLinks");
const hamburger = document.getElementById("hamburger");

const onScroll = () => {
  navbar.classList.toggle("scrolled", window.scrollY > 12);
};

const toggleMenu = () => {
  navLinks.classList.toggle("open");
  hamburger.classList.toggle("open");
};

hamburger.addEventListener("click", toggleMenu);

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.classList.remove("open");
  });
});

const sections = Array.from(document.querySelectorAll("section[id]"));
const navAnchors = Array.from(navLinks.querySelectorAll("a"));

const highlightNav = () => {
  const scrolled = window.scrollY + navbar.offsetHeight + 80;
  let currentId = sections[0] ? sections[0].id : null;

  sections.forEach((section) => {
    if (scrolled >= section.offsetTop) {
      currentId = section.id;
    }
  });

  const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 4;
  if (bottom) {
    currentId = sections[sections.length - 1].id;
  }

  navAnchors.forEach((anchor) => {
    anchor.classList.toggle("active", anchor.getAttribute("href") === `#${currentId}`);
  });
};

const revealOnScroll = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
};

onScroll();
revealOnScroll();

let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      onScroll();
      highlightNav();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

window.addEventListener("resize", highlightNav, { passive: true });