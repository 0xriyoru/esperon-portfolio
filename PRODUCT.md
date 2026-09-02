# Product Requirements & Technical Content

## 1. Developer Profile
- **Name**: Rhodge Ellio D. Esperon
- **Handle / GitHub**: `0xriyoru` (`https://github.com/0xriyoru`)
- **LinkedIn**: `https://www.linkedin.com/in/rhodge-esperon`
- **Email**: `rhodgesperon@gmail.com`
- **Location**: Olongapo City, Philippines
- **Education**: Bachelor of Science in Information Technology (Lyceum of Subic Bay, 2023 - Present)
- **Role / Specialization**: AI & Full-Stack Developer (AI Agents, Backend Architecture, UI/UX Engineering)

---

## 2. Real Project Inventory

1. **`MEKAI`**
   - **Type**: Full-Stack Web App (OCR-assisted manga reading platform)
   - **Tech**: Next.js, TypeScript, Tailwind CSS, PostgreSQL RLS, Vercel
   - **Status**: `DEPLOYED`
   - **URL**: `https://mekaiscans.vercel.app`
   - **Domain**: `MEKAISCANS.VERCEL.APP`

2. **`ARTNEST`**
   - **Type**: Progressive Web App (PWA) / Creative Platform
   - **Role**: Collaborator on frontend architecture & platform features
   - **Tech**: Next.js, React, PWA, Vercel
   - **Status**: `DEPLOYED`
   - **URL**: `https://artnest-hub.vercel.app`
   - **Domain**: `ARTNEST-HUB.VERCEL.APP`

3. **`REBEAT`**
   - **Type**: Front-End & Audio Web Interface
   - **Tech**: React.js, Web Audio API, Low-latency 60 FPS state management
   - **Status**: `DEPLOYED`
   - **Link**: `https://github.com/0xriyoru`

4. **`SBMA-JO`**
   - **Type**: Internal Government System (Subic Bay Metropolitan Authority)
   - **Tech**: Next.js, Supabase, Confidential Property & Job Order Management
   - **Status**: `DEPLOYED` (Restricted Government Access, No Public Link)

5. **`MAULAM`**
   - **Type**: AI & Mobile Application
   - **Tech**: Python, AI Meal Planning & Ingredient Suggestion Engine
   - **Status**: `DEVELOPMENT`
   - **Link**: `https://github.com/0xriyoru/MaUlam`

6. **`GAKUMON`**
   - **Type**: Gamified E-Learning Web Platform
   - **Tech**: Virtual Pet Mechanics, Health Decay, Coin Multipliers, Admin Analytics Dashboard
   - **Status**: `ARCHIVED`

7. **`JOBLINK`**
   - **Type**: Centralized Job Matching Platform
   - **Tech**: Full-Stack Architecture, ERD Design, End-to-End Figma UI/UX
   - **Status**: `ARCHIVED`

---

## 3. Experience, Seminars & Hackathons

- **Work**: IT Intern (Procurement & Property Management) @ Subic Bay Metropolitan Authority (SBMA) [May 2026 - Sep 2026]
- **Events & Seminars**:
  - SparkCon: The Next Wave of Innovation (Campus DevCon x Zellense) [2025]
  - Skydevs Hack, Play, & Learn Summit Masterclass (Skydev Solutions, Inc.) [2025]
  - C# Scripting for Unity: Core Concepts (Lyceum of Subic Bay) [2025]
  - Exploring Angular Frameworks for UI Development (Lyceum of Subic Bay) [2024]
  - Data Privacy & IT/CS Career Development (Lyceum of Subic Bay) [2023]
  - AWS Community Day Philippines - Metro Manila [Aug 2026]
  - Voices of AI Summit - Angeles City [Aug 2026]
  - eGovHackathon 2026 - SMX Convention Center [Jul 2026]

---

## 4. Technical Skills Inventory

- **Front-End & Frameworks**: HTML5, CSS3, JavaScript, TypeScript, React.js, Next.js, Tailwind CSS, Bootstrap
- **Back-End & Databases**: Node.js, Java, PHP, Laravel, PostgreSQL, MySQL, Supabase, AWS DynamoDB
- **UI/UX Design & Prototyping**: Figma, Wireframing, High-Fidelity Prototyping, Design Systems, User Flows
- **Developer Tools & Cloud**: GitHub, VS Code, Vercel, Postman, Docker, REST APIs
- **Specializations & Methods**: Agentic AI, OCR Translation, Technical Documentation, Web Audio API, RLS Policies

---

## 5. Backend Database Architecture (Supabase Realtime)
- **`projects`**: Project title, description, type, tags, status, link, domain.
- **`credentials`**: Title, organization, type (`WORK`, `EVENT`, `SEMINAR`), date_range, description.
- **`skills`**: Category, skill_list array.
- **`page_views`**: Atomic visitor view counter via PostgreSQL RPC function.
- **Realtime**: WebSockets enabled on all tables via `supabase_realtime` publication.