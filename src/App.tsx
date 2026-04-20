/**
 * @license * SPDX-License-Identifier: Apache-2.0 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import mammoth from 'mammoth';

type Tab = 'Home' | 'Portfolio' | 'Websites' | 'Works';

const ScrollHint = () => (
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
    <span className="font-typewriter text-[8px] uppercase tracking-[0.2em] text-zinc-800">Scroll</span>
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="w-[1px] h-8 bg-gradient-to-b from-zinc-800 to-transparent"
    />
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [copiedId, setCopiedId] = useState(null);
  const [resumeHtml, setResumeHtml] = useState('');
  const [isLoadingResume, setIsLoadingResume] = useState(false);

  useEffect(() => {
    if (activeTab === 'Portfolio' && !resumeHtml) {
      loadResume();
    }
  }, [activeTab]);

  const loadResume = async () => {
    setIsLoadingResume(true);
    try {
      const response = await fetch('/resume.docx'); // ← 修复：相对路径改绝对路径
      const arrayBuffer = await response.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      
      let patchedHtml = result.value;
      const oldText = '制作数据可视化图表（管线图、市场规模拆分）辅助 5 篇深度报告产出';
      const newText = '制作数据可视化图表（管线图、市场规模拆分）并参与撰写 5 篇深度报告核心章节';
      const contactInfo = '上海 · 186 0176 5528 · cathyzx.guo@gmail.com';
      patchedHtml = patchedHtml.replace(oldText, newText);
      patchedHtml = patchedHtml.replace(contactInfo, '');
      
      setResumeHtml(patchedHtml);
    } catch (err) {
      console.error('Error loading resume:', err);
      setResumeHtml('<p class="text-center py-8">无法加载简历内容，请尝试点击下载查看。</p>');
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
    Home: {
      title: 'Home',
      items: ['Welcome to my space', 'Creative Director', 'Based in Tokyo', '2024 Collection']
    },
    Portfolio: {
      title: 'Portfolio',
      items: ['Visual Identity', 'Brand Strategy', 'Editorial Design', 'Photography']
    },
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
            { label: '随拍记录--抖音 (数据图)', url: '/douyin.png', isImg: true }, // ← 修复
            { label: '爱好剪辑--哔哩哔哩', url: 'https://space.bilibili.com/79995584?spm_id_from=333.1007.0.0' }
          ]
        },
        {
          id: '03',
          title: '研究记录部分节选',
          links: [
            { label: '跨境厂商转B2C策略报告 (记录1)', url: '/weccan1.png', isImg: true }, // ← 修复
            { label: '跨境厂商转B2C策略报告 (记录2)', url: '/weccan2.png', isImg: true }  // ← 修复
          ]
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2EC] relative overflow-hidden">
      {/* 16:9 Background Container */}
      <div className="absolute inset-0 max-w-[177.78vh] max-h-screen mx-auto">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=2000')`,
            filter: 'sepia(20%) saturate(90%) brightness(95%)',
          }}
        />
        <div className="absolute inset-0 bg-[#F5F2EC]/70 mix-blend-multiply" />
      </div>

      {/* Grain Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(139, 119, 101, 0.15) 100%)',
        }}
      />

      {/* Centered Folder Card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-[600px] sm:max-w-[700px]">
          {/* Folder Tabs */}
          <div className="relative flex items-end px-2 sm:px-4">
            {(['Home', 'Portfolio', 'Websites', 'Works'] as Tab[]).map((tab, idx) => (
              <motion.button
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
                {tab}
              </motion.button>
            ))}
          </div>

          {/* Main Folder Body */}
          <motion.div 
            layoutId="folder-body"
            className={`
              relative bg-[#B0BCC4] rounded-b-[24px] sm:rounded-b-[32px] p-4 sm:p-8
              shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2),0_10px_20px_-5px_rgba(0,0,0,0.1)]
            `}
          >
            <div className="absolute inset-0 rounded-b-[24px] sm:rounded-b-[32px] overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] grainy-card" />
            </div>

            <div className="relative">
              {activeTab === 'Home' ? (
                <div>
                  <div className="text-center mb-6 sm:mb-8">
                    <h1 className="font-typewriter text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-2">
                      CATHYG
                    </h1>
                    <p className="font-typewriter text-[10px] sm:text-xs tracking-[0.15em] uppercase text-zinc-800/70">
                      An adorer of exploring creating and changing
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                    {['#上海财经大学国际会计学', '#加州伯克利大学哈斯商学院', '#语言中日英'].map((tag) => (
                      <span key={tag} className="font-typewriter text-[8px] sm:text-[9px] tracking-wide text-zinc-800/60 px-2 sm:px-3 py-1 bg-zinc-200/40 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Photo */}
                  <div className="relative flex justify-center mb-6 sm:mb-8">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-5 sm:h-7 bg-[#D4C8B8]/70 rotate-2 -skew-x-6 shadow-sm" />
                    <div className="relative w-32 h-40 sm:w-40 sm:h-52 bg-zinc-300 overflow-hidden">
                      <img
                        src="/profile.jpg"
                        alt="CATHYG"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000";
                        }}
                      />
                      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay" 
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-2 right-[30%] w-12 sm:w-16 h-4 sm:h-5 bg-[#E8DFD0]/70 -rotate-3 shadow-sm" />
                  </div>

                  <div className="flex flex-col gap-2 items-end">
                    <a
                      href="https://linkedin.com/in/cathyg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-typewriter text-[10px] uppercase tracking-widest text-zinc-900/70 hover:text-zinc-900 transition-colors"
                    >
                      LinkedIn
                    </a>
                    <button
                      onClick={() => copyToClipboard('Baekcha', 'wechat')}
                      className="font-typewriter text-[10px] uppercase tracking-widest text-zinc-900/70 flex items-center justify-end gap-2 cursor-pointer relative group"
                    >
                      {copiedId === 'wechat' && (
                        <motion.span
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute -top-6 right-0 text-[8px] bg-zinc-800 text-white px-2 py-1 rounded whitespace-nowrap"
                        >
                          复制成功
                        </motion.span>
                      )}
                      WeChat: Baekcha
                    </button>
                    <button
                      onClick={() => copyToClipboard('cathyzx.guo@gmail.com', 'email')}
                      className="font-typewriter text-[10px] uppercase tracking-widest text-zinc-900/70 flex items-center justify-end gap-2 cursor-pointer relative"
                    >
                      {copiedId === 'email' && (
                        <motion.span
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute -top-6 right-0 text-[8px] bg-zinc-800 text-white px-2 py-1 rounded whitespace-nowrap"
                        >
                          复制成功
                        </motion.span>
                      )}
                      cathyzx.guo@gmail.com
                    </button>
                  </div>
                </div>
              ) : activeTab === 'Portfolio' ? (
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800/10">
                    <h2 className="font-typewriter text-lg sm:text-xl font-bold tracking-tight text-zinc-900">
                      PORTFOLIO / RESUME
                    </h2>
                    <a
                      href="/resume.docx" // ← 修复：相对路径改绝对路径
                      download="CATHYG_Resume.docx"
                      className="font-typewriter text-[10px] uppercase tracking-widest text-zinc-900/70 hover:text-zinc-900 flex items-center gap-2 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      DOCX
                    </a>
                  </div>

                  <div className="prose prose-sm max-w-none">
                    {isLoadingResume ? (
                      <div className="flex items-center justify-center py-12">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="w-8 h-8 border-2 border-zinc-400 border-t-transparent rounded-full"
                        />
                      </div>
                    ) : (
                      <div
                        className="font-typewriter text-xs leading-relaxed text-zinc-800/80 [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-3 [&_h2]:text-base [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_p]:mb-2"
                        dangerouslySetInnerHTML={{ __html: resumeHtml }}
                      />
                    )}
                  </div>

                  <div className="mt-6 h-[2px] bg-gradient-to-r from-transparent via-zinc-800/10 to-transparent" />
                </div>
              ) : activeTab === 'Websites' ? (
                <div>
                  <div className="mb-6">
                    <h2 className="font-typewriter text-lg sm:text-xl font-bold tracking-tight text-zinc-900">
                      WEBSITES / PROJECTS
                    </h2>
                    <p className="font-typewriter text-[10px] uppercase tracking-widest text-zinc-800/60 mt-1">
                      TOTAL: {(content.Websites.items as any[]).length}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {(content.Websites.items as any[]).map((site, i) => (
                      <motion.a
                        key={site.id}
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-zinc-200/40 rounded-xl hover:bg-zinc-200/60 transition-colors group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="flex items-start gap-4">
                          <span className="font-typewriter text-xs text-zinc-800/50">{site.id}</span>
                          <div className="flex-1">
                            <h3 className="font-typewriter text-sm font-bold text-zinc-900 group-hover:underline">
                              {site.name}
                            </h3>
                            <p className="font-typewriter text-[10px] text-zinc-800/70 mt-1 leading-relaxed">
                              {site.desc}
                            </p>
                            <p className="font-typewriter text-[9px] text-zinc-800/50 mt-2 truncate">
                              {site.url.replace('https://', '')}
                            </p>
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              ) : activeTab === 'Works' ? (
                <div>
                  <div className="mb-6">
                    <h2 className="font-typewriter text-lg sm:text-xl font-bold tracking-tight text-zinc-900">
                      RECENT WORKS / LOG
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {(content.Works.items as any[]).map((work, i) => (
                      <motion.div
                        key={work.id}
                        className="relative pl-8"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-zinc-800/20" />
                        <div className="absolute left-[-3px] top-1 w-[7px] h-[7px] rounded-full bg-zinc-800/40" />
                        
                        <div className="space-y-2">
                          <div className="flex items-baseline gap-3">
                            <span className="font-typewriter text-[10px] text-zinc-800/50">{work.id}</span>
                            <h3 className="font-typewriter text-sm font-bold text-zinc-900">
                              {work.title}
                            </h3>
                          </div>
                          
                          {work.desc && (
                            <p className="font-typewriter text-[10px] text-zinc-800/70 leading-relaxed">
                              {work.desc}
                            </p>
                          )}
                          
                          {work.url && (
                            <a
                              href={work.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-typewriter text-[9px] uppercase tracking-widest text-zinc-800/60 hover:text-zinc-900 transition-colors"
                            >
                              Visit Link
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                          
                          {work.links && work.links.map((link: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="font-typewriter text-[9px] text-zinc-800/40">—</span>
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-typewriter text-[9px] uppercase tracking-wider text-zinc-800/60 hover:text-zinc-900 transition-colors"
                              >
                                {link.label}
                              </a>
                              {link.isImg ? (
                                <span className="text-[8px]">📎</span>
                              ) : (
                                <svg className="w-3 h-3 text-zinc-800/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="font-typewriter text-lg font-bold tracking-tight text-zinc-900 mb-4">
                    {activeTab}
                  </h2>
                  <div className="space-y-2">
                    {(content[activeTab] as any).items.map((item: string, i: number) => (
                      <div key={i} className="font-typewriter text-xs text-zinc-800/70">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <motion.div
              className="absolute -bottom-1 -right-1 w-4 h-4 opacity-30"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0L16 16M16 0L0 16" stroke="currentColor" strokeWidth="1" className="text-zinc-800" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
