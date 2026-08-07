# CHAINNE Components - Customization Guide

This guide shows you how to **customize** the quiz results, FAQ answers, and styling to match your exact business needs.

---

## 🎯 Quiz Customization

### 1. Modify Quiz Recommendations/Routing Logic

**File:** `diagnostic-quiz.html`  
**Section:** Look for `function showResults()` (around line 220)

#### Current Logic:
```javascript
if (comfort === 'non-tech') {
  recommendation.title = 'Guided Assistant Blueprint';
  recommendation.description = 'Mobile-first automation with 1-tap approvals...';
  recommendation.keyPoints = [
    '✓ Zero code required – drag & drop workflows',
    '✓ 1-tap mobile approval cards via WhatsApp/Telegram',
    // ... more points
  ];
  recommendation.cta = 'Book Setup Call';
  recommendation.ctaLink = 'mailto:hello@chainne.ai?subject=Guided Assistant Blueprint';
}
```

#### To Change the Recommendation:
```javascript
if (comfort === 'non-tech') {
  recommendation.title = 'YOUR CUSTOM TITLE';  // ← Change this
  recommendation.description = 'YOUR CUSTOM DESCRIPTION';  // ← Change this
  recommendation.keyPoints = [
    '✓ YOUR CUSTOM POINT 1',
    '✓ YOUR CUSTOM POINT 2',
    '✓ YOUR CUSTOM POINT 3',
    '✓ YOUR CUSTOM POINT 4'
  ];
  recommendation.cta = 'YOUR CTA BUTTON TEXT';  // ← Change this
  recommendation.ctaLink = 'YOUR LINK HERE';  // ← Change this (can be URL, email, anchor)
}
```

#### Example Customizations:

**Option 1: Link to a specific product**
```javascript
recommendation.ctaLink = '#products';  // Links to products section
recommendation.cta = 'View Our Templates';
```

**Option 2: Link to a Calendly or booking page**
```javascript
recommendation.ctaLink = 'https://calendly.com/your-username/consultation';
recommendation.cta = 'Schedule 30-Min Call';
```

**Option 3: Link to a lead magnet form**
```javascript
recommendation.ctaLink = 'https://your-domain.com/opt-in';
recommendation.cta = 'Get Free Setup Checklist';
```

---

### 2. Add or Modify Quiz Questions

**File:** `diagnostic-quiz.html`

#### Step 1: Modify Bottleneck Options
Find this section (around line 90):
```html
<!-- STEP 1 -->
<label class="quiz-option cursor-pointer" data-value="leads-sales">
  <input type="radio" name="bottleneck" value="leads-sales" class="hidden" />
  <div class="p-5 rounded-xl border-2 border-gray-700 bg-gray-900/50 ...">
    <div class="flex items-start gap-3">
      <div class="w-5 h-5 rounded-full ...option-radio"></div>
      <div>
        <h4 class="font-semibold text-white">Leads & Sales</h4>
        <p class="text-xs text-gray-400 mt-1">Slow response times, manual follow-ups</p>
      </div>
    </div>
  </div>
</label>
```

**To add a new option**, duplicate this block and change:
- `data-value="leads-sales"` → `data-value="your-new-value"`
- `value="leads-sales"` → `value="your-new-value"`
- `Leads & Sales` → `Your New Option`
- `Slow response times...` → `Your description`

#### Step 2: Modify Tech Stack Options
Find this section (around line 145):
```html
<!-- STEP 2 -->
<label class="quiz-checkbox cursor-pointer">
  <input type="checkbox" name="tools" value="gmail" class="hidden" />
  <div class="p-5 rounded-xl ...">
    <div class="flex items-center gap-3">
      <div class="...checkbox-box">
        <svg>...</svg>
      </div>
      <div>
        <h4 class="font-semibold text-white text-sm">Gmail / Outlook</h4>
        <p class="text-xs text-gray-400 mt-0.5">Email & communication</p>
      </div>
    </div>
  </div>
</label>
```

**To add a new tool**, duplicate and change the values similarly.

#### Step 3: Modify Tech Comfort Options
Find this section (around line 210):
```html
<!-- STEP 3 -->
<label class="quiz-option cursor-pointer" data-value="non-tech">
  <input type="radio" name="comfort" value="non-tech" class="hidden" />
  ...
</label>
```

**To modify**, change the `value`, title, and description.

---

### 3. Update Quiz Progress Colors

**File:** `diagnostic-quiz.html`  
**Look for:** Progress bar styling

Current:
```html
<div id="progressBar" class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out" style="width: 0%"></div>
```

**To change colors:**
```html
<!-- Change from indigo/purple to cyan/blue -->
<div id="progressBar" class="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300 ease-out" style="width: 0%"></div>
```

Available Tailwind colors: `cyan`, `blue`, `indigo`, `purple`, `pink`, `emerald`, `teal`, etc.

---

## ❓ FAQ Customization

### 1. Modify FAQ Questions & Answers

**File:** `faq-section.html`

Each FAQ item follows this pattern:
```html
<div class="faq-item rounded-xl border border-gray-800 bg-gray-950/40 ...">
  <button class="faq-header ...">
    <div class="flex-grow">
      <h3 class="text-lg font-semibold text-white flex items-center gap-3">
        <span class="...">1</span>  <!-- ← FAQ number -->
        Do I need to know how to code to use CHAINNE systems?  <!-- ← Question -->
      </h3>
    </div>
    ...
  </button>
  <div class="faq-content hidden overflow-hidden">
    <div class="px-6 py-4 bg-gray-900/20 border-t border-gray-800">
      <p class="text-gray-300 leading-relaxed">
        <strong class="text-white">Not at all.</strong> Systems are designed...  <!-- ← Answer -->
      </p>
    </div>
  </div>
</div>
```

#### To Modify:
1. **Change the number:** Update `<span class="...">1</span>` to `2`, `3`, etc.
2. **Change the question:** Update the text inside `<h3>...</h3>`
3. **Change the answer:** Update the `<p>` content

#### Example: Replace Question 1
```html
<h3 class="text-lg font-semibold text-white flex items-center gap-3">
  <span class="...">1</span>
  What's the minimum team size needed for automation?
</h3>
```

```html
<p class="text-gray-300 leading-relaxed">
  <strong class="text-white">Just one person.</strong> Even solo operators can benefit from workflow automation. We design systems that work for your current team size and scale as you grow.
</p>
```

---

### 2. Add More FAQ Questions

**To add a 6th question**, duplicate the entire FAQ item block and:
1. Change `<span class="...">1</span>` to `6`
2. Update the question and answer
3. Paste before the closing `</div>` of the accordion container

```html
<!-- NEW FAQ ITEM -->
<div class="faq-item rounded-xl border border-gray-800 bg-gray-950/40 overflow-hidden hover:border-cyan-500/30 transition-all">
  <button class="faq-header w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-900/40 transition-colors">
    <div class="flex-grow">
      <h3 class="text-lg font-semibold text-white flex items-center gap-3">
        <span class="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-xs font-bold text-cyan-400">6</span>
        Your new question here?
      </h3>
    </div>
    <div class="flex-shrink-0 w-6 h-6 rounded-lg bg-gray-800/80 flex items-center justify-center transition-transform duration-300 faq-icon">
      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
    </div>
  </button>
  <div class="faq-content hidden overflow-hidden">
    <div class="px-6 py-4 bg-gray-900/20 border-t border-gray-800">
      <p class="text-gray-300 leading-relaxed">
        <strong class="text-white">Your answer here.</strong> Add more details to explain thoroughly.
      </p>
    </div>
  </div>
</div>
```

---

### 3. Update FAQ Button Links

**File:** `faq-section.html`

Current email and WhatsApp links:
```html
<a href="mailto:hello@chainne.ai" class="inline-flex items-center justify-center gap-2 px-6 py-3 ...">
  <svg class="w-4 h-4" ...>...</svg>
  Email us
</a>

<a href="https://wa.me/+1234567890" target="_blank" rel="noopener" class="inline-flex items-center justify-center gap-2 px-6 py-3 ...">
  <svg class="w-4 h-4" ...>...</svg>
  Message on WhatsApp
</a>
```

#### To Update:
```html
<!-- Change email -->
<a href="mailto:your-email@yourdomain.com" ...>

<!-- Change WhatsApp number (format: country code + number, no spaces) -->
<a href="https://wa.me/14155552671" ...>  <!-- Example: +1 415-555-2671 -->
```

---

## 🎨 Styling Customization

### 1. Change Quiz Colors

**File:** `diagnostic-quiz.html`  
**Current theme:** Indigo/Purple

```html
<!-- Progress bar -->
<div id="progressBar" class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 ..."></div>

<!-- Results card border -->
<div id="resultCard" class="rounded-xl border border-indigo-500/40 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 ...">

<!-- CTA Button -->
<a id="resultCTA" href="#contact" class="bg-gradient-to-r from-indigo-500 to-purple-600 ...">
```

#### To Change to Cyan/Blue:
```html
<div id="progressBar" class="h-full bg-gradient-to-r from-cyan-500 to-blue-600 ..."></div>
<div id="resultCard" class="rounded-xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 ...">
<a id="resultCTA" class="bg-gradient-to-r from-cyan-500 to-blue-600 ...">
```

**Replace all instances of:**
- `indigo-500` → `cyan-500`, `blue-600`, etc.
- `purple-500` / `purple-600` → `blue-500` / `blue-600`, etc.

---

### 2. Change FAQ Colors

**File:** `faq-section.html`  
**Current theme:** Cyan/Blue

#### FAQ Item Number Badge
```html
<span class="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-xs font-bold text-cyan-400">1</span>
```

**To change to purple:**
```html
<span class="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-xs font-bold text-purple-400">1</span>
```

#### FAQ CTA Buttons
```html
<a href="mailto:hello@chainne.ai" class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 ...">
```

**To change to pink/indigo:**
```html
<a href="mailto:hello@chainne.ai" class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-indigo-600 ...">
```

---

### 3. Change Spacing & Layout

#### Quiz Section Padding
```html
<section id="diagnostic-quiz" class="max-w-4xl mx-auto px-6 py-20 border-t border-gray-800/50">
                                                                          ^^
                                                    Change py-20 to py-16, py-24, etc.
```

#### FAQ Container
```html
<section id="faq" class="max-w-4xl mx-auto px-6 py-20 border-t border-gray-800/50">
                                                   ^^^
                                    Change py-20 to your preferred padding
```

Available: `py-8`, `py-12`, `py-16`, `py-20`, `py-24`, `py-32`

---

### 4. Change Font Sizes

#### Quiz Heading
```html
<h2 class="text-4xl md:text-5xl font-extrabold text-white ...">
            ^^^^        ^^^^^
          Mobile    Desktop
```

**Change to:**
- `text-3xl md:text-4xl` (smaller)
- `text-5xl md:text-6xl` (larger)

#### FAQ Heading
```html
<h2 class="text-4xl md:text-5xl font-extrabold text-white ...">
            ^^^^        ^^^^^
          Mobile    Desktop
```

Same options as quiz.

#### Question Text Size
```html
<h3 class="text-lg font-semibold text-white ...">
          ^^^^^
```

**Change to:** `text-sm`, `text-base`, `text-xl`, `text-2xl`

---

## 🔗 Link Customization

### Quiz Result CTAs

**File:** `diagnostic-quiz.html`

Each recommendation has a `recommendation.ctaLink`:

```javascript
recommendation.ctaLink = '#contact';  // Anchor link
recommendation.ctaLink = 'https://...';  // External URL
recommendation.ctaLink = 'mailto:email@...?subject=...';  // Email
```

#### Common CTA Destinations:

**To products section:**
```javascript
recommendation.ctaLink = '#products';
recommendation.cta = 'View Templates';
```

**To external booking link:**
```javascript
recommendation.ctaLink = 'https://calendly.com/your-name/call';
recommendation.cta = 'Schedule Call';
```

**To email with subject:**
```javascript
recommendation.ctaLink = 'mailto:hello@chainne.ai?subject=I want Guided Assistant Blueprint&body=Hi! I am interested...';
recommendation.cta = 'Book Setup Call';
```

**To a lead magnet form:**
```javascript
recommendation.ctaLink = 'https://your-domain.com/automation-checklist';
recommendation.cta = 'Download Free Checklist';
```

---

## 💾 Saving Your Customizations

1. **Edit `chainne.html`** - After pasting components, don't edit them there
2. **Edit `diagnostic-quiz.html` and `faq-section.html` directly** - These are your source files
3. **Test in browser** - Open `chainne.html` to verify changes
4. **Redeploy** - Push updated files to production

**If you paste components again:** Your customizations in the separate files will be preserved.

---

## 🧪 Testing Your Customizations

### For Quiz Changes:
1. Reload `chainne.html` in browser
2. Go through all 3 quiz steps
3. Verify result recommendations match your edits
4. Click CTA and confirm link works
5. Test on mobile (smaller screens)

### For FAQ Changes:
1. Reload `chainne.html` in browser
2. Expand each FAQ item
3. Verify your new text appears
4. Click email/WhatsApp buttons
5. Test on mobile

### For Style Changes:
1. Reload and check colors/spacing
2. Compare with mockup/design
3. Test across screen sizes
4. Check contrast (text readability)

---

## ⚠️ Common Pitfalls

❌ **Don't:**
- Remove the `<section id="diagnostic-quiz">` or `<section id="faq">` tags
- Delete the `<style>` or `<script>` blocks
- Change `input name` attributes (breaks functionality)
- Edit the JavaScript function names

✅ **Do:**
- Modify `recommendation.title`, `recommendation.description`, etc.
- Change text inside `<h3>`, `<h4>`, `<p>` tags
- Update `href` attributes in links
- Modify Tailwind classes (colors, sizing, spacing)

---

## 🆘 If Something Breaks

1. **Check browser console** (F12 → Console tab) for errors
2. **Verify all brackets/quotes** are balanced
3. **Compare with original** files from the repo
4. **Undo recent changes** and try again
5. **Reload browser cache** (Ctrl+Shift+R or Cmd+Shift+R)

---

## 🚀 You're Ready to Customize!

All modifications are **local to your files** and **don't require any build steps**. Edit, save, reload browser, and you're done.

**Happy customizing! 🎨**
