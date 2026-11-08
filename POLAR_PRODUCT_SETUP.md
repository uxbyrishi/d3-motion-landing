# D3 Motion - Polar.sh Product Setup & Digital Distribution Guide

**Platform:** [Polar.sh](https://polar.sh)  
**MCP Server Endpoint:** `https://mcp.polar.sh/mcp/polar-mcp`  
**License Type:** Perpetual Lifetime Commercial License ($29 One-Time)  
**Product Status:** Production Ready & Packaged  

---

## 1. Polar MCP Connection Status

The Polar MCP server is registered in `~/.gemini/config/mcp_config.json`:
```json
"polar": {
  "url": "https://mcp.polar.sh/mcp/polar-mcp"
}
```

### Authorization Prompt:
Polar MCP uses browser-based OAuth authorization. If your browser did not automatically open or you need to re-authorize:
👉 **[Click Here to Authorize Polar MCP](https://polar.sh/oauth2/authorize?response_type=code&client_id=polar_ci_wjX3cimFexQieEqMMeSaDXEu7Qpn2keYf2wpx2i8iI7&code_challenge=3Ku8GyVT1l2RVPYu2xsc0TtJh3mVAPUvqgNxMHBomhY&code_challenge_method=S256&redirect_uri=http%3A%2F%2F127.0.0.1%3A27913%2Foauth%2Fcallback&state=fd528a19-f963-4a33-876d-3e8192d01aa6&scope=benefits%3Aread+checkout_links%3Aread+checkouts%3Aread+custom_fields%3Aread+customer_meters%3Aread+customer_seats%3Aread+customers%3Aread+discounts%3Aread+events%3Aread+files%3Aread+license_keys%3Aread+members%3Aread+meters%3Aread+metrics%3Aread+orders%3Aread+organizations%3Aread+payments%3Aread+products%3Aread+refunds%3Aread+subscriptions%3Aread+webhooks%3Aread+benefits%3Awrite+checkout_links%3Awrite+custom_fields%3Awrite+customer_seats%3Awrite+customers%3Awrite+discounts%3Awrite+events%3Awrite+files%3Awrite+license_keys%3Awrite+members%3Awrite+meters%3Awrite+orders%3Awrite+products%3Awrite+refunds%3Awrite+subscriptions%3Awrite+webhooks%3Awrite&resource=https%3A%2F%2Fmcp.polar.sh%2Fmcp%2Fpolar-mcp)**

Once you click "Authorize" on Polar, the agent will have programmatic access to your Polar dashboard.

---

## 2. Organized Product Details for Polar Dashboard

### A. General Information
- **Product Name:** `D3 Motion - Professional HTML to MP4 Video Engine`
- **Tagline:** `Convert HTML, CSS, JavaScript, Canvas, and Three.js animations into broadcast-quality 4K 60FPS MP4 video locally.`
- **Price:** `$29.00 USD` (One-time payment)
- **Product Type:** Digital Product / Software Download

### B. Marketing Copy & Description (Paste into Polar)
```markdown
### Turn Web Animations into Video. No Cloud Subscriptions. No Credit Meters.

Tired of AI video platforms and cloud SaaS burning $30-$60 every month just to render a few seconds of CSS or Canvas? 

**D3 Motion** is a high-performance, privacy-first desktop utility that converts web-based animations directly into broadcast-grade 60 FPS MP4 video files on your own computer.

#### ✨ What You Get:
- **Unlimited MP4 Video Exports:** Render as many animations as you need with zero limits.
- **Up to 4K UHD Resolution:** Presets for 1080p, 1440p, 4K, 9:16 vertical (Reels/TikTok/Shorts), and 1:1 square.
- **24, 30, and 60 FPS Modes:** Silky smooth motion capture with zero dropped frames.
- **Full Web Stack Compatibility:** Works with standard CSS Keyframes, GSAP, Anime.js, Three.js, WebGL, SVG animations, Canvas 2D, and Lottie-web.
- **100% Air-Gapped Local Processing:** Your code, client assets, and rendered videos never leave your machine.
- **Full Commercial Rights:** Use finished videos in client work, YouTube, social ads, and commercial products with zero royalties.
- **Perpetual Lifetime Access:** Buy once, use forever. All future updates included.

#### 🛡️ Zero Dependencies Guarantee:
You do NOT need to install Node.js, Python, Git, Playwright, or FFmpeg. D3 Motion embeds its own private Chromium browser and static FFmpeg binary. Extract, install, and render immediately!
```

---

## 3. Digital File Deliverables & Packages (Organized by OS)

The standalone zip packages are prepared in `html-to-video/release/packages/`:

### Package 1: Windows Edition (`D3-Motion-Windows-x64-Complete.zip`)
- **File Size:** `372.9 MB`
- **Path:** `release/packages/D3-Motion-Windows-x64-Complete.zip`
- **Contents:**
 - `D3-Motion-Setup.exe` (Self-contained Windows 10/11 x64 Installer)
 - `README-Windows.txt` (Zero-setup guide & instructions)
 - `sample-animations/` (3 ready-to-test animation projects: Kinetic Typography, Canvas Particles, SVG Gradient Orb)

### Package 2: macOS Edition (`D3-Motion-macOS-Complete.zip`)
- **File Size:** `821.3 MB`
- **Path:** `release/packages/D3-Motion-macOS-Complete.zip`
- **Contents:**
 - `D3-Motion-Mac-arm64.dmg` (Apple Silicon M1/M2/M3/M4 Installer)
 - `D3-Motion-Mac-x64.dmg` (Intel Mac Installer)
 - `README-macOS-Instructions.txt` (Detailed Gatekeeper & first-launch instructions)
 - `sample-animations/` (3 ready-to-test animation projects)

---

## 4. Polar Benefits & Customer Fulfillment Message

Set up two benefits on Polar under this product:

### Benefit 1: File Download (Windows Edition)
- **Attach:** `D3-Motion-Windows-x64-Complete.zip`
- **Label:** `Windows 10/11 x64 Package (Installer + Samples)`

### Benefit 2: File Download (macOS Edition)
- **Attach:** `D3-Motion-macOS-Complete.zip`
- **Label:** `macOS Package (Apple Silicon & Intel DMGs + Guide + Samples)`

### Benefit 3: License Key
- Enable Polar's **License Keys** benefit so each customer automatically receives an activation key on purchase.

### Customer Welcome / Post-Purchase Note (Paste into Polar):
```markdown
Thank you for purchasing D3 Motion!

### Quick Start:
1. Download the zip package for your operating system (Windows or macOS).
2. Extract the zip file on your computer.

### Windows Users:
- Double-click "D3-Motion-Setup.exe" to install.
- Launch D3 Motion from your Desktop or Start Menu.
- Drag any file from the "sample-animations" folder into D3 Motion to test your first 60 FPS MP4 render!

### Mac Users (First Launch Instructions):
- Choose "D3-Motion-Mac-arm64.dmg" if you have an Apple Silicon Mac (M1/M2/M3/M4), or "D3-Motion-Mac-x64.dmg" for Intel Macs.
- Drag "D3 Motion.app" into your Applications folder.
- **First Launch (Gatekeeper):** Right-click (or Control-click) "D3 Motion" in Applications and choose "Open", then click the "Open" button in the prompt. You only need to do this once!
- If macOS blocks the app, open **System Settings > Privacy & Security**, scroll down to Security, and click **"Open Anyway"**.

Need help? Contact d3motion.pro@gmail.com or read the full manual at https://d3-motion-landing.vercel.app/instructions.html
```
