# ML Academy — Your Launch Checklist

## STEP 1 — Replace Google Analytics ID (REQUIRED before going live)
Open `index.html` and replace BOTH occurrences of:
  REPLACE_WITH_YOUR_GA4_ID
with your real GA4 Measurement ID (looks like G-AB12CD34EF).

How to get it:
  1. Go to analytics.google.com
  2. Create account → property → Web stream for learnmlacademy.com
  3. Copy the Measurement ID

## STEP 2 — Add Brevo API key (for newsletter signups)
Open `src/components/NewsletterSignup.tsx`
Replace: PASTE_YOUR_BREVO_API_KEY_HERE
With your real key from brevo.com → Settings → API Keys

## STEP 3 — Add Amazon affiliate tag (optional — for extra income)
Open `src/components/AffiliateRecommendation.tsx`
Replace: const AMAZON_TAG = "";
With:    const AMAZON_TAG = "your-real-tag-21";
Register at: affiliate-program.amazon.in

## STEP 4 — Create og-image.png
- Size: 1200 x 630 pixels
- Use Canva (free): dark background, "ML Academy" text, subtitle
- Save as og-image.png
- Place in the /public/ folder

## STEP 5 — Build and deploy
  npm install
  npm run build       ← this auto-generates sitemap too
  Deploy /dist to Netlify or Vercel

## STEP 6 — Google Search Console
  1. Go to search.google.com/search-console
  2. Add property: https://www.learnmlacademy.com
  3. Verify ownership via HTML tag (add to index.html)
  4. Submit sitemap: sitemap.xml
