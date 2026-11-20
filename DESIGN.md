# 384,400 km — design

Unofficial explainer site about NASA. Not affiliated with NASA; no NASA insignia or logotype.

## Direction (picked C from the mood board, 2026-11-02)
The page is the trip. Scrolling moves you outward from the launch pad to Voyager 1,
and every stop is headed by a giant distance from Earth that counts up as it arrives.

## References
- Godly: cobalt "exponential" site (godly-all-15): mono index lists beside one huge word,
  scale contrast between a giant element and tiny UI.
- NASA public-domain photography (Wikimedia Commons): Apollo 11 launch, Apollo 8 Earthrise,
  Aldrin AS11-40-5903, STS-115 Atlantis, ISS-56 limb, Webb First Deep Field,
  Perseverance selfie PIA26574, Voyager Pale Blue Dot. Credits in the footer.

## Tokens
- Ground `#08080A` (space), surface `#16161B`, ink `#F4F1EA`, muted `#9A978F`
- Accent lime `#D9FF3F`: the numbers, the rail dot, one full lime field (the numbers band)
  with ink text. Chips are solid lime with ink text. No tinted pairs.
- Display: Climate Crisis (numbers and the few big words). UI/body: Chivo Mono.
- Shape: photos sharp (2px), chips and buttons pills, no cards.
- Icons: Phosphor light (only arrows), none decorative.

## Set-pieces
1. Distance counter: each stop's number scrubs from the previous stop's distance to its own
   (log-scale) as the stop scrolls in. No JS: the final number is in the HTML.
2. Distance rail: fixed log-scale rail on the right, lime dot = where you are. Wide screens only.
Lenis + GSAP ScrollTrigger. Reduced motion → both off.

## Boldness
5 (loud), measured 4.7: a showcase page, the numbers are the story. Black ground + one lime field.
