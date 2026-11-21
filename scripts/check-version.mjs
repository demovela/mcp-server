import {readFileSync,appendFileSync} from 'node:fs';
const pkg=JSON.parse(readFileSync('package.json','utf8'));
const response=await fetch('https://registry.npmjs.org/'+encodeURIComponent(pkg.name)+'/'+pkg.version);
if(![200,404].includes(response.status))throw Error('Registry check failed: '+response.status);
if(response.status===200){const existing=await response.json();if(existing.mcpName!==pkg.mcpName||existing.repository?.url!==pkg.repository.url)throw Error('Published version belongs to a different project; check the package name.');}
appendFileSync(process.env.GITHUB_OUTPUT,'version='+pkg.version+'\npublished='+(response.status===200)+'\n');
