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

const slidingTechSkillsRow1 = [
  { name: 'Python', icon: <SiPython />, color: '#3776AB' },
  { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
  { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
  { name: 'React', icon: <SiReact />, color: '#61DAFB' },
  { name: 'Next.js', icon: <SiNextdotjs />, color: '#FFFFFF' },
  { name: 'Node.js', icon: <SiNodedotjs />, color: '#5FA04E' },
  { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26' },
  { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06B6D4' },
  { name: 'Git', icon: <SiGit />, color: '#F05032' },
  { name: 'GitHub', icon: <SiGithub />, color: '#FFFFFF' },
  { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
  { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1' },
  { name: 'MySQL', icon: <SiMysql />, color: '#4479A1' },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' }
];

const slidingTechSkillsRow2 = [
  { name: 'OpenAI / LLMs', icon: <SiOpenai />, color: '#10A37F' },
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
  { name: 'Vercel', icon: <SiVercel />, color: '#FFFFFF' },
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
