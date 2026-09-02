# Antigravity Prompting & Extension Guide

This document contains prompts and instructions for future AI assistants or developers extending this portfolio.

---

## 1. Adding a New Project
To add a new project, execute an SQL insert in Supabase:
```sql
INSERT INTO public.projects (title, description, type, tags, status, domain, link) VALUES 
('PROJECT_NAME', 'Detailed description of features and architecture.', 'TECH_CATEGORY', ARRAY['TAG1', 'TAG2', 'TAG3'], 'DEPLOYED', 'DOMAIN_NAME', 'https://project-url.com');
```
*Note: Because Supabase Realtime is enabled, adding rows in Supabase will instantly display the project on the live website without any code changes or rebuilds!*

---

## 2. Adding a Credential / Seminar / Hackathon
```sql
INSERT INTO public.credentials (title, organization, type, date_range, description) VALUES
('Event Title / Role', 'Organization / Agency', 'EVENT', 'Month Year', 'Description of key takeaways, achievements, or topics covered.');
```
*Types supported: `'WORK'`, `'EVENT'`, `'SEMINAR'` (color-coded automatically on the frontend).*

---

## 3. Adding a Skill Category
```sql
INSERT INTO public.skills (category, skill_list) VALUES
('CATEGORY_NAME', ARRAY['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4']);
```

---

## 4. Aesthetic & Design Rules
- **Themes**: Must support dual-palette CSS variables (`--theme-main`, `--theme-secondary`, etc.) defined in `src/app/globals.css`.
- **Cyberpunk Reticle**: Retain `<CyberCursor />` with trailing spring physics and interactive element targeting.
- **Micro-Animations**: All cards should use `clip-path` classes (`.cyber-card`, `.cyber-button`) and smooth Framer Motion transitions.
- **No Git Auto-Push**: Do not auto-commit or auto-push without explicit user approval.
