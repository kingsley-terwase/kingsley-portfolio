import { useEffect, useRef, useState } from "react";
import { AppBar, Toolbar, Box, Container, Typography, Button, IconButton, Drawer, Chip, Stack, Grid, Card, CardContent, useMediaQuery, Snackbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import DownloadIcon from "@mui/icons-material/InstallMobile";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { C } from "./theme";
import { profile, stats, skills, projects } from "./data";

const nav = ["About", "Skills", "Products", "Contact"];
const grad = `linear-gradient(135deg, ${C.sky}, #fff 50%, ${C.sky})`;

function Reveal({ children, delay = 0 }) {
  const ref = useRef(); const [on, setOn] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), o.disconnect()), { threshold: 0.15 });
    o.observe(ref.current); return () => o.disconnect();
  }, []);
  return <Box ref={ref} sx={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(40px) scale(.97)", transition: `all .9s cubic-bezier(.2,.8,.2,1) ${delay}ms` }}>{children}</Box>;
}

function Typewriter({ words }) {
  const [i, setI] = useState(0), [t, setT] = useState(""), [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i % words.length];
    const id = setTimeout(() => {
      if (!del) { setT(w.slice(0, t.length + 1)); if (t.length + 1 === w.length) setTimeout(() => setDel(true), 1200); }
      else { setT(w.slice(0, t.length - 1)); if (t.length <= 1) { setDel(false); setI(i + 1); } }
    }, del ? 40 : 90);
    return () => clearTimeout(id);
  }, [t, del, i, words]);
  return <span>{t}<Box component="span" sx={{ animation: "blink 1s infinite", color: C.sky }}>|</Box></span>;
}

function Title({ children, sub }) {
  return <Box textAlign="center" mb={7}>
    <Typography variant="h3" sx={{ fontSize: { xs: 32, md: 44 } }}>{children}</Typography>
    <Box sx={{ width: 80, height: 4, borderRadius: 4, bgcolor: C.sky, mx: "auto", my: 2, boxShadow: `0 0 18px ${C.sky}` }} />
    {sub && <Typography color="text.secondary" maxWidth={560} mx="auto">{sub}</Typography>}
  </Box>;
}

export default function App() {
  const [open, setOpen] = useState(false), [scrolled, setScrolled] = useState(false);
  const [prompt, setPrompt] = useState(null), [msg, setMsg] = useState("");
  const mobile = useMediaQuery("(max-width:800px)");
  const wa = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent("Hello Kingsley, I saw your portfolio.")}`;

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 30); window.addEventListener("scroll", s);
    const b = (e) => { e.preventDefault(); setPrompt(e); }; window.addEventListener("beforeinstallprompt", b);
    window.addEventListener("appinstalled", () => { setPrompt(null); setMsg("App installed. Find it on your home screen."); });
    return () => { window.removeEventListener("scroll", s); window.removeEventListener("beforeinstallprompt", b); };
  }, []);

  const install = async () => {
    if (!prompt) return setMsg("Use your browser menu and choose 'Install app' or 'Add to Home Screen'.");
    prompt.prompt(); await prompt.userChoice; setPrompt(null);
  };
  const go = (id) => { setOpen(false); document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <Box sx={{ overflowX: "hidden", background: `linear-gradient(180deg, ${C.navy}, ${C.deep})`, pt: "env(safe-area-inset-top)" }}>
      <AppBar position="fixed" elevation={0} sx={{ background: scrolled ? "rgba(6,20,46,.85)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", transition: ".4s", borderBottom: scrolled ? "1px solid rgba(79,195,247,.2)" : "none" }}>
        <Toolbar sx={{ maxWidth: 1200, width: "100%", mx: "auto" }}>
          <Typography onClick={() => go("top")} sx={{ fontWeight: 900, fontSize: 22, flexGrow: 1, cursor: "pointer" }}>Kingsley<span style={{ color: C.sky }}>.</span>T</Typography>
          {mobile ? <IconButton onClick={() => setOpen(true)} aria-label="menu"><MenuIcon /></IconButton> :
            <>{nav.map((n) => <Button key={n} color="inherit" onClick={() => go(n)} sx={{ mx: .5, "&:hover": { color: C.sky } }}>{n}</Button>)}
              <Button variant="outlined" startIcon={<DownloadIcon />} onClick={install} sx={{ ml: 2, borderRadius: 8 }}>Install App</Button></>}
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: 260, bgcolor: C.deep, p: 3 } }}>
        <Stack spacing={1} mt={6}>{nav.map((n) => <Button key={n} color="inherit" onClick={() => go(n)} sx={{ justifyContent: "flex-start", fontSize: 18 }}>{n}</Button>)}
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={() => { setOpen(false); install(); }}>Install App</Button></Stack>
      </Drawer>

      <Box id="top" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        {[[320, "8%", "12%", 0], [200, "75%", "18%", 2], [140, "60%", "70%", 4], [90, "15%", "75%", 1]].map(([s, l, t, d], k) =>
          <Box key={k} sx={{ position: "absolute", width: s, height: s, left: l, top: t, borderRadius: "50%", background: `radial-gradient(circle at 30% 30%, rgba(79,195,247,.35), transparent 70%)`, animation: `float ${7 + k}s ease-in-out ${d}s infinite`, filter: "blur(2px)" }} />)}
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, pt: 10 }}>
          <Grid container alignItems="center" spacing={6}>
            <Grid item xs={12} md={7}>
              <Reveal><Typography color={C.sky} fontWeight={700} fontSize={18}>Hello, I'm</Typography></Reveal>
              <Reveal delay={150}><Typography variant="h1" sx={{ fontSize: { xs: 44, sm: 64, md: 78 }, lineHeight: 1.05, background: grad, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shine 6s linear infinite" }}>{profile.name}</Typography></Reveal>
              <Reveal delay={300}><Typography variant="h5" sx={{ mt: 2, minHeight: 40, fontWeight: 700, fontSize: { xs: 20, md: 28 } }}><Typewriter words={profile.roles} /></Typography></Reveal>
              <Reveal delay={450}><Typography color="text.secondary" sx={{ mt: 3, maxWidth: 560, fontSize: 18, lineHeight: 1.8 }}>{profile.bio}</Typography></Reveal>
              <Reveal delay={600}><Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={4}>
                <Button size="large" variant="contained" onClick={() => go("Products")} sx={{ borderRadius: 8, px: 4, color: C.navy, boxShadow: `0 8px 30px rgba(79,195,247,.45)` }}>View My Products</Button>
                <Button size="large" variant="outlined" startIcon={<WhatsAppIcon />} href={wa} target="_blank" sx={{ borderRadius: 8, px: 4 }}>Let's Talk</Button>
              </Stack></Reveal>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ position: "relative", width: { xs: 240, md: 340 }, height: { xs: 240, md: 340 }, animation: "float 6s ease-in-out infinite" }}>
                <Box sx={{ position: "absolute", inset: 0, borderRadius: "50%", border: `2px dashed ${C.sky}`, animation: "spin 24s linear infinite" }} />
                <Box sx={{ position: "absolute", inset: 26, borderRadius: "50%", border: "2px solid rgba(79,195,247,.35)", animation: "spin 16s linear infinite reverse" }} />
                <Box sx={{ position: "absolute", inset: 52, borderRadius: "50%", background: `linear-gradient(135deg, ${C.mid}, ${C.sky})`, display: "grid", placeItems: "center", boxShadow: `0 0 70px rgba(79,195,247,.5)` }}>
                  <Typography sx={{ fontSize: { xs: 56, md: 84 }, fontWeight: 900 }}>KT</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container id="about" maxWidth="lg" sx={{ py: 12 }}>
        <Title sub={profile.location}>About Me</Title>
        <Grid container spacing={3}>
          {stats.map(([n, l], k) => <Grid item xs={12} sm={4} key={l}><Reveal delay={k * 150}>
            <Card sx={{ textAlign: "center", py: 3, background: "rgba(18,48,107,.5)", border: "1px solid rgba(79,195,247,.25)", transition: ".4s", "&:hover": { transform: "translateY(-8px)", borderColor: C.sky } }}>
              <Typography sx={{ fontSize: 54, fontWeight: 900, color: C.sky }}>{n}</Typography><Typography color="text.secondary">{l}</Typography></Card></Reveal></Grid>)}
        </Grid>
      </Container>

      <Container id="skills" maxWidth="md" sx={{ py: 10 }}>
        <Title sub="Tools and technologies I use to build production-grade software.">Skills</Title>
        <Reveal><Stack direction="row" flexWrap="wrap" gap={1.5} justifyContent="center">
          {skills.map((s) => <Chip key={s} label={s} sx={{ fontSize: 16, fontWeight: 700, py: 3, px: 1, bgcolor: "rgba(79,195,247,.12)", border: "1px solid rgba(79,195,247,.4)", transition: ".3s", "&:hover": { bgcolor: C.sky, color: C.navy, transform: "scale(1.1) rotate(-2deg)" } }} />)}
        </Stack></Reveal>
      </Container>

      <Container id="products" maxWidth="lg" sx={{ py: 12 }}>
        <Title sub="A selection of products I have designed, built and shipped.">Products I've Worked On</Title>
        <Grid container spacing={3}>
          {projects.map((p, k) => <Grid item xs={12} sm={6} md={4} key={p.name}><Reveal delay={(k % 3) * 150}>
            <Card sx={{ height: "100%", background: `linear-gradient(160deg, ${C.mid}, ${C.deep})`, border: "1px solid rgba(79,195,247,.2)", position: "relative", overflow: "hidden", transition: ".5s", "&:before": { content: '""', position: "absolute", top: 0, left: 0, height: 4, width: "100%", background: C.sky, transform: "scaleX(0)", transformOrigin: "left", transition: ".5s" }, "&:hover": { transform: "translateY(-10px)", boxShadow: `0 20px 50px rgba(79,195,247,.25)` }, "&:hover:before": { transform: "scaleX(1)" } }}>
              <CardContent sx={{ p: 3 }}>
                <Typography color={C.sky} fontWeight={700} fontSize={14}>{p.type}</Typography>
                <Typography variant="h5" fontWeight={800} my={1}>{p.name}</Typography>
                <Typography color="text.secondary" mb={2} lineHeight={1.7}>{p.desc}</Typography>
                <Stack direction="row" gap={1} flexWrap="wrap" mb={2}>{p.tech.map((t) => <Chip key={t} size="small" label={t} sx={{ bgcolor: "rgba(79,195,247,.15)" }} />)}</Stack>
                {p.link !== "#" && <Button size="small" endIcon={<OpenInNewIcon />} href={p.link} target="_blank">Visit</Button>}
              </CardContent></Card></Reveal></Grid>)}
        </Grid>
      </Container>

      <Container id="contact" maxWidth="md" sx={{ py: 12, textAlign: "center" }}>
        <Title sub="Hiring, collaborating or have a project in mind? Let's build something great.">Get In Touch</Title>
        <Reveal><Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
          <Button size="large" variant="contained" startIcon={<WhatsAppIcon />} href={wa} target="_blank" sx={{ borderRadius: 8, color: C.navy }}>WhatsApp</Button>
          <Button size="large" variant="outlined" startIcon={<EmailIcon />} href={`mailto:${profile.email}`} sx={{ borderRadius: 8 }}>Email Me</Button>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="center" mt={4}>
          {[[LinkedInIcon, profile.linkedin], [GitHubIcon, profile.github]].map(([I, h], k) => <IconButton key={k} href={h} target="_blank" sx={{ border: "1px solid rgba(79,195,247,.4)", transition: ".3s", "&:hover": { bgcolor: C.sky, color: C.navy, transform: "translateY(-4px)" } }}><I /></IconButton>)}
        </Stack></Reveal>
      </Container>
      <Box py={4} textAlign="center" borderTop="1px solid rgba(79,195,247,.15)" pb="calc(32px + env(safe-area-inset-bottom))">
        <Typography color="text.secondary" fontSize={14}>© {new Date().getFullYear()} {profile.name}. All rights reserved.</Typography>
      </Box>
      <Snackbar open={!!msg} autoHideDuration={5000} onClose={() => setMsg("")} message={msg} />
    </Box>
  );
}
