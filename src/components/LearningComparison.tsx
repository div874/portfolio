import React from 'react';

interface LearningComparisonProps {
  data: string; // The raw content of the code block
}

const LearningComparison: React.FC<LearningComparisonProps> = ({ data }) => {
  // Parse the data. Expected format per line:
  // Title|Quote|Points (comma separated)
  
  const lines = data.trim().split('\n');
  const items = lines.map(line => {
    const parts = line.split('|');
    return {
      title: parts[0]?.trim() || '',
      quote: parts[1]?.trim() || '',
      points: parts[2] ? parts[2].split(',').map(p => p.trim()) : []
    };
  });

  return (
    <div className="learning-comparison-block">
      <div className="learning-comparison-header">THE SHIFT</div>
      <div className="learning-comparison-grid">
        {items.map((item, index) => (
          <div key={index} className="learning-comparison-column">
            <h4 className="learning-comparison-title">{item.title}</h4>
            <div className="learning-comparison-quote">{item.quote}</div>
            <ul className="learning-comparison-points">
              {item.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningComparison;
