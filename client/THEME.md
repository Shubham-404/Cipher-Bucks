🎨 Color Palette
PurposeLight ModeDark ModeNotesPrimary#4F46E5 (Indigo 600)#818CF8 (Indigo 400)Used for main accents, gradients, and CTAs.Secondary / Accent#FB923C (Orange 400)#F97316 (Orange 500)Used for buttons, highlights, or hover states.Background#F9FAFB (Gray 50)#111827 (Gray 900)Default page background.Surface / Card#FFFFFF#1F2937 (Gray 800)For panels, cards, and content containers.Border / Divider#E5E7EB#374151Soft, minimal separation lines.Text (Primary)#1F2937 (Gray 800)#F9FAFBMain text color.Text (Secondary)#4B5563 (Gray 600)#D1D5DB (Gray 300)For muted text and descriptions.Success / Positive#14B8A6 (Teal 500)#2DD4BF (Teal 400)For confirmation, good states.Danger / Error#EF4444 (Red 500)#F87171 (Red 400)For warnings, alerts, or errors.
🧊 Brand Personality

Style: Modern, minimal, and professional with a soft glassmorphism aesthetic.
Tone: Secure, trustworthy, and sleek — like a privacy-focused fintech dashboard.
Visual Feel: Light transparency layers, soft shadows, and gradient text accents.
Design Principles:

  * High contrast between content and background.
  * Rounded corners (rounded-xl to rounded-3xl).
  * Subtle shadows (shadow-lg / shadow-indigo-200/30).
  * Use backdrop-blur effects on fixed elements (navbar, modals).
🧱 UI Elements Guide
Navbar

Glassy white/gray background in light mode: bg-white/60 backdrop-blur-xl
Glassy dark gray background in dark mode: dark:bg-gray-900/70
Brand text gradient: bg-gradient-to-r from-indigo-700 via-indigo-400 to-indigo-700 bg-clip-text text-transparent
Rounded edges: rounded-full
Subtle border: border-indigo-200/30 dark:border-indigo-800/40

Buttons

Primary button:

   &nbsp;&nbsp;class="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold shadow-md transition-all" &nbsp;&nbsp;

Secondary button:

   &nbsp;&nbsp;class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition" &nbsp;&nbsp;
Cards

Light mode: bg-white shadow-lg border border-gray-100
Dark mode: dark:bg-gray-800 dark:border-gray-700
Rounded corners and subtle inner shadows are encouraged.

🧬 Typography

Font Family: Inter, Poppins, or system sans-serif.
Weights: 400 (body), 600 (headings), 800-900 (branding).
Headings: Gradient or bold indigo.
Body text: Neutral gray with generous line height.

Example:
text<h1 class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-indigo-400 to-indigo-700 font-black text-5xl">
  Cipher Bucks
</h1>
🌙 Dark Mode Guidelines

Backgrounds become darker and slightly opaque.
Accent colors stay vivid (e.g., orange & indigo).
Shadows are replaced with soft light glows (shadow-indigo-400/20).
Borders become more visible (border-gray-700