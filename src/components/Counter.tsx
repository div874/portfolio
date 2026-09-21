'use client';
// @ts-nocheck
import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

function Number({ mv, number, height }) {
  const y = useTransform(mv, (latest) => {
    if (typeof latest !== 'number' || !isFinite(latest)) return '0px';
    const placeValue = ((latest % 10) + 10) % 10;
    let offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) memo -= 10 * height;
    return `${memo}px`;
  });

  return (
    <motion.span
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        y,
      }}
    >
      {number}
    </motion.span>
  );
}

function normalizeNearInteger(num) {
  const nearest = Math.round(num);
  const tolerance = 1e-9 * Math.max(1, Math.abs(num));
  return Math.abs(num - nearest) < tolerance ? nearest : num;
}

function getValueRoundedToPlace(value, place) {
  if (typeof value !== 'number' || !isFinite(value) || !place) return 0;
  const scaled = value / place;
  return Math.floor(normalizeNearInteger(scaled));
}

function Digit({ place, value, height, digitStyle = {} }) {
  const isDecimal = place === '.';
  const valueRoundedToPlace = isDecimal ? 0 : getValueRoundedToPlace(value, place);

  const animatedValue = useSpring(valueRoundedToPlace, {
    stiffness: 200,
    damping: 20,
    mass: 0.8,
  });

  useEffect(() => {
    if (!isDecimal) {
      const current = animatedValue.get();
      // Snap immediately on large jumps (e.g. initial load) to prevent infinite spinning
      if (Math.abs(valueRoundedToPlace - current) > 3) {
        if (typeof animatedValue.jump === 'function') {
          animatedValue.jump(valueRoundedToPlace);
        } else {
          animatedValue.set(valueRoundedToPlace);
        }
      } else {
        animatedValue.set(valueRoundedToPlace);
      }
    }
  }, [animatedValue, valueRoundedToPlace, isDecimal]);

  if (isDecimal) {
    return (
      <span
        style={{
          position: 'relative',
          display: 'inline-block',
          height: `${height}px`,
          width: 'fit-content',
          overflow: 'hidden',
          fontVariantNumeric: 'tabular-nums',
          ...digitStyle,
        }}
      >
        .
      </span>
    );
  }

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        height: `${height}px`,
        width: '0.6em',
        overflow: 'hidden',
        fontVariantNumeric: 'tabular-nums',
        ...digitStyle,
      }}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </span>
  );
}

export default function Counter(props: any) {
  const {
    value = 0,
    fontSize = 100,
    padding = 0,
    places,
    gap = 8,
    borderRadius = 4,
    horizontalPadding = 0,
    textColor = 'inherit',
    fontWeight = 'inherit',
    containerStyle = {},
    counterStyle = {},
    digitStyle = {},
    gradientHeight = 16,
    gradientFrom = 'transparent',
    gradientTo = 'transparent',
    topGradientStyle,
    bottomGradientStyle,
  } = props;

  const height = fontSize + padding;

  const resolvedPlaces = places ?? (() => {
    const safeVal = typeof value === 'number' && isFinite(value) ? value : 0;
    const chars = [...safeVal.toString()];
    return chars.map((ch, i, a) => {
      if (ch === '.') return '.';
      const dotIdx = a.indexOf('.');
      if (dotIdx === -1) return 10 ** (a.length - i - 1);
      if (i < dotIdx) return 10 ** (dotIdx - i - 1);
      return 10 ** (-(i - dotIdx));
    });
  })();

  return (
    <span style={{ position: 'relative', display: 'inline-block', ...containerStyle }}>
      <span
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          overflow: 'hidden',
          lineHeight: 1,
          fontSize,
          gap,
          borderRadius,
          paddingLeft: horizontalPadding,
          paddingRight: horizontalPadding,
          color: textColor,
          fontWeight,
          direction: 'ltr',
          ...counterStyle,
        }}
      >
        {resolvedPlaces.map((place, idx) => (
          <Digit
            key={`${String(place)}-${idx}`}
            place={place}
            value={value}
            height={height}
            digitStyle={digitStyle}
          />
        ))}
      </span>

      <span style={{ pointerEvents: 'none', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
        <span
          style={topGradientStyle ?? {
            position: 'absolute',
            top: 0,
            width: '100%',
            height: gradientHeight,
            background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
          }}
        />
        <span
          style={bottomGradientStyle ?? {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: gradientHeight,
            background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
          }}
        />
      </span>
    </span>
  );
}
