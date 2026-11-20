'use client';

import { 
  SiGoogleanalytics, 
  SiGoogle, 
  SiPython, 
  SiWordpress,
  SiJavascript,
  SiHtml5,
  SiGit,
  SiGithub,
  SiOpenai
} from 'react-icons/si';
import { TbBrandGoogleAnalytics, TbBulb, TbCode } from 'react-icons/tb';
import { FaChartLine, FaCss3Alt } from 'react-icons/fa6';
import { VscVscode } from 'react-icons/vsc';

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

// Row 1: Programming Languages & Core Dev (Selected from Resume)
const slidingTechSkillsRow1 = [
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'SQL', icon: TbBrandGoogleAnalytics, color: '#4169E1' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'C++', icon: VscVscode, color: '#00599C' },
  { name: 'REST APIs', icon: TbCode, color: '#10B981' },
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
  { name: 'VS Code', icon: VscVscode, color: '#007ACC' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, color: '#171717' }
];

// Row 2: AI, Analytics & Product Strategy (Selected from Resume)
const slidingTechSkillsRow2 = [
  { name: 'LLM APIs & Prompting', icon: SiOpenai, color: '#10A37F' },
  { name: 'Google Analytics 4', icon: SiGoogleanalytics, color: '#E37400' },
  { name: 'Search Console', icon: SiGoogle, color: '#4285F4' },
  { name: 'Power BI & Tableau', icon: TbBrandGoogleAnalytics, color: '#F2C811' },
  { name: 'Technical SEO', icon: FaChartLine, color: '#FF6900' },
  { name: 'WordPress', icon: SiWordpress, color: '#21759B' },
  { name: 'Transformers (XLM-RoBERTa & BERT)', icon: SiOpenai, color: '#A855F7' },
  { name: 'RAG & LangChain', icon: SiLangchain, color: '#38A3F1' },
  { name: 'Deep Learning & NLP', icon: SiOpenai, color: '#8B5CF6' },
  { name: 'AI Product Strategy', icon: TbBulb, color: '#F59E0B' }
];

const TechMarquee = () => {
  const marqueeRow1 = [...slidingTechSkillsRow1, ...slidingTechSkillsRow1];
  const marqueeRow2 = [...slidingTechSkillsRow2, ...slidingTechSkillsRow2];

  return (
    <section className="section" style={{ paddingTop: '20px', paddingBottom: '60px' }}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <span className="section-label" style={{ opacity: 0.85 }}>APPLIED TOOLKIT</span>
        <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: 'var(--text-primary)', margin: '4px 0 8px', fontWeight: 700 }}>
          Core Programming & Technical Toolset
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', maxWidth: '650px', margin: '0 auto' }}>
          Programming languages, machine learning architectures, and analytics platforms applied in my academic and commercial work.
        </p>
      </div>

      <div className="tech-marquee-wrapper">
        {/* Track Row 1 - Left Sliding */}
        <div className="tech-marquee-mask">
          <div className="tech-marquee-track">
            {marqueeRow1.map((item, idx) => (
              <div key={`row1-${idx}`} className="tech-marquee-card">
                <span className="tech-marquee-icon" style={{ color: item.color }}>
                  <item.icon />
                </span>
                <span className="tech-marquee-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Track Row 2 - Right Sliding */}
        <div className="tech-marquee-mask" style={{ marginTop: '16px' }}>
          <div className="tech-marquee-track tech-marquee-track-reverse">
            {marqueeRow2.map((item, idx) => (
              <div key={`row2-${idx}`} className="tech-marquee-card">
                <span className="tech-marquee-icon" style={{ color: item.color }}>
                  <item.icon />
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
