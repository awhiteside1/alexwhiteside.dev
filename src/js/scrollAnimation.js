document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.scroll-bg');
  
  const scrollTimeline = new ScrollTimeline({
    source: document.documentElement,
    axis: 'block',
    scrollOffsets: [
      { target: document.documentElement, edge: 'start', threshold: 0 },
      { target: document.documentElement, edge: 'start', threshold: 0.2 }
    ]
  });

  const animation = header.animate(
    [
      { 
        background: 'transparent', 
        borderBottomColor: 'transparent' 
      },
      { 
        background: 'rgba(var(--menu-bg), 0.2)', 
        borderBottomColor: 'transparent',
        offset: 0.4 
      },
      { 
        background: 'rgba(var(--menu-bg), 0.95)', 
        borderBottomColor: 'var(--border)',
        offset: 0.5 
      },
      { 
        background: 'rgba(var(--menu-bg), 0.95)', 
        borderBottomColor: 'var(--border)' 
      }
    ],
    {
      duration: 1,
      fill: 'both',
      timeline: scrollTimeline
    }
  );
});