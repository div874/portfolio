'use client';

import { 
  SiGoogleanalytics, 
  SiGoogle, 
  SiPython, 
  SiWordpress,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiHtml5,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiOpenai,
  SiPandas,
  SiScikitlearn,
  SiTensorflow,
  SiPytorch,
  SiZapier,
  SiFigma,
  SiGooglecloud,
  SiVercel,
  SiNextdotjs,
  SiSelenium,
  SiFastapi
} from 'react-icons/si';
import { TbBrandGoogleAnalytics } from 'react-icons/tb';
import { FaChartLine, FaAws, FaCss3Alt } from 'react-icons/fa6';

const SiLangchain = (props: any) => (
  <svg 
    fill="currentColor" 
    viewBox="0 0 24 24" 
    width="1em"
    height="1em"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <title>{props.title || 'LangChain'}</title>
    <path d="M7.531 15.976a7.534 7.534 0 000-10.651L2.206 0A7.537 7.537 0 000 5.326c0 1.996.794 3.913 2.206 5.325l5.325 5.325zM18.674 16.469a7.535 7.535 0 00-10.65 0l5.325 5.325a7.536 7.536 0 0010.651 0l-5.326-5.325zM2.218 21.782a7.536 7.536 0 005.326 2.206v-7.531H.012c0 1.996.795 3.914 2.206 5.325zM20.73 8.595a7.534 7.534 0 00-10.651.001l5.325 5.326 5.326-5.327z"></path>
  </svg>
);

const slidingTechSkillsRow1 = [
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#171717' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, color: '#171717' },
  { name: 'Vercel', icon: SiVercel, color: '#171717' }
];

const slidingTechSkillsRow2 = [
  { name: 'OpenAI / LLMs', icon: SiOpenai, color: '#10A37F' },
  { name: 'LangChain', icon: SiLangchain, color: '#38A3F1' },
  { name: 'Pandas', icon: SiPandas, color: '#150458' },
  { name: 'Google Analytics 4', icon: SiGoogleanalytics, color: '#E37400' },
  { name: 'Search Console', icon: SiGoogle, color: '#4285F4' },
  { name: 'Ahrefs / SEO', icon: FaChartLine, color: '#FF6900' },
  { name: 'Looker Studio', icon: TbBrandGoogleAnalytics, color: '#4285F4' },
  { name: 'Selenium', icon: SiSelenium, color: '#43B02A' },
  { name: 'WordPress', icon: SiWordpress, color: '#21759B' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' }
];

const TechMarquee = () => {
  const marqueeRow1 = [...slidingTechSkillsRow1, ...slidingTechSkillsRow1];
  const marqueeRow2 = [...slidingTechSkillsRow2, ...slidingTechSkillsRow2];

  return (
    <section className="section" style={{ paddingTop: '20px', paddingBottom: '60px' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span className="section-label" style={{ opacity: 0.85 }}>PRODUCTION TOOLKIT</span>
        <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: 'var(--text-primary)', margin: '4px 0 8px', fontWeight: 700 }}>
          Technologies Used Across Shipped Work
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', maxWidth: '650px', margin: '0 auto' }}>
          Production languages, modern web frameworks, AI libraries, and deployment tools verified in my projects.
        </p>
      </div>
      <div className="tech-marquee-wrapper">
        {/* Track Row 1 - Left Sliding */}
        <div className="tech-marquee-mask">
          <div className="tech-marquee-track">
            {marqueeRow1.map((item, idx) => (
              <div key={idx} className="tech-marquee-card">
                <span className="tech-marquee-icon" style={{ color: item.color }}>
                  <item.icon title={item.name} aria-label={item.name} />
                </span>
                <span className="tech-marquee-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Track Row 2 - Right Sliding (Reverse) */}
        <div className="tech-marquee-mask">
          <div className="tech-marquee-track-reverse">
            {marqueeRow2.map((item, idx) => (
              <div key={idx} className="tech-marquee-card">
                <span className="tech-marquee-icon" style={{ color: item.color }}>
                  <item.icon title={item.name} aria-label={item.name} />
                </span>
                <span className="tech-marquee-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;
