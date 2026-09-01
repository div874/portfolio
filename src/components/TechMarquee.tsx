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

const SiLangchain = () => (
  <svg 
    fill="currentColor" 
    viewBox="0 0 24 24" 
    width="1em"
    height="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>LangChain</title>
    <path d="M7.531 15.976a7.534 7.534 0 000-10.651L2.206 0A7.537 7.537 0 000 5.326c0 1.996.794 3.913 2.206 5.325l5.325 5.325zM18.674 16.469a7.535 7.535 0 00-10.65 0l5.325 5.325a7.536 7.536 0 0010.651 0l-5.326-5.325zM2.218 21.782a7.536 7.536 0 005.326 2.206v-7.531H.012c0 1.996.795 3.914 2.206 5.325zM20.73 8.595a7.534 7.534 0 00-10.651.001l5.325 5.326 5.326-5.327z"></path>
  </svg>
);

const slidingTechSkillsRow1 = [
  { name: 'Python', icon: <SiPython />, color: '#3776AB' },
  { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
  { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
  { name: 'React', icon: <SiReact />, color: '#61DAFB' },
  { name: 'Next.js', icon: <SiNextdotjs />, color: '#171717' },
  { name: 'Node.js', icon: <SiNodedotjs />, color: '#5FA04E' },
  { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26' },
  { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#71717a' },
  { name: 'Git', icon: <SiGit />, color: '#F05032' },
  { name: 'GitHub', icon: <SiGithub />, color: '#171717' },
  { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
  { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1' },
  { name: 'MySQL', icon: <SiMysql />, color: '#4479A1' },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' }
];

const slidingTechSkillsRow2 = [
  { name: 'OpenAI / LLMs', icon: <SiOpenai />, color: '#10A37F' },
  { name: 'LangChain', icon: <SiLangchain />, color: '#38A3F1' },
  { name: 'Pandas', icon: <SiPandas />, color: '#150458' },
  { name: 'Scikit-Learn', icon: <SiScikitlearn />, color: '#F7931E' },
  { name: 'TensorFlow', icon: <SiTensorflow />, color: '#FF6F00' },
  { name: 'PyTorch', icon: <SiPytorch />, color: '#EE4C2C' },
  { name: 'Google Analytics 4', icon: <SiGoogleanalytics />, color: '#E37400' },
  { name: 'Search Console', icon: <SiGoogle />, color: '#4285F4' },
  { name: 'WordPress', icon: <SiWordpress />, color: '#21759B' },
  { name: 'Ahrefs / SEO', icon: <FaChartLine />, color: '#FF6900' },
  { name: 'Looker Studio', icon: <TbBrandGoogleAnalytics />, color: '#4285F4' },
  { name: 'Zapier', icon: <SiZapier />, color: '#FF4A00' },
  { name: 'Figma', icon: <SiFigma />, color: '#F24E1E' },
  { name: 'AWS Cloud', icon: <FaAws />, color: '#FF9900' },
  { name: 'Google Cloud', icon: <SiGooglecloud />, color: '#4285F4' },
  { name: 'Vercel', icon: <SiVercel />, color: '#171717' },
  { name: 'Selenium', icon: <SiSelenium />, color: '#43B02A' },
  { name: 'FastAPI', icon: <SiFastapi />, color: '#009688' }
];

const TechMarquee = () => {
  const marqueeRow1 = [...slidingTechSkillsRow1, ...slidingTechSkillsRow1];
  const marqueeRow2 = [...slidingTechSkillsRow2, ...slidingTechSkillsRow2];

  return (
    <section className="section" style={{ paddingTop: '20px', paddingBottom: '60px' }}>
      <div className="tech-marquee-wrapper">
        {/* Track Row 1 - Left Sliding */}
        <div className="tech-marquee-mask">
          <div className="tech-marquee-track">
            {marqueeRow1.map((item, idx) => (
              <div key={idx} className="tech-marquee-card">
                <span className="tech-marquee-icon" style={{ color: item.color }}>
                  {item.icon}
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
                  {item.icon}
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
