/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import mammoth from 'mammoth';

type Tab = 'Home' | 'Portfolio' | 'Websites' | 'Works';

const ScrollHint = () => (
  <motion.div 
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: [0.4, 1, 0.4], y: [0, 5, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-30"
  >
    <span className="font-typewriter text-[8px] uppercase tracking-widest text-zinc-900/30">Scroll</span>
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-900/20">
      <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
    </svg>
  </motion.div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Home');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [resumeHtml, setResumeHtml] = useState<string>('');
  const [isLoadingResume, setIsLoadingResume] = useState(false);

  useEffect(() => {
    if (activeTab === 'Portfolio' && !resumeHtml) {
      loadResume();
    }
  }, [activeTab]);

  const loadResume = async () => {
    setIsLoadingResume(true);
    try {
      const response = await fetch('/resume.docx');
      const arrayBuffer = await response.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      
      // Patching the content as requested by the user
      let patchedHtml = result.value;
      const oldText = '制作数据可视化图表（管线图、市场规模拆分）辅助 5 篇深度报告产出';
      const newText = '制作数据可视化图表（管线图、市场规模拆分）并参与撰写 5 篇深度报告核心章节';
      
      const contactInfo = '上海 · 186 0176 5528 · cathyzx.guo@gmail.com';
      
      patchedHtml = patchedHtml.replace(oldText, newText);
      patchedHtml = patchedHtml.replace(contactInfo, '');
      
      setResumeHtml(patchedHtml);
    } catch (err) {
      console.error('Error loading resume:', err);
      setResumeHtml('<p className="text-red-500">无法加载简历内容，请尝试点击下载查看。</p>');
    } finally {
      setIsLoadingResume(false);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const content = {
    Home: { title: 'Home', items: ['Welcome to my space', 'Creative Director', 'Based in Tokyo', '2024 Collection'] },
    Portfolio: { title: 'Portfolio', items: ['Visual Identity', 'Brand Strategy', 'Editorial Design', 'Photography'] },
    Websites: { 
      title: 'Websites', 
      items: [
        {
          id: '01',
          name: '每日一识 knows-every-day',
          desc: '自建全栈网站，成为不无聊大人电子刊。内容全自制，有搜索、知识地图等功能。从需求设计到部署上线独立完成，持续更新中。',
          url: 'https://knows-every-day.top'
        },
        {
          id: '02',
          name: '小狗侦探 crush detective',
          desc: '想多了解TA？上传朋友圈截图，AI给出趣味人格分析报告。从产品idea到UI设计到上线完全独立。',
          url: 'https://crush-detective.vercel.app'
        }
      ] 
    },
    Works: { 
      title: 'Works', 
      items: [
        {
          id: '01',
          title: '山下有松品牌观察笔记',
          desc: '最喜欢的品牌，最佩服的branding。分析出海国产包怎么讲故事，怎么用代言建立信任，以及未来何去何从。',
          url: 'http://xhslink.com/o/AFOcAcCNJ4E'
        },
        {
          id: '02',
          title: '冲浪爱好者',
          links: [
            { label: '随拍记录--抖音 (数据图)', url: '/抖音数据.png', isImg: true },
            { label: '爱好剪辑--哔哩哔哩', url: 'https://space.bilibili.com/79995584?spm_id_from=333.1007.0.0' }
          ]
        },
        {
          id: '03',
          title: '研究记录部分节选',
          links: [
            { label: '跨境厂商转B2C策略报告 (记录1)', url: '/weccan1.png', isImg: true },
            { label: '跨境厂商转B2C策略报告 (记录2)', url: '/weccan2.png', isImg: true }
          ]
        }
      ]
    }
  };

  return (
    <div className="relative w-screen h-[100dvh] flex items-center justify-center p-0 sm:p-4 md:p-8 overflow-hidden bg-[#E5E1D8]">
      {/* 16:9 Background Container (Adjusted for mobile) */}
      <div className="relative w-full max-w-[1440px] aspect-none md:aspect-16-9 h-full md:h-auto bg-[#E5E1D8] shadow-none md:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] md:rounded-sm overflow-hidden flex items-center justify-center">
        
        {/* Background Image: Nature photo with vintage grading */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070"
            alt="Nature background"
            className="w-full h-full object-cover saturate-[0.8] sepia-[0.3] brightness-[1.05]"
            referrerPolicy="no-referrer"
          />
          {/* Overlay to match the image's warm, slightly washed-out tone */}
          <div className="absolute inset-0 bg-[#D4CDBC]/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
        </div>
        
        {/* Global Grain/Noise Animation */}
        <div className="noise-overlay" />

        {/* Vintage Vignette */}
        <div className="absolute inset-0 bg-radial-[circle_at_50%_40%,transparent_0%,rgba(0,0,0,0.2)_100%] pointer-events-none z-10" />

        {/* Centered Folder Card */}
        <div className="relative z-20 w-full max-w-xl md:max-w-2xl px-4 sm:px-8 md:px-12 pb-4 sm:pb-8 md:pb-12">
          <div className="relative">
            {/* Folder Tabs: Recreating the overlapping rounded look */}
            <div className="flex gap-[-8px] ml-1 sm:ml-4 transition-all duration-300 overflow-x-auto scrollbar-hide no-scrollbar">
              {(['Home', 'Portfolio', 'Websites', 'Works'] as Tab[]).map((tab, idx) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{ zIndex: activeTab === tab ? 10 : 5 - idx }}
                  className={`
                    relative px-4 sm:px-6 py-2 sm:py-2.5 -mr-2 sm:-mr-4 transition-all duration-300
                    text-[8px] sm:text-[9px] tracking-[0.05em] font-typewriter font-normal uppercase whitespace-nowrap
                    before:absolute before:inset-0 before:bg-inherit before:rounded-t-[16px] sm:before:rounded-t-[24px] before:scale-x-[1.1] sm:before:scale-x-[1.15] before:origin-bottom
                     ${activeTab === tab 
                       ? 'bg-[#B0BCC4] text-zinc-900 scale-y-[1.1] origin-bottom' 
                       : 'bg-[#98A7AF] text-zinc-800/60 hover:bg-[#A6B4BD]'
                     }
                  `}
                >
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>

            {/* Main Folder Body */}
            <motion.div 
              layout
              className="grainy-card relative w-full aspect-auto sm:aspect-[1.3/1] min-h-[520px] sm:min-h-0 h-[75dvh] sm:h-auto rounded-[4px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] overflow-hidden"
            >
              {/* Paper Texture Overlay is handled via CSS .grainy-card */}
              
              <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full p-4 sm:p-8 flex flex-col"
                  >
                    {activeTab === 'Home' ? (
                      <div className="relative w-full h-full flex flex-col items-center sm:items-start justify-center sm:justify-start text-center sm:text-left">
                        {/* Title & Slogan Area */}
                        <div className="mt-0 sm:mt-4 sm:ml-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8">
                          <div className="flex flex-col items-center sm:items-start">
                            <h1 className="font-display text-white text-[56px] sm:text-[72px] md:text-[88px] lg:text-[104px] leading-[0.85] tracking-tight drop-shadow-md">
                              CathyG
                            </h1>
                            <p className="font-sans text-[9px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-zinc-100/50 mt-2 sm:ml-1">
                              An adorer of exploring creating and changing
                            </p>
                            {/* Hashtags / Info Tags */}
                            <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2 sm:ml-1">
                              {['#上海财经大学国际会计学', '#加州伯克利大学哈斯商学院', '#语言中日英'].map((tag) => (
                                <span 
                                  key={tag} 
                                  className="text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-white/60 font-sans tracking-wider backdrop-blur-sm border border-white/5 hover:bg-white/20 hover:text-white transition-colors cursor-default"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Collage-style Photo */}
                          <motion.div 
                            initial={{ opacity: 0, rotate: -10, scale: 0.9 }}
                            animate={{ opacity: 1, rotate: 3, scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                            className="relative mt-4 sm:mt-2"
                          >
                            {/* Tape effect */}
                            <div className="absolute -top-3 -left-1 w-8 sm:w-12 h-4 sm:h-6 bg-white/20 backdrop-blur-sm -rotate-12 z-20 shadow-sm border border-white/10" />
                            
                            <div className="p-1 sm:p-2 bg-white shadow-xl transform transition-transform hover:scale-105 duration-300">
                              <div className="relative w-20 h-28 sm:w-24 sm:h-32 md:w-32 md:h-44 overflow-hidden bg-[#D9D9D9]">
                                <img 
                                  src="/profile.jpg" 
                                  alt="CathyG Portrait" 
                                  className="w-full h-full object-cover grayscale-[20%] sepia-[0.1] contrast-[1.05]"
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    // High-quality aesthetic fallback until user uploads /profile.jpg
                                    e.currentTarget.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000";
                                  }}
                                />
                                {/* Overlay grain on photo */}
                                <div className="absolute inset-0 bg-black/5 mix-blend-overlay pointer-events-none" />
                              </div>
                            </div>

                            {/* Second Tape effect */}
                            <div className="absolute -bottom-1 sm:-bottom-2 -right-2 sm:-right-4 w-8 sm:w-12 h-4 sm:h-6 bg-white/20 backdrop-blur-sm rotate-15 z-20 shadow-sm border border-white/10" />
                          </motion.div>
                        </div>

                        {/* Contact Information in Bottom Right */}
                        <div className="absolute bottom-4 right-4 sm:bottom-[10%] sm:right-[10%] text-right flex flex-col gap-1.5 sm:translate-y-4">
                          <motion.a 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            whileHover={{ opacity: 1, x: -4 }}
                            href="https://www.linkedin.com/in/zixin-guo-a52437384"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-typewriter text-[10px] uppercase tracking-widest text-zinc-900 flex items-center justify-end gap-2"
                          >
                            LinkedIn
                            <div className="w-1 h-1 rounded-full bg-zinc-900/30" />
                          </motion.a>
                          
                          <motion.button 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            whileHover={{ opacity: 1, x: -4 }}
                            onClick={() => copyToClipboard('Baekcha', 'wechat')}
                            className="font-typewriter text-[10px] uppercase tracking-widest text-zinc-900/70 flex items-center justify-end gap-2 cursor-pointer relative group"
                          >
                             <AnimatePresence>
                              {copiedId === 'wechat' && (
                                <motion.span 
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  className="absolute -left-20 text-[8px] text-green-600 font-sans tracking-normal lowercase italic"
                                >
                                  复制成功
                                </motion.span>
                              )}
                            </AnimatePresence>
                            WeChat: Baekcha
                            <div className="w-1 h-1 rounded-full bg-zinc-900/30" />
                          </motion.button>

                          <motion.button 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            whileHover={{ opacity: 1, x: -4 }}
                            onClick={() => copyToClipboard('cathyzx.guo@gmail.com', 'email')}
                            className="font-typewriter text-[10px] uppercase tracking-widest text-zinc-900/70 flex items-center justify-end gap-2 cursor-pointer relative"
                          >
                            <AnimatePresence>
                              {copiedId === 'email' && (
                                <motion.span 
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  className="absolute -left-20 text-[8px] text-green-600 font-sans tracking-normal lowercase italic"
                                >
                                  复制成功
                                </motion.span>
                              )}
                            </AnimatePresence>
                            cathyzx.guo@gmail.com
                            <div className="w-1 h-1 rounded-full bg-zinc-900/30" />
                          </motion.button>
                        </div>

                      </div>
                    ) : activeTab === 'Portfolio' ? (
                      <div className="relative w-full h-full flex flex-col p-2 sm:p-4 bg-white/40 shadow-inner rounded-sm overflow-hidden">
                        {/* Download Header */}
                        <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2 border-b border-zinc-900/10">
                          <h2 className="font-display text-zinc-900 text-xl sm:text-2xl lowercase tracking-tight">Portfolio / Resume</h2>
                          <motion.a 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="/resume.docx" 
                            download="郭子歆_内容增长方向_简历.docx" 
                            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-zinc-900 text-white text-[8px] sm:text-[10px] uppercase font-typewriter tracking-widest rounded-full hover:bg-zinc-800 transition-colors"
                          >
                            <svg width="10" height="10" className="sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            DOCX
                          </motion.a>
                        </div>

                        {/* Resume Content Area */}
                        <div className="flex-1 overflow-y-auto scrollbar-hide pr-1 sm:pr-2">
                          {isLoadingResume ? (
                            <div className="flex items-center justify-center h-64">
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-6 h-6 border-2 border-zinc-900/20 border-t-zinc-900 rounded-full"
                              />
                            </div>
                          ) : (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="resume-content px-4 py-6 sm:px-8 md:px-12 md:py-10"
                              dangerouslySetInnerHTML={{ __html: resumeHtml }}
                            />
                          )}
                        </div>
                        
                        {/* Decorative Paper Edge */}
                        <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-white/20 to-transparent pointer-events-none" />
                      </div>
                    ) : activeTab === 'Websites' ? (
                      <div className="relative w-full h-full flex flex-col p-4 sm:p-6 overflow-hidden">
                        <h2 className="font-display text-zinc-900 text-2xl sm:text-3xl lowercase tracking-tight mb-4 sm:mb-8 border-b border-zinc-900/10 pb-2 flex items-baseline justify-between">
                          <span>Websites / Projects</span>
                          <span className="font-typewriter text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-900/40">
                            Total: {(content.Websites.items as any[]).length}
                          </span>
                        </h2>
                        
                        <div className="flex flex-col gap-4 sm:gap-8 overflow-y-auto scrollbar-hide pr-1 sm:pr-2">
                          {(content.Websites.items as any[]).map((site, i) => (
                            <motion.a 
                              key={site.id}
                              href={site.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="group flex gap-3 sm:gap-6 items-start p-3 sm:p-4 rounded-lg hover:bg-white/30 transition-all duration-300 border border-transparent hover:border-white/20 shadow-sm hover:shadow-md cursor-pointer"
                            >
                              <div className="font-display text-zinc-900/20 text-2xl sm:text-4xl leading-none group-hover:text-zinc-900/40 transition-colors">
                                {site.id}
                              </div>
                              <div className="flex-1 flex flex-col gap-1 sm:gap-2">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-sans font-bold text-zinc-900 text-xs sm:text-sm tracking-tight group-hover:underline">
                                    {site.name}
                                  </h3>
                                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-zinc-900/30 group-hover:text-zinc-900 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                                  </svg>
                                </div>
                                <p className="font-sans text-zinc-600 text-[10px] sm:text-[11px] leading-relaxed">
                                  {site.desc}
                                </p>
                                <div className="text-[9px] sm:text-[10px] font-typewriter text-zinc-400 mt-0.5 lowercase truncate">
                                  {site.url.replace('https://', '')}
                                </div>
                              </div>
                            </motion.a>
                          ))}
                        </div>
                        <ScrollHint />
                      </div>
                    ) : activeTab === 'Works' ? (
                      <div className="relative w-full h-full flex flex-col p-4 sm:p-6 overflow-hidden">
                        <h2 className="font-display text-zinc-900 text-2xl sm:text-3xl lowercase tracking-tight mb-4 sm:mb-8 border-b border-zinc-900/10 pb-2 flex items-baseline justify-between">
                          <span>Recent Works / Log</span>
                        </h2>
                        
                        <div className="flex flex-col gap-4 sm:gap-6 overflow-y-auto scrollbar-hide pr-1 sm:pr-2 pb-8">
                          {(content.Works.items as any[]).map((work, i) => (
                            <motion.div 
                              key={work.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="group flex gap-3 sm:gap-6 items-start p-3 sm:p-4 rounded-lg bg-white/10 hover:bg-white/30 transition-all duration-300 border border-white/5 hover:border-white/20 shadow-sm"
                            >
                              <div className="font-display text-zinc-900/20 text-2xl sm:text-4xl leading-none">
                                {work.id}
                              </div>
                              <div className="flex-1 flex flex-col gap-2 sm:gap-3">
                                <h3 className="font-sans font-bold text-zinc-900 text-sm sm:text-base tracking-tight">
                                  {work.title}
                                </h3>
                                {work.desc && (
                                  <p className="font-sans text-zinc-600 text-[10px] sm:text-[11px] leading-relaxed italic">
                                    {work.desc}
                                  </p>
                                )}
                                
                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                  {work.url && (
                                    <motion.a 
                                      whileHover={{ scale: 1.02 }}
                                      href={work.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-zinc-900 text-white text-[8px] sm:text-[9px] uppercase font-typewriter tracking-widest rounded-sm hover:bg-zinc-800 transition-colors shadow-sm"
                                    >
                                      Visit Link
                                      <svg className="w-2 sm:w-2.5 h-2 sm:h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                                      </svg>
                                    </motion.a>
                                  )}
                                  
                                  {work.links && work.links.map((link: any, idx: number) => (
                                    <motion.a 
                                      key={idx}
                                      whileHover={{ scale: 1.02 }}
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white text-zinc-900 text-[8px] sm:text-[9px] uppercase font-typewriter tracking-widest rounded-sm border border-zinc-900/10 hover:bg-zinc-50 transition-colors shadow-sm"
                                    >
                                      {link.label}
                                      {link.isImg ? (
                                        <svg className="w-2 sm:w-2.5 h-2 sm:h-2.5 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                                        </svg>
                                      ) : (
                                        <svg className="w-2 sm:w-2.5 h-2 sm:h-2.5 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                                        </svg>
                                      )}
                                    </motion.a>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        <ScrollHint />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full h-full text-center">
                         <h1 className="font-display text-white text-[72px] md:text-[84px] leading-[0.95] tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] mb-8">
                          {activeTab}
                        </h1>
                        <div className="flex flex-col gap-3 max-w-sm">
                          {(content[activeTab] as any).items.map((item: string, i: number) => (
                            <motion.span 
                              key={item}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 0.7, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="text-[10px] uppercase tracking-[0.2em] font-typewriter border-b border-zinc-900/10 pb-1"
                            >
                              {item}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Pixel-style Cursor Asset remains in general container */}
                    <div className="absolute right-[15%] bottom-[10%] transform rotate-[10deg] drop-shadow-sm pointer-events-none opacity-20">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1">
                        <path d="M5 2l12 12h-4l3 6-3 1.5-3-6-5 5v-18.5z" />
                      </svg>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scenic Detail Section Removed */}
      </div>
    </div>
  );
}
