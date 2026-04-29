import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [trail, setTrail] = useState<{ x: number, y: number, color: string, id: number }[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const colors = ['#ffffff', '#3b82f6', '#ec4899', '#8b5cf6'];

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);

      // Add trail point
      const id = nextId.current++;
      setTrail(prev => [...prev.slice(-15), { 
        x: e.clientX, 
        y: e.clientY, 
        color: colors[id % colors.length],
        id 
      }]);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('resize', checkMobile);
    };
  }, [mouseX, mouseY, isVisible, isMobile]);

  if (!isVisible || isMobile) return null;

  return (
    <>
      {/* Trailing Lines */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed top-0 left-0 w-1 h-1 pointer-events-none z-[9998]"
          style={{
            x: point.x,
            y: point.y,
            backgroundColor: point.color,
            boxShadow: `0 0 10px ${point.color}`,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      ))}

      <motion.div
        className="fixed top-0 left-0 w-6 h-6 border border-white pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          rotate: isHovering ? 45 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
      <div className="fixed top-0 left-0 w-[1px] h-4 bg-white pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2" style={{ left: mouseX, top: mouseY }} />
      <div className="fixed top-0 left-0 w-4 h-[1px] bg-white pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2" style={{ left: mouseX, top: mouseY }} />
    </>
  );
}
