import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const CERT_ASSETS_DIR = path.join(rootDir, 'public', 'assets', 'certificates');
const CERTS_JSON_PATH = path.join(rootDir, 'public', 'data', 'certificates.json');
const PROJECTS_JSON_PATH = path.join(rootDir, 'public', 'data', 'projects.json');

const GITHUB_USERNAME = 'SumanthMamidi-MNS';

console.log('🔄 ========================================');
console.log('🔄  PORTFOLIO AUTO-SYNC ENGINE            ');
console.log('🔄 ========================================');

// ── 1. CERTIFICATE SYNC ──
function syncCertificates() {
  console.log('\n📜 [1/2] Scanning certificates directory...');
  if (!fs.existsSync(CERT_ASSETS_DIR)) {
    console.warn('⚠️ Certificates assets directory not found:', CERT_ASSETS_DIR);
    return;
  }

  let existingCerts = [];
  try {
    if (fs.existsSync(CERTS_JSON_PATH)) {
      existingCerts = JSON.parse(fs.readFileSync(CERTS_JSON_PATH, 'utf8'));
    }
  } catch (err) {
    console.error('Error reading certificates.json:', err);
    existingCerts = [];
  }

  const files = fs.readdirSync(CERT_ASSETS_DIR);
  // Group files by base name
  const certFiles = files.filter(f => !f.endsWith('.json') && !f.startsWith('.'));

  const baseNames = new Set();
  const fileMap = new Map();

  for (const file of certFiles) {
    const ext = path.extname(file);
    const base = path.basename(file, ext);
    baseNames.add(base);
    if (!fileMap.has(base)) {
      fileMap.set(base, {});
    }
    const entry = fileMap.get(base);
    if (ext.toLowerCase() === '.pdf') {
      entry.pdf = file;
    } else if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext.toLowerCase())) {
      entry.image = file;
    }
  }

  let addedCount = 0;

  for (const base of baseNames) {
    const entry = fileMap.get(base);
    const primaryFile = entry.pdf || entry.image;
    const imageFile = entry.image || (entry.pdf ? null : entry.image);

    // Check if certificate already exists in JSON
    const alreadyExists = existingCerts.some(c => 
      c.file === primaryFile || 
      c.image === imageFile || 
      c.file === entry.image ||
      c.title?.toLowerCase() === base.toLowerCase()
    );

    if (!alreadyExists) {
      console.log(`✨ Found new certificate asset: "${base}"`);
      
      // Infer category and issuer
      const lower = base.toLowerCase();
      let category = 'workshops';
      let issuer = 'Technical Workshop';
      let type = 'Verified Certificate';

      if (lower.includes('claude') || lower.includes('anthropic') || lower.includes('subagents') || lower.includes('model context')) {
        category = 'claude';
        issuer = 'Anthropic Developer Program';
        type = 'Interactive Course';
      } else if (lower.includes('coursera') || lower.includes('google')) {
        category = 'coursera';
        issuer = 'Google Career Certificates (Coursera)';
        type = 'Specialization';
      } else if (lower.includes('simulation') || lower.includes('walmart') || lower.includes('forage')) {
        category = 'simulations';
        issuer = 'Walmart Global Tech & Forage';
        type = 'Enterprise Simulation';
      } else if (lower.includes('hackathon') || lower.includes('unstop') || lower.includes('adobe')) {
        category = 'hackathons';
        issuer = 'Adobe & Unstop';
        type = 'National Hackathon';
      } else if (lower.includes('be10x')) {
        category = 'workshops';
        issuer = 'be10x AI Tools Program';
        type = 'AI Tools Workshop';
      } else if (lower.includes('outskill')) {
        category = 'workshops';
        issuer = 'Outskill Full-Stack Bootcamp';
        type = 'Full-Stack Bootcamp';
      } else if (
        lower.includes('rag') || lower.includes('docker') || lower.includes('kubernetes') || 
        lower.includes('solid') || lower.includes('payment') || lower.includes('ml ops') ||
        lower.includes('multi-agent') || lower.includes('scaler')
      ) {
        category = 'scaler';
        issuer = 'Scaler Academy';
        type = 'Masterclass / Workshop';
      }

      const newCert = {
        title: base,
        issuer,
        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        file: primaryFile,
        image: imageFile || primaryFile,
        category,
        type,
        driveId: `cert-${Date.now()}`
      };

      existingCerts.push(newCert);
      addedCount++;
    }
  }

  if (addedCount > 0) {
    fs.writeFileSync(CERTS_JSON_PATH, JSON.stringify(existingCerts, null, 2) + '\n', 'utf8');
    console.log(`✅ Added ${addedCount} new certificate(s) to certificates.json (Total: ${existingCerts.length})`);
  } else {
    console.log(`✅ All ${existingCerts.length} certificates are up-to-date in certificates.json.`);
  }
}

// ── 2. GITHUB REPOSITORIES SYNC ──
async function syncGitHubRepos() {
  console.log(`\n🐙 [2/2] Fetching repositories from GitHub (@${GITHUB_USERNAME})...`);

  let existingProjects = [];
  try {
    if (fs.existsSync(PROJECTS_JSON_PATH)) {
      existingProjects = JSON.parse(fs.readFileSync(PROJECTS_JSON_PATH, 'utf8'));
    }
  } catch (err) {
    console.error('Error reading projects.json:', err);
    existingProjects = [];
  }

  try {
    const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-Sync-Engine'
      }
    });

    if (!res.ok) {
      if (res.status === 403) {
        console.warn('⚠️ GitHub API rate limit reached or blocked. Skipping repo sync.');
      } else {
        console.warn(`⚠️ GitHub API returned HTTP ${res.status}: ${res.statusText}`);
      }
      return;
    }

    const repos = await res.json();
    if (!Array.isArray(repos)) {
      console.warn('⚠️ Unexpected response format from GitHub API.');
      return;
    }

    let addedCount = 0;

    for (const repo of repos) {
      // Ignore forks or private repos
      if (repo.fork) continue;

      const repoNameLower = repo.name.toLowerCase();
      // Ignore special GitHub profile repo or the portfolio itself
      if (
        repoNameLower === GITHUB_USERNAME.toLowerCase() ||
        repoNameLower.includes('portfolio')
      ) {
        continue;
      }

      const repoUrl = (repo.html_url || '').toLowerCase();
      const repoName = (repo.name || '').toLowerCase();

      const exists = existingProjects.some(p => 
        (p.github && p.github.toLowerCase() === repoUrl) ||
        (p.title && p.title.toLowerCase() === repoName) ||
        (p.id && p.id.toLowerCase() === repoName)
      );

      if (!exists) {
        console.log(`✨ Found new repository on GitHub: "${repo.name}"`);

        // Infer category from language or topics
        const lang = (repo.language || '').toLowerCase();
        let category = 'ai-ml';
        if (['javascript', 'typescript', 'html', 'css', 'vue', 'svelte'].includes(lang)) {
          category = 'fullstack';
        } else if (['c', 'c++', 'rust', 'go', 'dockerfile'].includes(lang)) {
          category = 'systems';
        }

        const tags = Array.isArray(repo.topics) && repo.topics.length > 0 
          ? repo.topics 
          : [repo.language || 'Code', 'Open Source'];

        const newProject = {
          id: repo.name.toLowerCase().replace(/[^a-z0-9_-]/g, '-'),
          title: repo.name,
          subtitle: repo.description || 'Open Source Project on GitHub',
          category,
          tags,
          badge: 'GitHub Project',
          description: repo.description || `${repo.name} developed by ${GITHUB_USERNAME}.`,
          features: [
            repo.description || `Autonomous repository hosted on GitHub: ${repo.name}`,
            `Primary language: ${repo.language || 'Multi-language'}`
          ],
          github: repo.html_url,
          demo: repo.homepage || null,
          cover: null,
          featured: false,
          year: new Date(repo.created_at || Date.now()).getFullYear()
        };

        existingProjects.push(newProject);
        addedCount++;
      }
    }

    if (addedCount > 0) {
      fs.writeFileSync(PROJECTS_JSON_PATH, JSON.stringify(existingProjects, null, 2) + '\n', 'utf8');
      console.log(`✅ Added ${addedCount} new project(s) to projects.json (Total: ${existingProjects.length})`);
    } else {
      console.log(`✅ All ${existingProjects.length} projects are up-to-date with GitHub.`);
    }

  } catch (err) {
    console.error('⚠️ Could not sync with GitHub API:', err.message);
  }
}

// ── EXECUTE ──
async function main() {
  syncCertificates();
  await syncGitHubRepos();
  console.log('\n🎉 Portfolio sync complete!\n');
}

main();
