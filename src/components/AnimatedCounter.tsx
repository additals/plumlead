import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: string;
  duration?: number; // duration in ms
}

export default function AnimatedCounter({ value: originalValue, duration = 1200 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(originalValue);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Parse the value using useMemo
  const parsed = React.useMemo(() => {
    // Match optional non-digit prefix (e.g., $, +), digits with commas and decimal point, and optional suffix
    const match = originalValue.match(/^([^\d.-]*)([\d,.]+)(.*)$/);
    if (!match) {
      return null;
    }
    const prefix = match[1] || '';
    const numStr = match[2] || '';
    const suffix = match[3] || '';
    
    const hasCommas = numStr.includes(',');
    const hasDecimal = numStr.includes('.');
    const numericValue = parseFloat(numStr.replace(/,/g, ''));
    const decimalPlaces = hasDecimal ? numStr.split('.')[1].length : 0;

    return {
      prefix,
      numericValue: isNaN(numericValue) ? null : numericValue,
      suffix,
      hasCommas,
      decimalPlaces,
    };
  }, [originalValue]);

  useEffect(() => {
    if (!parsed || parsed.numericValue === null) {
      setDisplayValue(originalValue);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [parsed, originalValue, hasAnimated]);

  useEffect(() => {
    if (!hasAnimated || !parsed || parsed.numericValue === null) {
      return;
    }

    let startTimestamp: number | null = null;
    const endValue = parsed.numericValue;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function: easeOutExpo (fast start, slow end)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = easeProgress * endValue;

      // Format current value
      let formattedNum = currentValue.toFixed(parsed.decimalPlaces);
      if (parsed.hasCommas) {
        const parts = formattedNum.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        formattedNum = parts.join('.');
      }

      setDisplayValue(`${parsed.prefix}${formattedNum}${parsed.suffix}`);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Ensure exact final string representation
        setDisplayValue(originalValue);
      }
    };

    const animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [hasAnimated, parsed, duration, originalValue]);

  return (
    <span ref={elementRef} className="inline-block">
      {displayValue}
    </span>
  );
}
