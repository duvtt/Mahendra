import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

function App() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState('beranda'); 
  const [isHovering, setIsHovering] = useState(false); 

  useEffect(() => {
    const updateMousePosition = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['beranda', 'proyek', 'tentang', 'kontak'];
      let current = 'beranda';
      sections.forEach(section => {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 300) {
          current = section;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // LINK SOSIAL MEDIA & KONTAK
  const socialLinks = {
   email: "https://mail.google.com/mail/?view=cm&fs=1&to=mademahendra385@gmail.com", 
    github: "https://github.com/duvtt",
    instagram: "https://instagram.com/dedut_48", 
    cv: "/cv-mahendra.pdf" // Pastikan nama file PDF ini ada di dalam folder 'public'
  };

  // 2. DATA & FOTO 
  const projectsData = [
  {
    id: 1,
    year: '2026',
    title: 'MatrixSketch',
    desc: 'Aplikasi Android untuk menggambar sketsa dengan efek matriks. untuk pengalaman pengguna yang interaktif.',
    fullDesc: 'MatrixSketch adalah aplikasi mobile berbasis Java yang dikembangkan menggunakan Android Studio. Aplikasi ini dirancang untuk memberikan pengalaman menggambar yang unik dengan mengintegrasikan filter visual bergaya matriks secara real-time, mengutamakan performa rendering dan efisiensi memori pada perangkat mobile.', // Deskripsi panjang untuk pop-up
    tech: ['Java', 'Android Studio'],
    link: "https://github.com/duvtt/MatrixSketch/releases/tag/v1.0",
    image: "/Mahendra/images/MS v.png"
  },
  {
    id: 2,
    year: '2026',
    title: 'SIDD Mobile',
    desc: 'Sistem Informasi Dana Desa (SIDD). Aplikasi ini digunakan untuk mempermudah pemantauan keuangan lebih mudah melalui Android.',
   fullDesc: 'SIDD Mobile adalah aplikasi mobile berbasis Java yang dikembangkan menggunakan Android Studio. Aplikasi ini dirancang untuk mempermudah pemantauan keuangan desa melalui platform mobile, memberikan akses yang lebih mudah dan cepat terhadap informasi keuangan desa.', // Deskripsi panjang untuk pop-up
    tech: ['Java', 'Android Studio'],
    link: "https://github.com/duvtt/sidd-mobile/releases/tag/v1.0",
    image: "/Mahendra/images/SIDD v.png"
  },
  {
    id: 3,
    year: '2026',
    title: 'FIXIT',
    desc: 'Website untuk pelaporan fasilitas dengan cepat dengan teknologi modern.',
    fullDesc: 'FIXIT adalah website untuk pelaporan fasilitas dengan cepat menggunakan teknologi modern. Website ini dirancang untuk memberikan pengalaman pengguna yang baik dan efisien dalam melaporkan masalah fasilitas.', // Deskripsi panjang untuk pop-up
    tech: ['React', 'Tailwind CSS', 'Node.js'],
    link: "https://github.com/duvtt/FIXIT",
    image: "/Mahendra/images/FIX.png"
  }
];

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 font-sans selection:bg-orange-500/30 overflow-hidden relative cursor-none">
      
      {/* Kursor */}
      <motion.div 
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{ 
          width: isHovering ? 56 : 24,
          height: isHovering ? 56 : 24,
          backgroundColor: isHovering ? "rgba(255, 255, 255, 0.05)" : "transparent",
          borderColor: isHovering ? "rgba(255, 255, 255, 0.15)" : "rgba(249, 115, 22, 0.8)",
          borderWidth: isHovering ? 1 : 2,
        }}
        transition={{ width: { duration: 0.2 }, height: { duration: 0.2 } }}
      >
        <motion.div 
          animate={{ opacity: isHovering ? 0 : 1, scale: isHovering ? 0 : 1 }}
          className="w-1.5 h-1.5 bg-yellow-400 rounded-full"
        ></motion.div>
      </motion.div>

      {/* Latar Belakang */}
      <div className="fixed top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full bg-orange-600/10 filter blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-900/10 filter blur-[150px] pointer-events-none z-0"></div>
      
      <motion.div animate={{ y: [0, -50, 0], opacity: [0.1, 0.5, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="fixed top-[25%] left-[20%] w-2 h-2 bg-orange-400 rounded-full blur-[1px] pointer-events-none z-0"></motion.div>
      <motion.div animate={{ y: [0, 40, 0], opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="fixed bottom-[30%] right-[15%] w-3 h-3 bg-purple-400 rounded-full blur-[2px] pointer-events-none z-0"></motion.div>
      <motion.div animate={{ x: [0, -30, 0], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="fixed top-[60%] left-[10%] w-4 h-4 bg-yellow-500 rounded-full blur-[3px] pointer-events-none z-0"></motion.div>

      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-[100] px-8 py-6">
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto flex justify-between items-center"
        >
          <div 
            onClick={() => scrollToSection('beranda')} 
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="font-extrabold text-sm tracking-[0.2em] text-white cursor-none hover:text-orange-400 transition-colors uppercase relative z-10"
          >
            Mahendra.
          </div>
          
          <div className="hidden md:flex items-center bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-full px-2 py-1.5 shadow-2xl relative z-10">
            {['beranda', 'proyek', 'tentang', 'kontak'].map((item) => (
              <div
                key={item}
                onClick={() => scrollToSection(item)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="relative px-5 py-2 cursor-none"
              >
                {activeSection === item && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 text-xs font-semibold capitalize transition-colors duration-300 ${activeSection === item ? 'text-white' : 'text-slate-400 hover:text-white'}`}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.nav>
      </div>

   {/* HERO SECTION */}
      <motion.main 
        id="beranda"
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center max-w-7xl mx-auto"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="inline-block px-5 py-2 mb-8 rounded-full border border-orange-500/30 bg-orange-500/5 text-orange-400 text-xs font-bold uppercase tracking-widest cursor-none transition-colors hover:bg-orange-500/10 hover:shadow-[0_0_15px_rgba(249,115,22,0.2)]"
        >
          Creative Software Developer
        </motion.div>
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-300 drop-shadow-[0_0_30px_rgba(249,115,22,0.6)]">
            Mahendra
          </span>
        </h1>
        <p className="text-slate-400 max-w-2xl text-lg md:text-xl leading-relaxed mb-12 font-light">
          Membangun pengalaman digital dengan presisi estetika dan desain interaksi yang mulus.
        </p>
        <div className="flex flex-col md:flex-row gap-5">
          <button 
            onClick={() => scrollToSection('proyek')} 
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="cursor-none bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-extrabold py-3.5 px-8 rounded-full hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(249,115,22,0.4)] active:scale-95 transition-all duration-300"
          >
            Lihat Proyek
          </button>
          
          {/* cv btn */}
          <a 
            href={socialLinks.cv}
            download="CV_Mahendra.pdf"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="cursor-none bg-white/5 border border-white/10 text-white font-bold py-3.5 px-8 rounded-full hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,255,255,0.05)] active:scale-95 transition-all duration-300"
          >
            Unduh CV
          </a>
        </div>
      </motion.main>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50 relative z-10 max-w-7xl mx-auto"></div>

{/* SEKSI PROYEK */}
      <section id="proyek" className="relative z-10 pt-32 pb-32 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeUpVariant} className="mb-16 text-center md:text-left">
          <h2 className="text-xs font-bold text-slate-500 tracking-[0.15em] uppercase mb-2">Karya Terpilih</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white">Proyek Saya.</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectsData.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => { setSelectedProject(item); setIsHovering(false); }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="cursor-none bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-md border border-white/[0.08] rounded-3xl overflow-hidden hover:border-orange-500/40 hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)] hover:-translate-y-3 transition-all duration-500 group flex flex-col relative h-[28rem]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
              
             
              <div className="h-48 w-full flex items-center justify-center relative border-b border-white/[0.05] overflow-hidden">
                
                 <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              
              <div className="p-8 flex flex-col flex-grow relative z-20">
                <div className="mb-4 flex gap-2">
                  <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-full uppercase tracking-wider border border-orange-500/20">
                    {item.year}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors drop-shadow-sm">{item.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">{item.desc}</p>
                <div className="mt-auto pt-4 border-t border-white/[0.05]">
                  <span className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors uppercase tracking-wider flex items-center gap-2">
                    Lihat Proyek
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50 relative z-10 max-w-7xl mx-auto"></div>

 {/* SEKSI TENTANG */}
      <motion.section 
        id="tentang"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
        className="relative z-10 pt-32 pb-32 px-6 max-w-7xl mx-auto min-h-screen flex items-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <div>
            <h2 className="text-xs font-bold text-slate-500 tracking-[0.15em] uppercase mb-4">Tentang</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-12">Filosofi</h3>
            <p className="text-2xl md:text-3xl text-slate-300 font-medium leading-relaxed tracking-tight">
              Saya percaya antarmuka yang hebat itu tidak terlihat. <br/><br/>
              Mereka dibangun dengan kode berbasis komponen yang bersih dan mengekspresikan diri melalui interaksi yang terasa intuitif, presisi, dan mudah digunakan.
            </p>
          </div>
          <div className="flex flex-col items-start lg:items-center">
            <div 
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="relative w-48 h-48 mb-10 flex items-center justify-center cursor-none"
            >
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-full h-full border border-white/5 rounded-full border-t-orange-500/50 border-r-purple-500/30" />
               <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute w-[75%] h-[75%] border border-white/5 rounded-full border-b-yellow-500/50 border-l-orange-500/30" />
               <div className="w-2 h-2 bg-slate-300 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
            </div>
            <div className="text-slate-400 text-sm leading-relaxed max-w-sm space-y-4">
              <p>Setiap proyek dimulai dengan pemahaman mendalam tentang pengguna — alur, batasan, dan momen-momen yang menentukan sebuah pengalaman. Dari sana, saya membangun antarmuka yang terasa hidup.</p>
              <p>Sebagai pengembang, saya terobsesi dengan tipografi, jarak ruang, waktu animasi, dan arsitektur komponen, selalu mengoptimalkan kejelasan, kecepatan, dan kerajinan yang sempurna pada setiap pikselnya.</p>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50 relative z-10 max-w-7xl mx-auto"></div>

{/* SEKSI KONTAK */}
      <motion.section 
        id="kontak"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
        className="relative z-10 pt-32 pb-32 px-6 max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[80vh]"
      >
        <div 
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="bg-gradient-to-b from-[#0f0f11]/90 to-[#09090b] backdrop-blur-xl border border-white/[0.08] rounded-[2rem] p-10 md:p-16 text-center w-full shadow-2xl relative overflow-hidden group hover:border-orange-500/40 hover:shadow-[0_20px_60px_rgba(249,115,22,0.15)] hover:-translate-y-2 transition-all duration-500 cursor-none"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-orange-500/5 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <h2 className="text-xs font-bold text-slate-500 tracking-[0.2em] uppercase mb-8 relative z-10">Kontak</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight relative z-10">
            Siap membangun <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-500">hal besar selanjutnya?</span>
          </h3>
          <p className="text-slate-400 mb-10 text-sm leading-relaxed max-w-md mx-auto relative z-10">
            Mari ciptakan sesuatu yang luar biasa bersama. Saya terbuka untuk pekerjaan lepas dan kolaborasi kreatif.
          </p>

          {/* TAUTAN EMAIL AKTIF */}
          <a 
            href={socialLinks.email} 
            className="cursor-none inline-flex items-center gap-3 bg-white/5 border border-white/10 text-slate-200 font-medium py-3 px-6 rounded-xl hover:bg-orange-500 hover:text-black hover:border-orange-500 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(249,115,22,0.3)] active:scale-95 transition-all duration-300 mb-12 relative z-10"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            Email Saya
          </a>

          <div className="flex justify-center gap-5 relative z-10">
            {/* TAUTAN GITHUB AKTIF */}
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="cursor-none bg-white/5 border border-white/5 p-3 rounded-lg text-slate-400 hover:text-white hover:bg-orange-500 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(249,115,22,0.3)] transition-all duration-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            
            {/* TAUTAN INSTAGRAM AKTIF */}
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="cursor-none bg-white/5 border border-white/5 p-3 rounded-lg text-slate-400 hover:text-white hover:bg-orange-500 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(249,115,22,0.3)] transition-all duration-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </div>
      </motion.section>

{/* FOOTER */}
      <footer className="relative z-10 pb-10 text-center text-slate-600 text-[10px] font-bold tracking-[0.2em] uppercase">
        <p>© 2026 MAHENDRA</p>
      </footer>

{/* POP-UP MODAL PROYEK GLASSMORPHISM POTRET */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-6">
            
            {/* OVERLAY LATAR BELAKANG (Diperbaiki agar blurnya sangat terlihat) */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-md cursor-none"
              onClick={() => setSelectedProject(null)} 
            ></motion.div>
            
           
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#0a0a0c]/50 backdrop-blur-3xl border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,1)] z-10 flex flex-col cursor-none"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-md border border-white/10 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-white/20 transition-colors cursor-none"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              
              <div className="h-72 bg-black/40 w-full flex items-center justify-center relative border-b border-white/5 overflow-hidden">
                <img src={selectedProject.image} alt={selectedProject.title} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0c]/90 to-transparent"></div>
              </div>
              
              <div className="p-8 relative -mt-6 z-10 flex flex-col flex-grow">
                <div>
                  <span className="text-[10px] font-extrabold text-purple-400 bg-purple-500/10 px-3 py-1.5 rounded-full uppercase tracking-wider border border-purple-500/20 mb-4 inline-block shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                    {selectedProject.year}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight drop-shadow-sm">{selectedProject.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-8 font-light">
                    {selectedProject.fullDesc}
                  </p>
                </div>
                
                <div className="mb-8">
                  <p className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t, i) => (
                      <span key={i} className="text-xs font-medium text-slate-200 bg-white/5 border border-white/10 px-4 py-2 rounded-lg shadow-inner">{t}</span>
                    ))}
                  </div>
                </div>
                
                {/* TOMBOL GITHUB */}
                <a 
                  href={selectedProject.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="w-full mt-auto bg-white/5 border border-white/10 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-3 cursor-none active:scale-95 group hover:bg-orange-500/10 hover:border-orange-500/50 hover:text-orange-400 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:-translate-y-1"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 transition-colors group-hover:text-orange-400">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  View on GitHub
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
    </div>
  );
}

export default App;