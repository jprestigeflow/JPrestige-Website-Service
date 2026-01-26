
    // MOUSE FX
    const body = document.body;
    window.addEventListener('mousemove', (e) => {
        body.style.setProperty('--x', e.clientX + 'px');
        body.style.setProperty('--y', e.clientY + 'px');
    });

    // MENU LOGIC
    const burger = document.querySelector('.dock-burger');
    const menu = document.querySelector('.compact-menu');
    const links = document.querySelectorAll('.menu-link');

    if (burger) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
            burger.classList.toggle('active');
        });
        links.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                burger.classList.remove('active');
            });
        });
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !burger.contains(e.target)) {
                menu.classList.remove('active');
                burger.classList.remove('active');
            }
        });
    }

    // SCROLL LINE
    const line = document.querySelector('.scroll-line');
    window.addEventListener('scroll', () => { 
        const scrolled = window.scrollY; 
        const max = document.body.scrollHeight - window.innerHeight; 
        line.style.height = ((scrolled / max) * 100) + '%'; 
    });

    // MAGNET BUTTONS
    const magBtns = document.querySelectorAll('.btn-mag');
    magBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => btn.style.transform = 'translate(0, 0)');
    });

    // NEURAL BACKGROUND
    const c = document.getElementById('neural-canvas');
    const ctx = c.getContext('2d');
    let W, H, pts = [];
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; pts = Array.from({ length: 60 }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: 1.5 })); };
    window.addEventListener('resize', resize);
    const animate = () => { ctx.clearRect(0, 0, W, H); pts.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; ctx.fillStyle = 'rgba(0, 255, 170, 0.2)'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); }); requestAnimationFrame(animate); };
    resize(); animate();

    // SCROLL REVEAL
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // COUNTERS
    const counters = document.querySelectorAll('.counter');
    const countObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const suffix = entry.target.getAttribute('data-suffix') || "";
                let c = 0; const inc = target / 50;
                const timer = setInterval(() => { c += inc; if (c >= target) { entry.target.innerText = target + suffix; clearInterval(timer); } else { entry.target.innerText = Math.ceil(c) + suffix; } }, 30);
                countObs.unobserve(entry.target);
            }
        });
    });
    counters.forEach(c => countObs.observe(c));
